import React from "react";
import {Header} from "./../Header/index";
import {Title} from "./../Title/index";
import {StoredChairEnding} from "./../StoredChairEnding/index";
import {Next} from "./../Next/index";

export const Ending = () => {
    const chairs = localStorage.getItem("chairs") ? JSON.parse(localStorage.getItem("chairs")) : [];
	let storedChairs;
	if (chairs && chairs.length > 0) {
		storedChairs = chairs.filter(chair => chair.data && chair.count);
	}
    const contacts = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : {};
    const shipment = localStorage.getItem("shipment") ? JSON.parse(localStorage.getItem("shipment")) : {};
    const date = new Date();
    const monthes = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const countSum = () => {
        let sum = 0;
        if (storedChairs) {
            for (let storedChair of storedChairs) {
                sum += storedChair.data.price * storedChair.count;
            }
        }
        return sum;
    }
    return (
        <div className="App ending">
            <Header />
            <main>
                <Title title="Thank you for your order!" />
                <p>The order confirmation email with details of your order and a link to track its progress has been sent to your email address.</p>
                <p><b>Your order # {"3".padStart(9, 0)} is - PENDING</b></p>
                <p className="date">Order Date: {date.getDate()} {monthes[date.getMonth()]} {date.getFullYear()}</p>
                <div className="information">
                    <div className="contact_information">
                        <p><b>Contact information</b></p>
                        <p>{contacts.firstName} {contacts.lastName}</p>
                        <p>{contacts.email}</p>
                        <p>{contacts.phone}</p>
                    </div>
                    <div className="shipment_information">
                        <p><b>Shipment information</b></p>
                        <p>{shipment.address}{shipment.apartment && `, ${shipment.apartment}`}</p>
                        <p>{shipment.city}, {shipment.state}, {shipment.zip_code}</p>
                        <p>{shipment.country}</p>
                    </div>
                    <div className="order_summary">
                        <p><b>Order summary</b></p>
                        {storedChairs && storedChairs.map((storedChair, index) => {
                            return <StoredChairEnding storedChair={storedChair} key={index} />
                        })}
                        <p>Subtotal: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${countSum().toFixed(2)}</p>
                        <p>Shipping &amp; Handling: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$0.00</p>
                        <p>Tax: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$0.00</p>
                        <p>Grand total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${countSum().toFixed(2)}</p>
                    </div>
                </div>
                <Next href="/" title="Continue shopping" />
            </main>
        </div>
    );
}