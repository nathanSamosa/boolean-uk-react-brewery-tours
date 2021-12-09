import { useState, useEffect } from "react";

import Header from "./components/Header";
import ListOfBreweriesHeader from "./components/ListOfBreweriesHeader";
import TypeFilter from "./components/TypeFilter";
import CityFilter from "./components/CityFilter";
import BookingForm from "./components/BookingForm";

export default function App() {
    const [breweries, setBreweries] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [filters, setFilters] = useState({filterByCity: [], filterByType: '', filterByName: ''});
    const [filteredBreweries, setFilteredBreweries] = useState([]);

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
        
        return data;
    }

    useEffect(async () => {
        if(selectedState !== ""){
            const data = await fetchData();
            const cleanData = data.filter(brewery => brewery.brewery_type === "micro" || brewery.brewery_type === "regional" || brewery.brewery_type === "brewpub")
            console.log('Breweries fetched: ', cleanData);
            setBreweries(cleanData);
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
                    <TypeFilter 
                        breweries={breweries}
                        filters={filters}
                        setFilters={setFilters}
                        filteredBreweries={filteredBreweries}
                        setFilteredBreweries={setFilteredBreweries}
                    />
                    <CityFilter 
                        breweries={breweries}
                        filters={filters}
                        setFilters={setFilters}
                        filteredBreweries={filteredBreweries}
                        setFilteredBreweries={setFilteredBreweries}
                    />
                </aside>
                {selectedState && 
                    <ListOfBreweriesHeader 
                        selectedState={selectedState}
                        breweries={breweries}
                        filters={filters}
                        setFilters={setFilters}
                        filteredBreweries={filteredBreweries}
                        setFilteredBreweries={setFilteredBreweries}
                    />}
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
                                                <a href={brewery.website_url} target="_blank" rel="noreferrer">
                                                    Visit Website
                                                </a>
                                            </section>
                                        </div>

                                    </div>
                                    <BookingForm />
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