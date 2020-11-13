import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/ListPokemon'
import UserPage from './pages/PokemonDetail'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/:id" component={UserPage} />
    </Switch>
  )
}
