import React from 'react';

const SearchResult = ({ result }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Plot</th>
                </tr>
            </thead>
            <tbody>
                {result.map((movie, index) => (
                    <tr key={index}>
                        <td>{movie.title}</td>
                        <td>{movie.fullplot}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SearchResult;
