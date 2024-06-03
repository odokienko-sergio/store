import React from "react";

export const Header = () => {
    const chairs = localStorage.getItem("chairs") ? JSON.parse(localStorage.getItem("chairs")) : [];
	let storedChairs;
	if (chairs && chairs.length > 0) {
		storedChairs = chairs.filter(chair => chair.data && chair.count);
	}
    const countTogether = () => {
        let together = 0;
        if (storedChairs) {
            for (let storedChair of storedChairs) {
                together += storedChair.count;
            }
        }
        return together;
    }
    return (
        <header>
            <div className="logo">
                <h1>OfficeChairs</h1>
            </div>
            <div className="button">
                <a className="button-link" href="/cart">Cart</a>
                {storedChairs && storedChairs.length > 0 && <span className="count">{countTogether()}</span>}
            </div>
        </header>
    );
}