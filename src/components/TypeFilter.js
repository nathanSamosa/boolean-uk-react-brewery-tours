const TypeFilter = props => {

    const handleTypeFilterChange = event => {
        const filter = event.target.value;
        props.setFilters({...props.filters, filterByType: filter});
    }

    //console.log('TypeFilter > props.filters: ', props.filters);

    return(
        <form id="filter-by-type-form" autocompete="off">
            <label htmlFor="filter-by-type"><h3>Type of Brewery</h3></label>
            <select 
                name="filter-by-type" 
                id="filter-by-type"
                onChange={handleTypeFilterChange}
            >
            <option value="">Select a type...</option>
            <option value="micro">Micro</option>
            <option value="regional">Regional</option>
            <option value="brewpub">Brewpub</option>
            </select>
        </form>
    )
}

export default TypeFilter