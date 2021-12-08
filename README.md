# React Brewery Tours

![Brewery Tours example](./images/breweries-tour-react.gif)

You're revisiting the brewery tours javascript exercise to practice some more React concepts.

This exercise gives you another opportunity to interact with an API. It also requires you to use `useEffect` and use more forms.

## Setup

1. Fork this repository
2. Clone the forked repository onto your local machines
3. In the root directory, type `npm install`, which installs dependencies for the project
4. Finally, type `npm run start`, which starts a development server that runs your website in the browser. That server will reload your website whenever you make any changes to source files

## Deliverables

- A user can enter a US state and view a list of breweries in that state
	- The list has a maximum of 10 breweries on display
	- The list has three types of breweries that offer brewery tours:
		- Micro
		- Regional
		- Brewpub
	- **Do not** show the other types of breweries
- From the list of breweries, a user can view the following details about each brewery:
	- Name
	- Type of brewery
	- Address
	- Phone Number
- From the list of breweries, a user can visit the website of a brewery
- From the list of breweries, a user can open one booking form at a time
- The user can submit the booking form to book a tour
- The booking form should clear after submitted
- Each booking form should keep the data until it's submitted
- From the 'filter by type of brewery' section, a user can filter by type of brewery
- From the 'filter by city' section, a user can filter by city, the location of the brewery
- From the 'filter by city' section, a user can clear all filters
- From the 'search' section, a user can search for breweries by:
	- Name
	- City

## Instructions

- Start a json-server **with a different port than the React server**, use the following command `json-server --watch db.json -p 4000`
- Read the "Open Brewery DB" documentation: https://www.openbrewerydb.org/documentation/01-listbreweries
(https://api.openbrewerydb.org/breweries?by_state=ohio)

- Think about which request type to use
- Render the main section with the breweries list you get from your search by state fetch
- When a form is submitted, its data should be saved in the json-server
- Render the side section with all the filter options. When applied, the main section should immediately render the filtered list

## Tips

- Start with the logic first, use `console.log(state)` to check your logic is working; when the logic is working as expected move on to styling
- Use a `cleanData` function to modify the data in the fetch request before adding it to its corresponding state
- Use an `extractCitiesData` function to extract the cities from the data in the fetch request and add it to state for the 'filter by city' section
- For filter by type use a `select` element to capture user input
- For filter by city use a list of `checkbox` elements to capture user input
- For the booking form, use a `date` and `time` input

## Extra Challenge 1

- Add pagination to the list; if the list of breweries is greater than 10 a user can go to the next page to view more breweries

## Extra Challenge 2

- Add a submitted bookings page; this page should replace the list and filters sections, and display all the bookings that were saved in the server. You should display each booking data and the respective brewery info. Create also an option to group the bookings by brewery, and display all bookings per brewery
