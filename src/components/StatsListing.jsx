import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatsListing = ({ data }) => {
  const [filteredStats, setFilteredStats] = useState(data.stats);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced Search Function
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  // Apply filters on searchQuery
  useEffect(() => {
    let filtered = data.stats;

    // Filter by search query (stat name)
    if (searchQuery) {
      filtered = filtered.filter((stat) =>
        stat.stat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStats(filtered);
  }, [data.stats, searchQuery]);

  // Prepare the data for the chart
  const chartData = filteredStats.map(stat => ({
    name: stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1), // Capitalize stat name
    baseStat: stat.base_stat,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Stats Listing</h1>

      {/* Search Control */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by stat name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Bar Chart for Stats */}
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="baseStat" fill="#8884d8" />
      </BarChart>

      {/* No Data Message */}
      {filteredStats.length === 0 && (
        <p className="text-center text-gray-500">No stats match the search criteria.</p>
      )}
    </div>
  );
};

export default StatsListing;
