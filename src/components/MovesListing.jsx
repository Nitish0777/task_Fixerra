import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const MovesListing = ({ data }) => {
  const [filteredMoves, setFilteredMoves] = useState(data.moves);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced Search Function
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Apply filters on searchQuery
  useEffect(() => {
    let filtered = data.moves;

    // Filter by search query (move name)
    if (searchQuery) {
      filtered = filtered.filter((move) =>
        move.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMoves(filtered);
  }, [data.moves, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Moves Listing</h1>
      <h2 className="text-2xl font-semibold mb-4">Height: {data.height}</h2>

      {/* Search Control */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by move name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Listing Moves */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMoves.length ? (
          filteredMoves.map((move, index) => (
            <div key={index} className="p-4 bg-gray-50 border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Move Name: {move.name}</h2>
              <h3 className="text-lg font-semibold">Version Group Details:</h3>
              <ul className="list-disc list-inside">
                {move.version_group_details.map((detail, idx) => (
                  <li key={idx} className="text-gray-500">
                    <strong>Version Group:</strong> {detail.version_group.name} <br />
                    <strong>Level Learned At:</strong> {detail.level_learned_at} <br />
                    <strong>Move Learn Method:</strong>
                    <a
                      href={detail.move_learn_method.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline mb-2 block"
                    >
                      {detail.move_learn_method.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No moves match the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default MovesListing;
