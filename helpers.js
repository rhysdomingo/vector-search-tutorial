require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
//const openai_key = 'your_openai_key'; // Replace with your OpenAI key.
const openai_key = process.env.OPENAI_KEY;
const axios = require('axios');
// Define the OpenAI API url and key.
const url = 'https://api.openai.com/v1/embeddings';
const mongodb_url = process.env.MONGODB_URL;

async function getEmbedding(query) {
    
    
    // Call OpenAI API to get the embeddings.
    let response = await axios.post(url, {
        input: query,
        model: "text-embedding-ada-002"
    }, {
        headers: {
            'Authorization': `Bearer ${openai_key}`,
            'Content-Type': 'application/json'
        }
    });
    
    if(response.status === 200) {
        return response.data.data[0].embedding;
    } else {
        throw new Error(`Failed to get embedding. Status code: ${response.status}`);
    }
};

async function findSimilarDocuments(embedding) {    
    const client = new MongoClient(mongodb_url);    
    try {
        await client.connect();
        
        const db = client.db('sample_mflix'); // Replace with your database name.
        const collection = db.collection('movies'); // Replace with your collection name.
        
        // Query for similar documents.
        const documents = await collection.aggregate([
            {
            "$search": {
            "index": "idx_dvs_movies",
            "knnBeta": {
            "vector": embedding,
            "path": "plot_embedding",
            "k": 20
            }
            }
            }
            ]).toArray();
        
        return documents;
    } finally {
        await client.close();
    }
}

module.exports = { getEmbedding, findSimilarDocuments };

