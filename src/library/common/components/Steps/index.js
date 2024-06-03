import React from "react";

export const Steps = props => {
    return (
        <p>
            <a className={props.active === "cart" ? "active" : ""} href="/cart">Cart</a>
            <span className="next">&gt;</span>
            <a className={props.active === "contacts" ? "active" : ""} href="/contact">Contact information</a>
            <span className="next">&gt;</span>
            <a className={props.active === "shipment" ? "active" : ""} href="/shipment">Shipment information</a>
        </p>
    );
}