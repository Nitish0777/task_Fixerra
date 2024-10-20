import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  const chartData = filteredStats.map((stat) => ({
    name: stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1), // Capitalize stat name
    baseStat: stat.base_stat,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-lg rounded-xl">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Pokémon Stats</h1>

      {/* Search Control */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by stat name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full sm:w-1/2 mx-auto block text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        />
      </div>

      {/* Bar Chart for Stats */}
      <div className="w-full h-96">
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#555' }} />
            <YAxis tick={{ fontSize: 12, fill: '#555' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #ddd',
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="baseStat" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* No Data Message */}
      {filteredStats.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No stats match the search criteria.</p>
      )}
    </div>
  );
};

export default StatsListing;
