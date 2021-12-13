import { useState, useEffect } from "react";

import Header from "./components/Header";
import ListOfBreweriesHeader from "./components/ListOfBreweriesHeader";
import BookingForm from "./components/BookingForm";
import TypeFilter from "./components/TypeFilter";
import CityFilter from "./components/CityFilter";

export default function App() {
    const [breweries, setBreweries] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [filters, setFilters] = useState({filterByCity: [], filterByType: '', filterByName: ''});
    const [filteredBreweries, setFilteredBreweries] = useState([]);
    const [bookingFormButtons, setBookingFormButtons] = useState([]);
    let stateString;

    console.log("selectedState: ", selectedState);
    console.log("breweries", breweries);
    console.log("filteredBreweries:", filteredBreweries)
    console.log("filters:", filters)
    console.log("bookingForm:", bookingFormButtons)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("%c setSelectedState", "color: yellow")
        setSelectedState(stateString);
    };

    const handleSelectStateInput = (event) => stateString = event.target.value.split(" ").join("_");

    const fetchData = async () => {
        const res = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=10&page=${pageNumber}`);
        const data = await res.json();
        const cleanData = data.filter(brewery => brewery.brewery_type === "micro" || brewery.brewery_type === "regional" || brewery.brewery_type === "brewpub")
        
        return cleanData;
    }

    useEffect(async () => {
        if(selectedState !== ""){
            try {
                const data = await fetchData();
                console.log("%c setBreweries", "color: yellow")
                setBreweries(data);
            }
            catch (error) {
                console.log(error);
            }
        }
    }, [selectedState]);

    useEffect(() => {
        if(breweries.length > 0){
            console.log("%c setFilteredBreweries", "color: yellow")
            setFilteredBreweries(breweries);
        }
    }, [breweries])

    const filterByType = (filtered) => {
        return filtered.filter(brewery => brewery.brewery_type.toLowerCase() === filters.filterByType);
    }

    const filterByCity = (filtered) => {
        return filtered.filter(brewery => filters.filterByCity.includes(brewery.city));
    }

    const filterByName = (filtered) => {
        return filtered.filter(brewery => brewery.name.toLowerCase().includes(filters.filterByName.toLowerCase()));
    }

    useEffect(() => {
        let filtered = [...breweries];
        filters.filterByType !== "" && (filtered = filterByType(filtered));
        filters.filterByName !== "" && (filtered = filterByName(filtered));
        filters.filterByCity.length > 0 && (filtered = filterByCity(filtered));
        console.log("filtered useEffect: ", filtered);
        setFilteredBreweries(filtered);
    }, [filters])

    useEffect(() => {
        if(breweries.length > 0){
            console.log("%c setBookingForm", "color: yellow")
            setBookingFormButtons(new Array(breweries.length).fill(false))
        }
    }, [breweries])

    const handleBookingToggle = event=> {
        console.log("HANDLE", event.target.id)
        bookingFormButtons[Number(event.target.id)] = !bookingFormButtons[Number(event.target.id)]
        console.log(bookingFormButtons)
        setBookingFormButtons([...bookingFormButtons])
    }

    useEffect(async () => {
        if(selectedState && pageNumber > 0){
            try {
                const data = await fetchData();
                console.log("%c setBreweries", "color: yellow")
                setBreweries(data);
            }
            catch (error) {
                console.log(error);
            }
        }
    }, [pageNumber]);

    const handleNextPageClick = event => {
        let tempPageNumber = pageNumber;
        tempPageNumber++;
        setPageNumber(tempPageNumber);
    }
    
    console.log(pageNumber);

    const handlePreviousPageClick = event => {
        let tempPageNumber = pageNumber;
        if(tempPageNumber > 1) {
            tempPageNumber--;
        }
        setPageNumber(tempPageNumber);
    }

    return (
        <>
            <Header
                handleSubmit={handleSubmit}
                handleInput={handleSelectStateInput}
            />
            <main>
                {selectedState &&
                    <aside className="filters-section">
                        <h2>Filter By:</h2>
                        <TypeFilter 
                            breweries={breweries}
                            filters={filters}
                            setFilters={setFilters}
                        />
                        <CityFilter 
                            breweries={breweries}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </aside>
                }
                {selectedState && 
                    <ListOfBreweriesHeader 
                        selectedState={selectedState}
                        breweries={breweries}
                        filters={filters}
                        setFilters={setFilters}
                        filteredBreweries={filteredBreweries}
                        setFilteredBreweries={setFilteredBreweries}
                    />
                }
                <article>
                    <ul className="breweries-list">
                        {filteredBreweries.map((brewery, index) => {
                            return (
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
                                                <button id={index} onClick={handleBookingToggle}>
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
                                    {bookingFormButtons[index] &&
                                        <BookingForm
                                            brewery={brewery}
                                        />
                                    }
                                </li>
                            );
                        })}
                    </ul>
                    {selectedState && <button 
                        onClick={handlePreviousPageClick}>
                            Previous page
                    </button>}
                    {selectedState && <button 
                        onClick={handleNextPageClick}>
                            Next page
                    </button>}
                </article>
            </main>
        </>
    );
}