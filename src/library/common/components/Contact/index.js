import React, {useState} from "react";
import {Header} from "./../Header/index";
import {Steps} from "./../Steps/index";
import {Title} from "./../Title/index";
import {Next} from "./../Next/index";

export const Contact = () => {
    const contacts = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : {};
    const [errors, setErrors] = useState({});
    const useInputValue = (field, defaultValue = contacts[field]) => {
        const [value, setValue] = useState(defaultValue);
        const handleChange = event => {
            const newValue = event.target.value;
            setValue(newValue);
            contacts[field] = newValue;
            localStorage.setItem("contacts", JSON.stringify(contacts));
            if (!contacts.firstName && !contacts.lastName && !contacts.email && !contacts.phone) {
                localStorage.removeItem("contacts");
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
    const firstName = useInputValue('firstName');
    const lastName = useInputValue('lastName');
    const email = useInputValue('email');
    const phone = useInputValue('phone');
    const isErrors = () => {
        setErrors(prevErrors => {
            const newErrors = {...prevErrors};
            newErrors.firstName = !firstName.bind.value || firstName.bind.value.trim() === '' || !isNaN(+firstName.bind.value);
            newErrors.lastName = !lastName.bind.value || lastName.bind.value.trim() === '' || !isNaN(+lastName.bind.value);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            newErrors.email = !email.bind.value || !emailRegex.test(email.bind.value);
            newErrors.phone = !phone.bind.value || isNaN(+phone.bind.value);
            const hasErrors = Object.values(newErrors).some(error => error);
            if (!hasErrors) {
                window.location.href = "/shipment";
            }
            return newErrors;
        });
    }
    return (
        <div className="App contacts">
            <Header />
            <main>
                <Steps active="contacts" />
                <Title title="Contact information" />
                <div className="form">
                    <form>
                        <div className="flex">
                            <div className="field">
                                <label htmlFor="first_name">First name*</label>
                                <input id="first_name" className={errors.firstName ? "on_error" : undefined} type="text" placeholder="Enter your first name" {...firstName.bind} defaultValue={firstName.value()} />
                                {errors.firstName && <p className="error">Error first name</p>}
                            </div>
                            <div className="field">
                                <label htmlFor="last_name">Last name*</label>
                                <input id="last_name" className={errors.lastName ? "on_error" : undefined} type="text" placeholder="Enter your last name" {...lastName.bind} defaultValue={lastName.value()} />
                                {errors.lastName && <p className="error">Error last name</p>}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="field">
                                <label htmlFor="email">Email*</label>
                                <input id="email" className={errors.email ? "on_error" : undefined} type="email" placeholder="Enter your email" {...email.bind} defaultValue={email.value()} />
                                {errors.email && <p className="error">Error email</p>}
                            </div>
                            <div className="field">
                                <label htmlFor="phone">Phone*</label>
                                <input id="phone" className={errors.phone ? "on_error" : undefined} type="tel" placeholder="Enter your phone" {...phone.bind} defaultValue={phone.value()} />
                                {errors.phone && <p className="error">Error phone</p>}
                            </div>
                        </div>
                    </form>
                </div>
                <Next title="Next step" onClick={isErrors} />
            </main>
        </div>
    );
}