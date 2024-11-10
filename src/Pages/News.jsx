import React, { useState } from 'react';
import NewsList from '../Components/NewsComps/NewsList';
import SearchBar from '../Components/NewsComps/SearchBar';
import '../Components/NewsComps/App.css';
import Navbar from '../Components/Navbar';

function News() {
  const [articles, setArticles] = useState([]);

  const fetchNews = async (query) => {
    const apiKey = '0199476f5daa460bb32a0ae35766e4b5'; // Replace with your News API key
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
            <Navbar/>
            <div className="App">
              <h1>Stock News</h1>
              <SearchBar fetchNews={fetchNews} />
              <NewsList articles={articles} />
            </div>
    </div>
    
  );
}

export default News;
