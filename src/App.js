import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Store from "./store/store";
import { Menu } from "./constant/index";

const PokemonList = lazy(() => import('./pages/PokemonList'))
const MyPokemonList = lazy(() => import('./pages/MyPokemonList'))
const DetailPokemon = lazy(() => import('./pages/PokemonDetail'))
const Navbar = lazy(() => import('./components/navbar/navbar'))

export default function App() {
  return (
    <Store>
      <Navbar menu={Menu}></Navbar>
      <Switch>
        <Suspense fallback={<div style={{ height: "100%", width: "100%", backgroundColor: "lightgray" }}><h1>Loading...</h1></div>}>
          <Route exact path="/" component={PokemonList} />
          <Route path="/mypokemon" component={MyPokemonList} />
          <Route path="/detail/:id" component={DetailPokemon} />
        </Suspense>
      </Switch>
    </Store>
  )
}
