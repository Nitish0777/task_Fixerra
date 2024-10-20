import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const PokemonListing = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHiddenAbilities, setShowHiddenAbilities] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  // Debounced Search Function
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Apply filters on searchQuery and showHiddenAbilities
  useEffect(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = data.filter((pokemon) =>
        pokemon.abilities.some((abilityObj) =>
          abilityObj.ability.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (showHiddenAbilities) {
      filtered = filtered.filter((pokemon) =>
        pokemon.abilities.some((abilityObj) => abilityObj.is_hidden)
      );
    }

    // Sort by base_experience
    if (sortOption === 'asc') {
      filtered = filtered.sort((a, b) => a.base_experience - b.base_experience);
    } else if (sortOption === 'desc') {
      filtered = filtered.sort((a, b) => b.base_experience - a.base_experience);
    }

    setFilteredData(filtered);
  }, [data, searchQuery, showHiddenAbilities, sortOption]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Listing</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by ability name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-1/2"
        />

        <div className="flex items-center mb-4 sm:mb-0">
          <input
            type="checkbox"
            checked={showHiddenAbilities}
            onChange={() => setShowHiddenAbilities(!showHiddenAbilities)}
            className="mr-2"
          />
          <label>Show Hidden Abilities Only</label>
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="default">Sort by Base Experience</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Listing Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length ? (
          filteredData.map((pokemon, index) => (
            <div key={index} className="p-4 bg-gray-50 border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Base Experience: {pokemon.base_experience}</h2>
              <h3 className="text-lg font-semibold mb-2">Abilities:</h3>
              <ul className="list-disc list-inside">
                {pokemon.abilities.map((abilityObj, idx) => (
                  <li key={idx} className="text-gray-700">
                    <a 
                      href={abilityObj.ability.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 underline"
                    >
                      {abilityObj.ability.name}
                    </a>
                    {abilityObj.is_hidden ? ' (Hidden)' : ''} - Slot {abilityObj.slot}
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mt-4">Cries:</h3>
              <audio controls>
                <source src={pokemon.cries.latest} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No Pokémon match the search/filter criteria.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonListing;
