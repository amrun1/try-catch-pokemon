import React from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';

const LIST_POKEMON = gql`
query getPokemons {
  pokemon @rest(type: "Pokemons", path: "pokemon?offset=0&limit=20",endpoint:"uri") {
    next
    detail @type(name: "Pokemon"){
      name
      url @export(as: "url")
      image @rest(type: "Image", path: "{exportVariables.url}",endpoint:"blank"){
          url
          id
      }
    }
  }
}`

export default function HomePage() {
    const { loading, error, data } = useQuery(LIST_POKEMON);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <>
            <div className="container">
                <h1>Pokemon List</h1>
                <div className="row">
                    {data.pokemon.detail.map((pokemon, index) => (
                        <Link to={"/" + pokemon.image.id} key={index} className="col-sm-4">
                            <div style={{ width: "100%" }}>
                                <div className="card" >
                                    <img
                                        src={pokemon.image.url}
                                        className="card-img-top"
                                        alt="cover"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{pokemon.name}</h5>
                                        <p className="card-text">{pokemon.image.id}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}