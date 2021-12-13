const ListOfBreweriesHeader = props => {

    //props.setFilteredBreweries(props.breweries);
    
    const handleNameFilterChange = event => {
        const filter = event.target.value;
        props.setFilters({...props.filters, filterByName: filter});
    }

    const handleNameFilterSubmit = event => {
        event.preventDefault();
        console.log('write handle name filter submit');
    }

    //console.log('ListOfBreweriesHeader > props.filters: ', props.filters);

    return(
        <>
            <h1>List of Breweries from {props.selectedState}</h1>
            <header className="search-bar">
                <form id="search-breweries-form" autocomplete="off">
                    <label htmlFor="search-breweries"><h2>Search breweries:</h2></label>
                    <input 
                        id="search-breweries" 
                        name="search-breweries" 
                        type="text" 
                        onChange={handleNameFilterChange}
                        onSubmit={handleNameFilterSubmit}
                    />
                </form>
            </header>
        </>
    )
}

export default ListOfBreweriesHeader