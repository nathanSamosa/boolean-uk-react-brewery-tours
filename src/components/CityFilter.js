const CityFilter = props => {
    const renderedCities = [];

    props.setFilteredBreweries(props.breweries);

    const handleCityFilterChange = event => {
        let cities = [];
        if(props.filters.filterByCity.includes(event.target.value)){
            props.filters.filterByCity.splice(props.filters.filterByCity.indexOf(event.target.value), 1);
            cities = [...props.filters.filterByCity];
        }
        else {
            cities = [...props.filters.filterByCity, event.target.value];
        }
        props.setFilters({...props.filters, filterByCity: cities});
    }

    console.log('CityFilter > props.filters: ', props.filters);

    return(
        <>
            <div className="filter-by-city-heading">
                <h3>Cities</h3>
                <button className="clear-all-btn">clear all</button>
            </div>
            <form id="filter-by-city-form">
                {props.breweries.map(brewery => {
                    if(!renderedCities.includes(brewery.city)){
                        renderedCities.push(brewery.city);
                        return (
                            <>
                                <input 
                                    type="checkbox" 
                                    name={brewery.city} 
                                    value={brewery.city} 
                                    onChange={handleCityFilterChange}
                                />
                                <label htmlFor={brewery.city}>{brewery.city}</label>
                            </>
                        )
                    }
                })}
            </form>
        </>
    )
}

export default CityFilter