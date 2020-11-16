import React, { lazy, Suspense, useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { Context } from "../store/store";
import { DETAIL_POKEMON as DETAIL } from "../constant/index";

const TextInput = lazy(() => import("../components/input/text_input"))
const Modal = lazy(() => import('../components/modal/modal'))
const CardDetail = lazy(() => import('../components/card/card_detail'))
const CardMove = lazy(() => import('../components/card/card_moves'))

const DETAIL_POKEMON = DETAIL

export default function DetailPokemon() {

    const [isOpen, setIsOpen] = useState(false);
    const [modalProp, setModalProp] = useState({ content: '', isInput: false })
    const [form, setForm] = useState({ isValid: true, errorMessage: '' })

    const [state, dispatch] = useContext(Context)

    const togglePopup = () => {
        setForm({ isValid: true })
        setIsOpen(!isOpen);
    }

    const catchPokemon = () => {
        let catchStatus = Math.random() < 0.5 ? true : false
        setModalProp({ content: catchStatus ? 'Congrat you caught it' : 'Oh, sorry, Pokemon is fleeing', isInput: catchStatus })
        togglePopup()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let input = e.target[0].value
        if (input !== '') {
            if (state.length > 0) {
                if (state.find(item => item.nickname === input) === undefined) {
                    setForm({ isValid: true })
                    dispatch({ type: 'add', pokemon: { name: data.detail.name, nickname: input, url: data.detail.url } })
                    togglePopup()
                } else {
                    setForm({ isValid: false, errorMessage: 'Duplikat nickname' })
                }
            } else {
                setForm({ isValid: true })
                dispatch({ type: 'add', pokemon: { name: data.detail.name, nickname: input, url: data.detail.url } })
                togglePopup()
            }
        } else {
            setForm({ isValid: false, errorMessage: 'Cannot blank' })
        }
    }

    const { id } = useParams()
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id

    const { loading, error, data } = useQuery(DETAIL_POKEMON, { variables: { url } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( </p>;

    return (
        <>
            <div className="container mb-5">
                <Suspense fallback={<p>Loading...</p>}><CardDetail imageUrl={data.detail.url.detail} name={data.detail.name} description={data.detail.general.description} abilities={data.detail.abilities} types={data.detail.types}></CardDetail><CardMove moves={data.detail.moves} ></CardMove></Suspense>
                <button className="btn btn-primary ml-3" type="button" onClick={catchPokemon}>Catch</button>
            </div>
            {isOpen && <Suspense fallback={<p>Loading...</p>}><Modal
                content={<>
                    <b>{modalProp.content}</b>
                    {modalProp.isInput &&
                        <div>
                            <form className="needs-validation" onSubmit={onSubmit} noValidate>
                                <Suspense fallback={<p>Loading...</p>}><TextInput form={form} label="Nickname"></TextInput></Suspense>
                                <button className="btn btn-primary" type="submit">Save</button>
                            </form>
                        </div>}
                </>}
                handleClose={togglePopup}
            /></Suspense>}
        </>
    )
}