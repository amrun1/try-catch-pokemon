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
    uri: {
      uri: 'https://pokeapi.co/api/v2/',
      responseTransformer: async response => response.json().then(({ results, next }) => { return { detail: results, next: next } })
    },
    blank: {
      uri: '',
      responseTransformer: async response => response.json().then(({ sprites, id }) => { return { url: sprites.other["official-artwork"].front_default, id: id } })
    },
    test: "http://10.20.201.69:8080/api.elastics.request/alokasi/v1/getforsuplier"
  }
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
