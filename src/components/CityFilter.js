const CityFilter = props => {
    const renderedCities = [];

    const handleCityFilterChange = event => {

    }

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