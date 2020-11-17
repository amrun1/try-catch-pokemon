import React, { useContext, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { Context } from "../store/store";
import { getOwnedTotal } from "../utility/index";
import { LIST_POKEMON as LIST } from "../constant/index";

const LIST_POKEMON = LIST

const CardList = lazy(() => import('../components/card/card_list'))

export default function PokemonList() {
    const { loading, error, data } = useQuery(LIST_POKEMON);
    const [state,] = useContext(Context)

    if (loading) return (<>
        <div className="container">
            <h1>Pokemon List</h1>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" style={{ textAlign: "-webkit-center", textDecoration: "none" }}>
                    <div className="bg-light border rounded row m-1">
                        <div className="bg-light" style={{ width: "96px", height: "96px" }}></div>
                    </div>
                </div>
            </div>
        </div>
    </>)
    if (error) return <p>Error :(</p>;
    return (
        <>
            <div className="container">
                <h1>Pokemon List</h1>
                <div className="row">
                    {data.pokemon.detail.map((pokemon, index) => (
                        <Link to={"/detail/" + pokemon.name} key={index} className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" style={{ textAlign: "-webkit-center", textDecoration: "none" }}>
                            <Suspense fallback={
                                <div className="bg-light border rounded row m-1">
                                    <div className="bg-light" style={{ width: "96px", height: "96px" }}></div>
                                </div>}>
                                {/* <CardList imageUrl={pokemon.image.url.list} name={pokemon.name} total={getOwnedTotal(state, pokemon.name)}></CardList> */}
                                <CardList url={pokemon.url} name={pokemon.name} total={getOwnedTotal(state, pokemon.name)}></CardList>
                            </Suspense>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}