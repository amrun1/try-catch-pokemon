import React from "react";
import { capitallizeFirstLetter } from "../../utility/index";
import { IMAGE_POKEMON as image } from "../../constant/index";
import { useQuery } from '@apollo/client';

const IMAGE_POKEMON = image

function CardList(props) {

    const url = props.url
    const { loading, error, data } = useQuery(IMAGE_POKEMON, { variables: { url } });

    if (loading) return <div className="bg-light border rounded row m-1"><div className="bg-light" style={{ width: "96px", height: "96px" }}></div></div>;
    if (error) return <p>Error :( </p>;

    return (
        <div className="bg-light border rounded row m-1">
            <img
                loading="lazy"
                rel="preload"
                src={data.image.url.list}
                width="96px"
                height="96px"
                alt="cover"
                className="p-0"
            />
            <div className="col-7 p-0 align-self-center">
                <p className="h5 text-dark text-break">{capitallizeFirstLetter(props.name)}</p>
                <p className="text-white bg-info col-8 rounded">{props.total} Owned</p>
            </div>
        </div>
    )
};

export default CardList