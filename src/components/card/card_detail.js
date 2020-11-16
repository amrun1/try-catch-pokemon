import React from "react";
import { capitallizeFirstLetter } from "../../utility/index";
import { ColorType } from "../../constant/color_type";

class CardDetail extends React.Component {
    render() {
        return (
            <div className="row bg-light rounded m-3">
                <div className="col-12 col-md-5 col-lg-4 align-self-center" style={{ textAlign: "center" }}>
                    <img
                        rel="preload"
                        style={{ width: "16rem", height: "16rem", padding: "0rem" }}
                        src={this.props.imageUrl}
                        alt="cover"
                    />
                    <div>Type : {this.props.types.map((pokemon, index) => (<label key={index} style={{ backgroundColor: ColorType.find(poke => poke.type === pokemon.type.name).color, color: "white", paddingRight: ".5rem", paddingLeft: ".5rem", borderRadius: "0.5rem", paddingBottom: ".2rem", margin: ".25rem" }}>{pokemon.type.name}</label>))}</div>
                </div>
                <div className="col-12 col-md-7 col-lg-8">
                    <h1>{capitallizeFirstLetter(this.props.name)}</h1>
                    <p className="p-0">
                        {this.props.description}
                    </p>
                    {this.props.abilities !== undefined && this.props.abilities.map((res, index) => (
                        <div className="col-12 p-0" key={index}>
                            <h5>Ability : {res.ability.name}</h5>
                            <p>effect : {res.ability.effect}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default CardDetail