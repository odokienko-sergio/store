import React, {useEffect} from "react";

export const StoredChair = props => {
    useEffect(() => {
        if (props.storedChairs.length === 0) {
            localStorage.removeItem("chairs");
        }
    }, [props.storedChairs.length]);
    const minus = () => {
        if (props.storedChair.count > 1) {
            const newToCart = props.storedChairs.map(storedChair => {
                if (storedChair.data.id === props.storedChair.data.id) {
                    return {...storedChair, count: storedChair.count - 1};
                }
                return storedChair;
            });
            props.onData(newToCart);
            localStorage.setItem("chairs", JSON.stringify(newToCart));
        }
    }
    const plus = () => {
        const newToCart = props.storedChairs.map(storedChair => {
            if (storedChair.data.id === props.storedChair.data.id) {
                return {...storedChair, count: storedChair.count + 1};
            }
            return storedChair;
        });
        props.onData(newToCart);
        localStorage.setItem("chairs", JSON.stringify(newToCart));
    }
    const toDelete = () => {
        const newToCart = props.storedChairs.filter(chair => chair.data.id !== props.storedChair.data.id);
        props.onData(newToCart);
        localStorage.setItem("chairs", JSON.stringify(newToCart));
    }
    return (
        <div className="stored_chair">
            <div className="left">
                <img src={props.storedChair.data.thumbnail} alt="" />
            </div>
            <div className="center">
                <p>{props.storedChair.data.description}</p>
                <div className="counter">
                    <button className={props.storedChair.count <= 1 ? 'disabled' : undefined} onClick={minus}>-</button>
                    <span>{props.storedChair.count}</span>
                    <button onClick={plus}>+</button>
                </div>
            </div>
            <div className="right">
                <button onClick={toDelete}>Delete</button>
                <p>Price: ${(props.storedChair.data.price * props.storedChair.count).toFixed(2)}</p>
            </div>
        </div>
    );
}