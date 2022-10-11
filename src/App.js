import './App.css';
import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  //re run once with empty array
  useEffect(() => {
  setLoading(true)
  let cancel
  //fetch pokemon list data
  axios.get(currentPageUrl, {
    cancelToken: new axios.CancelToken(c => cancel = c)
  })
  .then(response => {
    setLoading(false)
    setNextPageUrl(response.data.next)
    setPrevPageUrl(response.data.previous)
    setPokemon(response.data.results.map(p => p.name))
  })

  return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (
    <>
    <PokemonList pokemon={pokemon}/>
    <Pagination 
    gotoNextPage={nextPageUrl ? gotoNextPage : null}
    gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
    />
    </>
    
  );
}

export default App;
