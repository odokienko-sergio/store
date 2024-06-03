import React, {useState} from "react";
import {Header} from "./../Header/index";
import {Steps} from "./../Steps/index";
import {Title} from "./../Title/index";
import {StoredChair} from "./../StoredChair/index";
import {Next} from "./../Next/index";

export const Cart = () => {
    const [chairs, setChairs] = useState(localStorage.getItem("chairs") ? JSON.parse(localStorage.getItem("chairs")) : []);
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
    const countSum = () => {
        let sum = 0;
        if (storedChairs) {
            for (let storedChair of storedChairs) {
                sum += storedChair.data.price * storedChair.count;
            }
        }
        return sum;
    }
    const handleChangeCart = data => {
        setChairs(data);
    }
    return (
        <div className="App cart">
            <Header />
                 <main>
                <Steps active="cart" />
                <Title title="Cart" />
                <div className="stored_chairs">
                    {storedChairs && storedChairs.map((storedChair, index) => {
                        return <StoredChair storedChairs={chairs} storedChair={storedChair} key={index} onData={handleChangeCart} />
                    })}
                </div>
                <p>Together: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{countTogether()} {countTogether() !== 1 ? "products" : "product"}.</b></p>
                <p>Sum: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${countSum().toFixed(2)}</b></p>
                <Next href="/contact" title="Next step" />
            </main>
        </div>
    );
}