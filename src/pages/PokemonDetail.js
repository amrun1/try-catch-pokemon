import React from 'react'
import { useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

const DETAIL_POKEMON = gql`
query getDetail($url: String!){
    detail(url:$url) @rest(type: "Image", method: "GET", path: "{args.url}", endpoint:"blank"){
        id @export(as: "id")
        url {
            detail
        }
        name
        abilities @type(name: "Ability"){
            ability {
                name
                url @export(as: "url")
                effect @rest(type: "Text", path: "{exportVariables.url}", endpoint: "blank")
            }
        }
        url_species @export(as: "url_species")
        general @rest(type: "General", path: "{exportVariables.url_species}", endpoint: "blank") {
          description
          evolution_chain_url @export(as: "url_evolution")
          evolution @rest(type:"Text",path: "{exportVariables.url_evolution}", endpoint: "blank")
        }
    }
}`

export default function DetailPokemon() {
    let { id } = useParams()
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id
    const { loading, error, data } = useQuery(DETAIL_POKEMON, { variables: { url } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( </p>;
    return (
        <>
            <div className="container">
                <h1>{data.detail.name}</h1>
                <h1>{data.detail.id}</h1>
                <div className="row">

                    <div className="col-12 col-sm-4" style={{ textAlign: "-webkit-center" }}>
                        <img
                            rel="preload"
                            style={{ width: "16rem", height: "16rem", padding: "1rem" }}
                            src={data.detail.url.detail}
                            alt="cover"
                        />
                    </div>
                    <p className="col-12 col-sm-8">
                        {data.detail.general.description}
                    </p>
                    {data.detail.abilities.map((res, index) => (
                        <div className="col-12" key={index}>
                            <h1>Ability : {res.ability.name}</h1>
                            <p>effect : {res.ability.effect}</p>
                        </div>
                    ))}
                    <button className="btn btn-primary" type="button">Catch</button>
                </div>
            </div>
        </>
    )
}