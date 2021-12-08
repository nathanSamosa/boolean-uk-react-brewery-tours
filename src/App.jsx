import { useState, useEffect } from "react";

import Header from "./components/Header";
import ListOfBreweriesHeader from "./components/ListOfBreweriesHeader";
import CityFilter from "./components/CityFilter";

export default function App() {
    const [breweries, setBreweries] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [filters, setFilters] = useState({filterByCity: [], filterByType: '', filterByName: ''});

    let stateString;

    // console.log("State: ", { breweries, selectedState });
    console.log("Inside handleSubmit: ", selectedState);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSelectedState(stateString);
        
        console.log("Inside handleSubmit: ", selectedState);
    };

    const handleSelectStateInput = (event) => stateString = event.target.value.split(" ").join("_");

    const fetchData = async () => {
        const res = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${selectedState}`);
        const data = await res.json();
        console.log('Breweries fetched: ', data);
        return data;
    }

    useEffect(async () => {
        if(selectedState !== ""){
            const data = await fetchData();
            setBreweries(data);
        }
    }, [selectedState]);

    return (
        <>
            <Header
                handleSubmit={handleSubmit}
                handleInput={handleSelectStateInput}
            />
            <main>
                <aside className="filters-section">
                    <h2>Filter By:</h2>
                    <form id="filter-by-type-form" autocompete="off">
                        <label for="filter-by-type"><h3>Type of Brewery</h3></label>
                        <select name="filter-by-type" id="filter-by-type">
                        <option value="">Select a type...</option>
                        <option value="micro">Micro</option>
                        <option value="regional">Regional</option>
                        <option value="brewpub">Brewpub</option>
                        </select>
                    </form>
                    <CityFilter 
                        breweries={breweries}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </aside>
                {selectedState && <ListOfBreweriesHeader selectedState={selectedState}/>}
                <article>
                    <ul className="breweries-list">
                        {breweries.map((brewery, index) => {
                            return (
                                <>
                                <li key={index}>
                                    <div className="brewery-info">
                                        <h2>{brewery.name}</h2>
                                        <div className="type">{brewery.brewery_type}</div>
                                        <section className="address">
                                            <h3>Address:</h3>
                                            <p>{brewery.street}</p>
                                            <p><strong>{brewery.city}, {brewery.postal_code}</strong></p>
                                        </section>
                                        <section className="phone">
                                            <h3>Phone:</h3>
                                            <p>{brewery.phone ? brewery.phone : "N/A"}</p>
                                        </section>

                                        <div className="button-container">
                                            <section className="booking">
                                                <button>
                                                    Book a tour
                                                </button>
                                            </section>
                                            <section className="link">
                                                <a href={brewery.website_url} target="_blank">
                                                    Visit Website
                                                </a>
                                            </section>
                                        </div>

                                    </div>
                                    <section className="booking-form">
                                        <h3>Book a tour:</h3>
                                        <form>
                                            <div className="form-input">
                                                <label htmlFor="firstName">First Name</label>
                                                <input
                                                    id="firstName"
                                                    type="text"
                                                    name="firstName"
                                                    value=""
                                                />
                                                <label htmlFor="lastName">Last Name</label>
                                                <input
                                                    id="lastName"
                                                    type="text"
                                                    name="firstName"
                                                    value=""
                                                />
                                                <label htmlfor="date">Tour date</label>
                                                <input
                                                    id="date"
                                                    type="date"
                                                    name="date"
                                                    value=""
                                                />
                                                
                                                <label htmlfor="time">Time</label>
                                                <input
                                                    id="time"
                                                    type="time"
                                                    name="time"
                                                    min="09:00"
                                                    max="18:00"
                                                    step="3600"
                                                    value=""
                                                />
                                                
                                                <label htmlfor="people">No. people</label>
                                                <input
                                                    id="people"
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    name="peopleCount"
                                                    value=""
                                                />
                                            </div>
                                            

                                            <input className="form-submit"
                                                type="submit"
                                                value="Book Now!"
                                            />

                                        </form>
                                    </section>
                                </li>
                            </>
                            );
                        })}
                    </ul>
                </article>
            </main>
        </>
    );
}