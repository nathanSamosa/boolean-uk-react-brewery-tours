const ListOfBreweriesHeader = props => {
    return(
        <>
            <h1>List of Breweries from {props.selectedState}</h1>
            <header className="search-bar">
                <form id="search-breweries-form" autocomplete="off">
                    <label htmlFor="search-breweries"><h2>Search breweries:</h2></label>
                    <input id="search-breweries" name="search-breweries" type="text" />
                </form>
            </header>
        </>
    )
}

export default ListOfBreweriesHeader