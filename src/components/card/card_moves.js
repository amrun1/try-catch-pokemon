import React from "react";

class CardMove extends React.Component {
    render() {
        return (
            <div className="row bg-light rounded m-3 p-3">
                <h2 className="col-12 p-0">Moves</h2>
                {this.props.moves !== undefined && this.props.moves.map((res, index) => (
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 p-0" key={index}>
                        <h6>{res.move.name}</h6>
                    </div>
                ))}
            </div>
        )
    }
}
export default CardMove