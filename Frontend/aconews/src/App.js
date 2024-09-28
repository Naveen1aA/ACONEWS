import React, { useEffect, useState } from 'react';
import './App.css'; 

const App = () => {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch news articles using the fetch API
    const fetchNews = async (searchQuery = '', page = 1) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/news?q=${searchQuery}&page=${page}&limit=10`);
            
            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the JSON data
            const data = await response.json();
            setArticles(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // reset page when a new search is made
        fetchNews(searchQuery, 1);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">ACONEWS</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="articles-grid">
                    {articles.map((article, index) => (
                        <div key={index} className="article-card">
                            <img src={article.image} alt={article.title} className="article-image" />
                            <div className="article-content">
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pagination">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="pagination-button">
                    Previous
                </button>
                <button onClick={() => setPage((prev) => prev + 1)} className="pagination-button">
                    Next
                </button>
            </div>
        </div>
    );
};

export default App;




