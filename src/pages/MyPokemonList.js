import React, { useContext, lazy, Suspense } from 'react'
import { Context } from "../store/store";

const CardList = lazy(() => import('../components/card/card_list'))

export default function MyPokemonList() {
    const [state, dispatch] = useContext(Context)

    const release = (nickname) => {
        dispatch({ type: 'remove', pokemon: { nickname: nickname } })
    }

    return (
        <>
            <div className="container">
                <h1>MY Pokemon List</h1>
                <div className="row">
                    {state.map((pokemon, index) => (
                        <div key={index} className="col-12 col-lg-6 col-xl-4" style={{ textAlign: "-webkit-center" }}>
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <CardList name={pokemon.name} imageUrl={pokemon.url.list} nickname={pokemon.nickname} release={() => { release(pokemon.nickname) }}></CardList>
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}