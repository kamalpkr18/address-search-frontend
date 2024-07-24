import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5001/search', {
        params: { query },
      });
      const data = response.data;
      if (data.length === 0) {
        setMessage('ヒットしませんでした');
      } else {
        setMessage('');
      }
      setResults(data);
    } catch (error) {
      console.error('Error searching addresses', error);
      setMessage('エラーが発生しました');
    }
  };

  return (
    <div className="App">
      <div className="search-container">
        <h1>住所検索</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索語を入力"
        />
        <button onClick={handleSearch}>検索</button>
      </div>
      {message && <p>{message}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result[0]} {result[1]} {result[2]} {result[3]} {result[4]}{' '}
            {result[5]} {result[6]} {result[7]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
