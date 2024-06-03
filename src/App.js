import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./library/common/components/Home/index";
import {Cart} from "./library/common/components/Cart/index";
import {Contact} from "./library/common/components/Contact/index";
import {Shipment} from "./library/common/components/Shipment/index";
import {Ending} from "./library/common/components/Ending/index";

export const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/shipment" element={<Shipment />} />
                    <Route exact path="/ending" element={<Ending />} />
                </Routes>
            </Router>
        </div>
    );
}