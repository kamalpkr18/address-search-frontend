const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const csv = require('csv-parser');
const app = express();
const port = 5001; // ポートを5001に変更

app.use(cors()); // CORSを有効にする

let addresses = [];
let invertedIndex = {};

// 2-gramの生成関数
const generateNgrams = (text, n) => {
  let ngrams = [];
  for (let i = 0; i < text.length - n + 1; i++) {
    ngrams.push(text.slice(i, i + n));
  }
  return ngrams;
};

// 転置インデックスの構築
const buildInvertedIndex = () => {
  invertedIndex = {};
  addresses.forEach((row, index) => {
    const combinedText = row.slice(1).join('');
    const ngrams = generateNgrams(combinedText, 2);
    ngrams.forEach((ngram) => {
      if (!invertedIndex[ngram]) {
        invertedIndex[ngram] = new Set();
      }
      invertedIndex[ngram].add(index);
    });
  });
};

// CSVファイルの読み込みと準備
const prepareData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, 'zenkoku.csv'))
      .pipe(iconv.decodeStream('Shift_JIS')) // Shift_JISからUTF-8にデコード
      .pipe(csv({ headers: false }))
      .on('data', (row) => {
        addresses.push([
          row[4], // 郵便番号
          row[6], // 都道府県
          row[7], // 市区町村
          row[8], // 町域
          row[9], // 京都通り名
          row[10], // 字丁目
          row[11], // 事業所名
          row[12], // 事業所住所
        ]);
      })
      .on('end', () => {
        buildInvertedIndex();
        resolve();
      })
      .on('error', reject);
  });
};

// 検索エンドポイント
app.get('/search', (req, res) => {
  const query = req.query.query || '';
  const queryNgrams = generateNgrams(query, 2);

  if (queryNgrams.length === 0) {
    return res.json([]);
  }

  const indexSets = queryNgrams.map(
    (ngram) => invertedIndex[ngram] || new Set()
  );
  const resultIndices = indexSets.reduce(
    (a, b) => new Set([...a].filter((x) => b.has(x))),
    indexSets[0]
  );

  const results = Array.from(resultIndices).map((index) => addresses[index]);
  res.json(results);
});

// データの準備とサーバーの起動
prepareData()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error preparing data:', error);
  });
