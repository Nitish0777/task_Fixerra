import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const FormsListing = ({ data }) => {
  const [filteredForms, setFilteredForms] = useState(data?.forms || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLength, setFilterLength] = useState('');

  // Debounced Search Function
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Apply filters on searchQuery and filterLength
  useEffect(() => {
    let filtered = data.forms || [];

    if (searchQuery) {
      filtered = filtered.filter((form) =>
        form.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterLength) {
      filtered = filtered.filter((form) => form.name.length === parseInt(filterLength));
    }

    setFilteredForms(filtered);
  }, [data, searchQuery, filterLength]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        Pokémon Forms
      </h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by form name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-blue-400 rounded-lg focus:outline-none focus:border-blue-600 mb-2 sm:mb-0"
        />

        <input
          type="number"
          placeholder="Filter by name length..."
          onChange={(e) => setFilterLength(e.target.value)}
          className="w-full sm:w-1/6 p-2 border border-blue-400 rounded-lg focus:outline-none focus:border-blue-600"
        />
      </div>

      {/* Listing Forms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredForms.length ? (
          filteredForms.map((form, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
              style={{ backgroundColor: "#f0f8ff" }} // Light blue background
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-900">
                {form.name.charAt(0).toUpperCase() + form.name.slice(1)}
              </h2>

              <a
                href={form.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-medium hover:text-blue-400 transition-colors duration-200"
              >
                View Form Details
              </a>

              {/* Display additional information */}
              <div className="mt-3">
                <p className="text-gray-700">
                  <strong>Base Experience:</strong> {data.base_experience}
                </p>

                <h3 className="text-sm font-medium mt-3 text-gray-800">Abilities:</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {data.abilities.map((ability, i) => (
                    <li key={i} className="mt-1">
                      <a
                        href={ability.ability.url}
                        className="text-blue-500 hover:text-blue-400"
                      >
                        {ability.ability.name}
                      </a>
                      {ability.is_hidden && (
                        <span className="text-xs text-gray-500 ml-1">(Hidden Ability)</span>
                      )}
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-medium mt-3 text-gray-800">Cries:</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>
                    <a
                      href={data.cries.latest}
                      className="text-blue-500 hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Latest Cry
                    </a>
                  </li>
                  <li>
                    <a
                      href={data.cries.legacy}
                      className="text-blue-500 hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Legacy Cry
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No forms match the search/filter criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default FormsListing;
