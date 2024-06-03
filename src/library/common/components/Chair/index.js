import React, {useState, useEffect} from "react";

export const Chair = props => {
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const chairs = localStorage.getItem("chairs") && JSON.parse(localStorage.getItem("chairs"));
        if (chairs && chairs.length > 0) {
			const storedChairs = chairs.filter((chair) => chair.data && chair.count);
            setIsAdded(storedChairs.some((chair) => chair.data.id === props.chair.id));
        }
    }, [props.chair.id]);

    const handleAddToCart = () => {
        if (!isAdded) {
            setIsAdded(true);
            const newToCart = [...props.toCart, { data: props.chair, count: 1 }];
            props.onData(newToCart);
            localStorage.setItem("chairs", JSON.stringify(newToCart));
        }
    };

    return (
        <div className="chair">
            <img src={props.chair.thumbnail} alt="" />
            <p className="description">{props.chair.description}</p>
            <p className="price">${props.chair.price.toFixed(2)}</p>
            <button onClick={handleAddToCart}>{isAdded ? "Added" : "+ Add to cart"}</button>
        </div>
    );
}