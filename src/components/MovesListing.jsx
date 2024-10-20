import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const MovesListing = ({ data }) => {
  const [filteredMoves, setFilteredMoves] = useState(data.moves || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedMove, setExpandedMove] = useState(null); // To manage expanded state
  const itemsPerPage = 6; // Display fewer items per page for better spacing

  // Debounced Search Function
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  }, 300);

  // Apply filters on searchQuery
  useEffect(() => {
    let filtered = data.moves || [];

    if (searchQuery) {
      filtered = filtered.filter((move) =>
        move.move.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMoves(filtered);
  }, [data.moves, searchQuery]);

  // Get paginated moves based on the current page
  const indexOfLastMove = currentPage * itemsPerPage;
  const indexOfFirstMove = indexOfLastMove - itemsPerPage;
  const currentMoves = filteredMoves.slice(indexOfFirstMove, indexOfLastMove);

  // Handle pagination navigation
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredMoves.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle move details
  const toggleMoveDetails = (index) => {
    setExpandedMove(expandedMove === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Moves Listing</h1>

      {/* Search Control */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by move name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full sm:w-1/2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        />
      </div>

      {/* Listing Moves */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMoves.length ? (
          currentMoves.map((move, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
            >
              {/* Move Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 capitalize">
                  Move: {move.move.name}
                </h2>
                <button
                  className="text-indigo-500 hover:text-indigo-600"
                  onClick={() => toggleMoveDetails(index)}
                >
                  {expandedMove === index ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {/* Move Details (Collapsible Section) */}
              {expandedMove === index && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Version Group Details:</h3>
                  <ul className="space-y-4">
                    {move.version_group_details.map((detail, idx) => (
                      <li key={idx} className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <strong className="mr-2">Version Group:</strong>
                          <span>{detail.version_group.name.charAt(0).toUpperCase() + detail.version_group.name.slice(1)}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <strong className="mr-2">Level Learned At:</strong>
                          <span>{detail.level_learned_at}</span>
                        </div>
                        <div className="flex items-center">
                          <strong className="mr-2">Move Learn Method:</strong>
                          <a
                            href={detail.move_learn_method.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 underline hover:text-indigo-500 transition-colors duration-200"
                          >
                            {detail.move_learn_method.name.charAt(0).toUpperCase() + detail.move_learn_method.name.slice(1)}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No moves match the search criteria.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredMoves.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-indigo-500 text-white rounded-lg ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'
            } transition-colors duration-200`}
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {Math.ceil(filteredMoves.length / itemsPerPage)}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredMoves.length / itemsPerPage)}
            className={`px-4 py-2 bg-indigo-500 text-white rounded-lg ${
              currentPage === Math.ceil(filteredMoves.length / itemsPerPage)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-indigo-600'
            } transition-colors duration-200`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovesListing;
