const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();

// Middleware
app.use(express.json());  
app.use(cors());  

const API_KEY = "4a4529e21a2c8a6170fa69e7fe7d8519"; //  gnews.io API key

// Route for fetching news articles
app.get('/news', async (req, res) => {
    const { q, page, limit } = req.query;

    try {
        // Make a request to the gnews.io API
        const response = await axios.get(`https://gnews.io/api/v4/search`, {
            params: {
                q: q || 'latest',  
                page: page || 1, 
                token: API_KEY,  // Use your API key here
                lang: 'en',
                max: limit || 10
            }
        });
        res.json(response.data); // Send the response data back to the client
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
    }
});

// Optional route for fetching news by category
app.get('/news/category', async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;

    try {
        if (!category) {
            return res.status(400).json({ error: 'Category is required' }); // Handle missing category
        }

        const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
            params: {
                category,
                token: API_KEY,
                page,
                max: limit
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news by category:', error.message);
        res.status(500).json({ error: 'Error fetching news by category' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server connected on http://localhost:3000");
});

