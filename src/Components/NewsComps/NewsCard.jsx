import React from 'react';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      <img 
        src={article.urlToImage || 'https://via.placeholder.com/300'} 
        alt="News" 
      />
      <h2>{article.title}</h2>
      <p>{article.description || 'No description available.'}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
    </div>
  );
};

export default NewsCard;
