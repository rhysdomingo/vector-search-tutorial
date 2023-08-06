const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const { getEmbedding, findSimilarDocuments } = require('./helpers.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Use cors middleware to handle CORS headers
app.use(cors());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url} with payload:`, req.body);
    next();  // Move to the next middleware/route
});

// Routes
app.post('/search', async (req, res, next) => {
    try {
        const query = req.body.query;
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const embedding = await getEmbedding(query);
        const similarDocuments = await findSimilarDocuments(embedding);

        // // Log the search results to the backend
        // console.log(`Search results for query "${query}":`, similarDocuments);
        
        res.json({ results: similarDocuments });
    } catch (error) {
        console.error('Error processing /search request:', error.message, error.stack);
        next(error); // Propagate the error to the global error handler
    }
});

// Global error handler
app.use((error, req, res, next) => {
    // Log the error for debugging
    console.error('Global error handler:', error.message, error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
