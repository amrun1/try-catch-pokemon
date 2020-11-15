import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
  endpoints: {
    uri_custom_response: {
      uri: 'https://pokeapi.co/api/v2/',
      responseTransformer: async response => response.json().then(({ results, next }) => { return { detail: results, next: next } })
    },
    blank: {
      uri: '',
      responseTransformer: async response => response.json().then(({ sprites, id, species, abilities, flavor_text_entries, effect_entries, evolution_chain, chain }) => { if (effect_entries !== undefined) { return effect_entries.filter(data => data.language.name === 'en')[0].effect } else if (flavor_text_entries !== undefined) { return { description: flavor_text_entries.filter(data => data.version.name === 'red')[0].flavor_text, evolution_chain_url: evolution_chain.url } } else if (chain !== undefined) {return 'test' } else { return { url: { list: sprites.other.dream_world.front_default, detail: sprites.other['official-artwork'].front_default }, id: id, name: species.name, abilities: abilities, url_species: species.url } } })
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
