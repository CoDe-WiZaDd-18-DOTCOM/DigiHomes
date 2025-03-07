import countries from "world-countries";

// TODO: In the future, replace this with a backend API call to fetch country data dynamically
const fetchCountriesFromBackend = async () => {
    // Example: Fetch data from a Spring Boot backend
    // const response = await fetch("/api/countries");
    // const data = await response.json();
    
    return countries.map((country) => ({
        value: country.name.common,
        label: `${country.name.common} ${country.flag}`,
        latlng: country.latlng,
        region: country.region
    }));
};

const useCountries = () => {
    const getAll = () => {
        // Currently using static data, but can be replaced with backend data
        return formattedCountries;
    };

    return { getAll };
};

const formattedCountries = countries.map((country) => ({
    value: country.name.common,
    label: `${country.name.common} ${country.flag}`,
    latlng: country.latlng,
    region: country.region
}));

export default useCountries;
