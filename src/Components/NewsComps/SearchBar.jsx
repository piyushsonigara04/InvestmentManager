import React, { useState } from 'react';

const SearchBar = ({ fetchNews }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      fetchNews(query);
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter a stock..." 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
