import React from "react";
import { capitallizeFirstLetter } from "../../utility/index";

class CardMyList extends React.Component {
    render() {
        return (
            <div className="bg-light border rounded row m-1" style={{ justifyContent: "space-between" }}>
                <img
                    loading="lazy"
                    rel="preload"
                    src={this.props.imageUrl}
                    width="96px"
                    height="96px"
                    alt="cover"
                    className="p-0"
                />
                <div className="col-5 p-0 align-self-center" >
                    {this.props.nickname !== undefined && <p className="h5 text-dark text-break mb-auto">{this.props.nickname}</p>}
                    <p className='text-dark text-break mb-auto' >{capitallizeFirstLetter(this.props.name)}</p>
                    {this.props.total !== undefined && <p className="text-white bg-info col-8 rounded">{this.props.total} Owned</p>}
                </div>
                {this.props.release !== undefined && <div><button className="btn btn-danger" style={{ height: "100%" }} onClick={this.props.release}>Release</button></div>}
            </div>
        )
    };
};

export default CardMyList