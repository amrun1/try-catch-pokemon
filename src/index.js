import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const restLink = new RestLink({
  endpoints: {
    uri_custom_response: {
      uri: 'https://pokeapi.co/api/v2/',
      responseTransformer: async response => response.json().then(({ results, next }) => { return { detail: results, next: next } })
    },
    blank: {
      uri: '',
      responseTransformer: async response => response.json().then(({ sprites, id, species, abilities, flavor_text_entries, effect_entries, moves, types }) => { if (effect_entries !== undefined) { return effect_entries.filter(data => data.language.name === 'en')[0].effect } else if (flavor_text_entries !== undefined) { return { description: flavor_text_entries.filter(data => data.version.name === 'silver')[0].flavor_text } } else { return { url: { list: sprites.front_default, detail: sprites.other['official-artwork'].front_default }, id: id, name: species.name, abilities: abilities, moves: moves, url_species: species.url, types: types } } })
    },
  },
  uri: 'https://pokeapi.co/api/v2/'
})

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
})


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
