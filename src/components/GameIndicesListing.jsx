import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const GameIndicesListing = ({ data }) => {
  const [filteredGameIndices, setFilteredGameIndices] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameIndexFilter, setGameIndexFilter] = useState('');

  // Debounced Search Function
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Apply filters on searchQuery and gameIndexFilter
  useEffect(() => {
    let filtered = data;

    // Filter by search query (version name)
    if (searchQuery) {
      filtered = data.filter((game) =>
        game.version.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by game index
    if (gameIndexFilter) {
      filtered = filtered.filter((game) => game.game_index === parseInt(gameIndexFilter));
    }

    setFilteredGameIndices(filtered);
  }, [data, searchQuery, gameIndexFilter]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Game Indices Listing</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        {/* Search by version name */}
        <input
          type="text"
          placeholder="Search by game version..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-1/2"
        />

        {/* Filter by game index */}
        <input
          type="number"
          placeholder="Filter by game index..."
          onChange={(e) => setGameIndexFilter(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 sm:mb-0"
        />
      </div>

      {/* Listing Game Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGameIndices.length ? (
          filteredGameIndices.map((game, index) => (
            <div key={index} className="p-4 bg-gray-50 border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Game Version: {game.version.name}</h2>
              <p className="text-gray-500 mb-2">Game Index: {game.game_index}</p>
              <a
                href={game.version.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Version Details
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No game versions match the search/filter criteria.</p>
        )}
      </div>
    </div>
  );
};

export default GameIndicesListing;
