import React from 'react'

export default function PokemonList({ pokemon }) {  //from props destructured to pokemon
  return (
    <div>
        {pokemon.map(p => (
            <div key={p}>{p}</div> 
            // need a key for everything in an loop for react
        ))}
    </div>
  )
}
