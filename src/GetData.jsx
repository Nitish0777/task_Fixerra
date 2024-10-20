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
    <>
      {/* Display the data */}
      {/* <pre>{JSON.stringify(pokemonData, null, 1)}</pre>  */}
      {/* <FormsListing data={pokemonData} /> */}
       {/* <GameIndicesListing data={pokemonData} /> */}
      {/* <HeldItemsListing data={pokemonData} /> */}
      {/* <MovesListing data={pokemonData} /> */}
      <StatsListing data={pokemonData} /> 
    </>
  );
};

export default PokemonDataFetcher;
