const CityFilter = props => {
    const renderedCities = [];

    const handleCityFilterChange = event => {
        let cities = [];
        if(props.filters.filterByCity.includes(event.target.value)){
            props.filters.filterByCity.splice(props.filters.filterByCity.indexOf(event.target.value), 1);
            cities = [...props.filters.filterByCity];
        }
        else {
            cities = [...props.filters.filterByCity, event.target.value];
        }
        console.log("%c setFilters", "color: yellow")
        props.setFilters({...props.filters, filterByCity: cities});
    }

    const clearCityFilters = () => {
        props.setFilters({...props.filters, filterByCity: []});
    }

    return(
        <>
            <div className="filter-by-city-heading">
                <h3>Cities</h3>
                <button 
                    className="clear-all-btn"
                    onClick={clearCityFilters}
                >
                    clear all
                </button>
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
                                    checked={props.filters.filterByCity.includes(brewery.city)}
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