import React from "react";
import { capitallizeFirstLetter } from "../../utility/index";

class CardList extends React.Component {
    render() {
        return (
            <div className="bg-light border rounded row m-1">
                <div className="col-12 p-0 align-self-center">
                    <p className="h5 text-dark text-break">{capitallizeFirstLetter(this.props.name)}</p>
                    <p className="text-white bg-info col-8 rounded">{this.props.total} Owned</p>
                </div>
            </div>
        )
    }
};

export default CardList