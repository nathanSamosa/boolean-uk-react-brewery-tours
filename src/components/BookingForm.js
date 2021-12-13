import { useState, useEffect } from "react";

const initialBookingForm = {
    breweryName: "",
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    noPeople: ""
}

const BookingForm = props => {
    const [bookingForm, setBookingForm] = useState(initialBookingForm);
    const [push, setPush] = useState(false);

    const handleBookingChange = event => {
        const {name, value} = event.target;
        setBookingForm({...bookingForm, [name]: value});
    }

    const handleBookingSubmit = event => {
        event.preventDefault();
        setPush(true);
        setBookingForm({...bookingForm, breweryName: props.brewery.name});
    }

    const pushBookingData = async () => {
        console.log(bookingForm)
        await fetch("http://localhost:4000/bookings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(bookingForm)
        });
    }

    useEffect(async () => {
        if(push){
            await pushBookingData();
            setPush(false)
        }
    }, [push])

    //console.log('bookingForm:', bookingForm);

    return (
        <section className="booking-form">
            <h3>Book a tour:</h3>
            <form onSubmit={handleBookingSubmit}>
                <div className="form-input">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={bookingForm.firstName}
                        onChange={handleBookingChange}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={bookingForm.lastName}
                        onChange={handleBookingChange}
                    />
                    <label htmlfor="date">Tour date</label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        value={bookingForm.date}
                        onChange={handleBookingChange}
                    />
                    <label htmlfor="time">Time</label>
                    <input
                        id="time"
                        type="time"
                        name="time"
                        min="09:00"
                        max="18:00"
                        step="3600"
                        value={bookingForm.time}
                        onChange={handleBookingChange}
                    />
                    <label htmlfor="people">No. people</label>
                    <input
                        id="people"
                        type="number"
                        min="1"
                        max="10"
                        name="noPeople"
                        value={bookingForm.noPeople}
                        onChange={handleBookingChange}
                    />
                </div>
                <input className="form-submit"
                    type="submit"
                    value="Book Now!"
                />
            </form>
        </section>
    )
}

export default BookingForm