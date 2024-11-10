import React from 'react';
import NewsCard from './NewsCard';
import './NewsList.css';

const NewsList = ({ articles }) => {
  return (
    <div className="news-container">
      {articles.length === 0 ? (
        <p>No news found for the selected topic.</p>
      ) : (
        articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))
      )}
    </div>
  );
};

export default NewsList;
