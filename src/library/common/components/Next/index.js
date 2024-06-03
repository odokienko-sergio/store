import React from "react";

export const Next = props => {
    return (
        <a className="button-link" href={props.href} onClick={props.onClick}>{props.title}</a>
    );
}