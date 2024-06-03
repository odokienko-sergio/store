import React from "react";

export const StoredChairEnding = props => {
    return (
        <div className="stored_chair">
            <div className="img">
                <img src={props.storedChair.data.thumbnail} alt="" />
            </div>
            <div className="text">
                <p>{props.storedChair.data.description}</p>
                <p><b>${(props.storedChair.data.price * props.storedChair.count).toFixed(2)}, {props.storedChair.count} {props.storedChair.count !== 1 ? "products" : "product"}</b></p>
            </div>
        </div>
    );
}