import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormsListing from './components/FormsListing';
import GameIndicesListing from './components/GameIndicesListing';
import HeldItemsListing from './components/HeldItemsListing';
import MovesListing from './components/MovesListing';
import StatsListing from './components/StatsListing';

const PokemonDataFetcher = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/1');
        console.log("data from frontend",response);
        if (!response.data) {
          throw new Error('Failed to fetch data');
        }
        setPokemonData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Pokémon Data Overview</h1>

      {/* Forms Listing */}
      <section className="mb-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <FormsListing data={pokemonData} />
        </div>
      </section>

      {/* Game Indices Listing */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <GameIndicesListing data={pokemonData} />
        </div>
      </section>

      {/* Held Items Listing */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <HeldItemsListing data={pokemonData} />
        </div>
      </section>

      {/* Moves Listing */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <MovesListing data={pokemonData} />
        </div>
      </section>

      {/* Stats Listing */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <StatsListing data={pokemonData} />
        </div>
      </section>
    </div>
  );
};

export default PokemonDataFetcher;
