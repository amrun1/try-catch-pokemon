import React from "react";
import { Link } from 'react-router-dom'

const Navbar = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand"></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarPokemon" aria-controls="navbarPokemon" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarPokemon">
                <ul className="navbar-nav mr-auto">
                    {props.menu.map((item, index) => (
                        <li className="nav-item" key={index}>
                            <Link className="col-12 col-sm-3 pl-0 text-dark" to={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;