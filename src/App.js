import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ListPokemon from './pages/ListPokemon'
import DetailPokemon from './pages/PokemonDetail'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ListPokemon} />
      <Route path="/:id" component={DetailPokemon} />
    </Switch>
  )
}
