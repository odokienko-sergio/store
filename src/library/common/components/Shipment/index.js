import React, {useState} from "react";
import {Header} from "./../Header/index";
import {Steps} from "./../Steps/index";
import {Title} from "./../Title/index";
import {Next} from "./../Next/index";

export const Shipment = () => {
    const shipment = localStorage.getItem("shipment") ? JSON.parse(localStorage.getItem("shipment")) : {};
    const [errors, setErrors] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(shipment.country);
    const [selectedState, setSelectedState] = useState(shipment.state);
    const useInputValue = (field, defaultValue = shipment[field]) => {
        const [value, setValue] = useState(defaultValue);
        const handleChange = event => {
            const newValue = event.target.value;
            setValue(newValue);
            shipment[field] = newValue;
            localStorage.setItem("shipment", JSON.stringify(shipment));
            if (!shipment.address && !shipment.apartment && !shipment.city && !shipment.country && !shipment.state && !shipment.zip_code) {
                localStorage.removeItem("shipment");
            }
        }

        return {
            bind: {
                value: value,
                onChange: handleChange
            },
            clear: () => setValue(''),
            value: () => value
        }
    }
    const handleCountryChange = event => {
        const newValue = event.target.value;
        setSelectedCountry(newValue);
        shipment.country = newValue;
        localStorage.setItem("shipment", JSON.stringify(shipment));
        if (!shipment.address && !shipment.apartment && !shipment.city && !shipment.country && !shipment.state && !shipment.zip_code) {
            localStorage.removeItem("shipment");
        }
    }
    const address = useInputValue('address');
    const apartment = useInputValue('apartment');
    const city = useInputValue('city');
    const zip_code = useInputValue('zip_code');
    const isErrors = () => {
        setErrors(prevErrors => {
            const newErrors = {...prevErrors};
            newErrors.address = !address.bind.value || address.bind.value.trim() === '' || !isNaN(+address.bind.value);
            newErrors.city = !city.bind.value || city.bind.value.trim() === '' || !isNaN(+city.bind.value);
            newErrors.country = !selectedCountry || selectedCountry === '';
            newErrors.state = !selectedState || selectedState === '';
            newErrors.zip_code = !zip_code.bind.value || isNaN(+zip_code.bind.value);
            const hasErr = Object.values(newErrors).some(error => error);
            if (!hasErr) {
                window.location.href = "/ending";
            }
            return newErrors;
        });
    }
    const handleStateChange = event => {
        const newValue = event.target.value;
        setSelectedState(newValue);
        shipment.state = newValue;
        localStorage.setItem("shipment", JSON.stringify(shipment));
        if (!shipment.address && !shipment.apartment && !shipment.city && !shipment.country && !shipment.state && !shipment.zip_code) {
            localStorage.removeItem("shipment");
        }
    }
    return (
        <div className="App shipment">
            <Header />
            <main>
                <Steps active="shipment" />
                <Title title="Shipment information" />
                <div className="form">
                    <form>
                        <div className="field">
                            <label htmlFor="address">Address (No P. O. Boxes)*</label>
                            <input id="address" className={errors.address ? "on_error" : undefined} type="text" placeholder="Enter your address" {...address.bind} defaultValue={address.value()} />
                            {errors.address && <p className="error">Error address</p>}
                        </div>
                        <div className="field">
                            <label htmlFor="apartment">Apartment, suite etc. (optional)</label>
                            <input id="apartment" type="text" placeholder="Enter your apartment information" {...apartment.bind} />
                        </div>
                        <div className="field">
                            <label htmlFor="city">City*</label>
                            <input id="city" className={errors.city ? "on_error" : undefined} type="text" placeholder="Enter your city" {...city.bind} defaultValue={city.value()} />
                            {errors.city && <p className="error">Error city</p>}
                        </div>
                        <div className="flex">
                            <div className="field">
                                <label htmlFor="country">Country/Region*</label>
                                <select value={selectedCountry} onChange={handleCountryChange} id="country">
                                    <option value="">Select your country/region</option>
                                    <option value="United States">United States</option>
                                </select>
                                {errors.country && <p className="error">Error country</p>}
                            </div>
                            <div className="field">
                                <label htmlFor="state">State*</label>
                                <select value={selectedState} onChange={handleStateChange} id="state">
                                    <option value="">Select your state</option>
                                    <option value="Illinois">Illinois</option>
                                </select>
                                {errors.state && <p className="error">Error state</p>}
                            </div>
                            <div className="field">
                                <label htmlFor="zip_code">ZIP code*</label>
                                <input id="zip_code" className={errors.zip_code ? "on_error" : undefined} type="text" placeholder="Enter your ZIP code" {...zip_code.bind} defaultValue={zip_code.value()} />
                                {errors.zip_code && <p className="error">Error ZIP code</p>}
                            </div>
                        </div>
                    </form>
                </div>
                <Next title="Submit order" onClick={isErrors} />
            </main>
        </div>
    );
}