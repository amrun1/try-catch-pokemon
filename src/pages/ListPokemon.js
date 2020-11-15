import React from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';

const LIST_POKEMON = gql`
query getPokemons {
  pokemon @rest(type: "Pokemons", path: "pokemon?offset=0&limit=100",endpoint:"uri_custom_response") {
    next
    detail @type(name: "Pokemon"){
      name
      url @export(as: "url")
      image @rest(type: "ImageDetail", path: "{exportVariables.url}",endpoint:"blank"){
          url {
              list
          }
          id
      }
    }
  }
}`

export default function ListPokemon() {
    const { loading, error, data } = useQuery(LIST_POKEMON);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <>
            <div className="container">
                <h1>Pokemon List</h1>
                <div className="row">
                    {data.pokemon.detail.map((pokemon, index) => (
                        <Link to={"/" + pokemon.image.id} key={index} className="col-12 col-sm-2" style={{ textAlign: "-webkit-center" }}>
                            <div style={{ width: "75%" }}>
                                <div className="card" >
                                    {/* <img
                                        style={{ width: "8rem", height: "8rem", alignSelf: "center", padding: "1rem" }}
                                        src={pokemon.image.url.list}
                                        className="card-img-top"
                                        alt="cover"
                                    /> */}
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