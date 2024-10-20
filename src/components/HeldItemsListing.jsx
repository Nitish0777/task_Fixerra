import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const HeldItemsListing = ({ data }) => {
  const [filteredHeldItems, setFilteredHeldItems] = useState(data.held_items);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced Search Function
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Apply filters on searchQuery
  useEffect(() => {
    let filtered = data.held_items;

    // Filter by search query (item name)
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredHeldItems(filtered);
  }, [data.held_items, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Held Items Listing</h1>
      <h2 className="text-2xl font-semibold mb-4">Height: {data.height}</h2>

      {/* Search Control */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by item name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Listing Held Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHeldItems.length ? (
          filteredHeldItems.map((heldItem, index) => (
            <div key={index} className="p-4 bg-gray-50 border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Item Name: {heldItem.item.name}</h2>
              <a
                href={heldItem.item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mb-2 block"
              >
                View Item Details
              </a>
              <h3 className="text-lg font-semibold">Version Details:</h3>
              <ul className="list-disc list-inside">
                {heldItem.version_details.map((version, idx) => (
                  <li key={idx} className="text-gray-500">
                    {version.version.name} - Rarity: {version.rarity}
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
