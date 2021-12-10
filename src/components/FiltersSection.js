import TypeFilter from "../components/TypeFilter";
import CityFilter from "../components/CityFilter";

const FilterSection = props => {
    return (
        <aside className="filters-section">
        <h2>Filter By:</h2>
        <TypeFilter 
            breweries={props.breweries}
            filters={props.filters}
            setFilters={props.setFilters}
            filteredBreweries={props.filteredBreweries}
            setFilteredBreweries={props.setFilteredBreweries}
        />
        <CityFilter 
            breweries={props.breweries}
            filters={props.filters}
            setFilters={props.setFilters}
            filteredBreweries={props.filteredBreweries}
            setFilteredBreweries={props.setFilteredBreweries}
        />
    </aside>
    )
}

export default FilterSection