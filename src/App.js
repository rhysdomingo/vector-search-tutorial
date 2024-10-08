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

        // Handle error by setting the state to an array with a single object that has an error message.
        setResult([{ title: 'Error', plot: errorMessage }]);
    }
  };

  return (
    <div className="App">
      <h1>
        <span className="title-main">MongoDB Atlas</span><br />
        <span className="title-sub">Vector Search Tutorial</span><br/>
        <span className="title-sub2">
          <a href="https://www.mongodb.com/developer/products/atlas/semantic-search-mongodb-atlas-vector-search/" target="_blank" style={{ textDecoration: 'underline', color: '#0000FF' }}>
          https://www.mongodb.com/developer/products/atlas/semantic-search-mongodb-atlas-vector-search/
          </a>
        </span>
      </h1>
      <SubmitSearch onSearch={handleSearch} />
      <div className="table-responsive">
      {result.length > 0 && <SearchResult result={result} />}
      </div>
    </div>
  );
};

export default App;
