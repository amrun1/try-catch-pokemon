import React, { useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import Modal from "../components/modal/modal";
import { Context } from "../store/store";
import { DETAIL_POKEMON as DETAIL } from "../constant/index";

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
                    <button className="btn btn-primary" type="button" onClick={catchPokemon}>Catch</button>
                </div>
            </div>
            {isOpen && <Modal
                content={<>
                    <b>{modalProp.content}</b>
                    {modalProp.isInput &&
                        <div>
                            <form className="needs-validation" onSubmit={onSubmit} noValidate>
                                <div>
                                    <label>Nickname</label>
                                    <input type="text" className={form.isValid ? "form-control" : "form-control is-invalid"} style={form.isValid ? { marginBottom: ".5rem" } : { marginBottom: "0rem" }}></input>
                                    {!form.isValid && <small className="text-danger">{form.errorMessage}</small>}
                                </div>
                                <button className="btn btn-primary" type="submit">Save</button>
                            </form>
                        </div>}
                </>}
                handleClose={togglePopup}
            />}
        </>
    )
}