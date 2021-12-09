import { useState, useEffect } from "react";

const initialBookingForm = {
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    noPeople: ""
}

const BookingForm = () => {
    const [bookingForm, setBookingForm] = useState(initialBookingForm);
    let postBookingToJson = false;

    const handleBookingChange = event => {
        const {name, value} = event.target;
        console.log({name, value});
        setBookingForm({...bookingForm, [name]: value});
    }

    const handleBookingSubmit = event => {
        event.preventDefault();
        setBookingForm(bookingForm);
        postBookingToJson = true;
    }

    const pushBookingData = async () => {
        //Code
    }

    useEffect(() => {
        if(postBookingToJson){
            pushBookingData();
        }
    }, [postBookingToJson])

    console.log('bookingForm:', bookingForm);

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