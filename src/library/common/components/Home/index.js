import React, {useState, useEffect} from "react";
import {Header} from './../Header/index';
import {Chair} from "./../Chair/index";
import './../../../../resources/styles/App.css';

export const Home = () => {
    const [chairs, setChairs] = useState([]);
    const [toCart, setToCart] = useState(localStorage.getItem("chairs") ? JSON.parse(localStorage.getItem("chairs")) : []);
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(chairs => {
                setChairs(chairs);
            });
    }, []);
    const handleAddToCart = data => {
        setToCart(data);
    }
    return (
        <div className="App">
            <Header />
                    <main>
                {chairs.products && chairs.products.map((chair, index) => {
                    return <Chair toCart={toCart} chair={chair} key={index} onData={handleAddToCart} />
                })}
            </main>
        </div>
    );
}