import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Countries = props => {
  const filteredCountries = props.countries.filter(country =>
    country.name.toLowerCase().includes(props.filter.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else if (filteredCountries.length > 1) {
    return filteredCountries.map(country => {
      return (
        <div>
          <p>
            {country.name}
            <button value={country.name} onClick={props.handleFilterChange}>
              show
            </button>
          </p>
        </div>
      );
    });
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    const capital = country.capital;
    const JsonKey = "Enter key here";
    const url =
      "http://api.apixu.com/v1/current.json?key=" + JsonKey + "&q=" + capital;
    const [weather, setWeather] = useState("");
    useEffect(() => {
      axios.get(url).then(response => {
        setWeather(response.data);
      });
    }, []);
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(language => {
            return <li>{language.name}</li>;
          })}
        </ul>
        <img src={country.flag} width="150x" height="150px" />

        <h2>Weather</h2>
        {weather ? (
          <div>
            <p>Temperature: {weather.current.temp_c} Celsius</p>
            <img src={weather.current.condition.icon} />
            <p>
              Wind: {weather.current.wind_kph} kph. Direction:{" "}
              {weather.current.wind_dir}
            </p>
          </div>
        ) : (
          <p>loading weather data</p>
        )}
      </div>
    );
  } else {
    return <p>No countries matched.</p>;
  }
};
const Filter = props => {
  return (
    <div>
      <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Maat</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        setCountries={setCountries}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
