import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const HeldItemsListing = ({ data }) => {
  const [filteredHeldItems, setFilteredHeldItems] = useState(data.held_items || []);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced Search Function
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Apply filters on searchQuery
  useEffect(() => {
    let filtered = data.held_items || [];

    // Filter by search query (item name)
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredHeldItems(filtered);
  }, [data.held_items, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Held Items Listing</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        {/* Height Display */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Pokemon Height: {data.height}
        </h2>

        {/* Search Control */}
        <input
          type="text"
          placeholder="Search by item name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 mb-4 sm:mb-0 sm:ml-4 w-full sm:w-1/2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        />
      </div>

      {/* Listing Held Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHeldItems.length ? (
          filteredHeldItems.map((heldItem, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Item Name: {heldItem.item.name.charAt(0).toUpperCase() + heldItem.item.name.slice(1)}
              </h2>
              <a
                href={heldItem.item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline hover:text-indigo-500 transition-colors duration-200 mb-2 block"
              >
                View Item Details
              </a>

              {/* Version Details */}
              <h3 className="text-lg font-medium text-gray-700 mt-4">Version Details:</h3>
              <ul className="list-disc list-inside mt-2">
                {heldItem.version_details.map((version, idx) => (
                  <li key={idx} className="text-gray-600">
                    {version.version.name.charAt(0).toUpperCase() + version.version.name.slice(1)} - 
                    Rarity: {version.rarity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No held items match the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default HeldItemsListing;
