import React, { useState } from 'react';
import axios from 'axios';
import SubmitSearch from './SubmitSearch';
import SearchResult from './SearchResult';
import './App.css';
import './index.css';

const App = () => {
  const [result, setResult] = useState([]);

  const handleSearch = async (search) => {
    try {
        const response = await axios.post('http://localhost:3001/search', { query: search });

        if (response.status === 200 && response.data.results) {
            const displayResults = response.data.results; // Save the entire array
            setResult(displayResults);
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        let errorMessage = 'Error fetching data.';

        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message; // General Axios error (e.g., network error, timeout)
        }

        // Since this is an error, I'm assuming you'd want to handle it differently. 
        // As a simple approach, I'm setting the state to an array with a single object that has an error message.
        setResult([{ title: 'Error', plot: errorMessage }]);
    }
  };

  return (
    <div>
      <h1>MongoDB Atlas - Dense Vector Search - Movies</h1>
      <SubmitSearch onReverse={handleSearch} />
      {result.length > 0 && <SearchResult result={result} />}
    </div>
  );
};

export default App;
