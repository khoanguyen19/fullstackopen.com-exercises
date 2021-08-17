import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ weather }) => {
    return (
        <>
            <h4>{weather.location.name}</h4>
            <h5>Temperature: <span>{weather.current.temperature}</span></h5>
            <img style={{width: "200px"}} src={weather.current.weather_icons[0]} alt="weather"></img>
            <h5>Temperature: <span>{weather.current.wind_speed} kph direction {weather.current.wind_dir}</span></h5>
        </>
    )
}

const CountryToShow = ({ countryToShow }) => {
    return (
        <>
            <h2>{countryToShow[0].name}</h2>
            <p>Capital: {countryToShow[0].capital}</p>
            <p>Population: {countryToShow[0].population}</p>
            <p>Numeric: {+countryToShow[0].numericCode}</p>
            <h4>Languages</h4>
            <ul>
                {countryToShow[0].languages.map((language, index) => {
                    return (
                    <li key={index}>
                        {language.name}
                    </li>
                    )
                })}
            </ul>
            <img style={{width: "200px"}} src={countryToShow[0].flag} alt="flag"></img>
        </>
    )
}

const Country = ({ countries, filterCountry, setFilterCountry}) => {
    
    const [ weather, setWeather ] = useState({});
    const [isLoading, setLoading] = useState(true);
    let countryToShow = [];
    let country;

    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    if(filterCountry) {
        countryToShow = countries.filter(country => {
            const countryNames = country.name.toUpperCase();
            return countryNames.includes(filterCountry.toUpperCase())
        });
        if(countryToShow.length === 1) {
            country = countryToShow[0].name;
        } else {
            country = '';
        }
    }

    useEffect(() => {        
        console.log(country)
        if(country) {
            axios
            .get(`http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${country}`)
            .then(response => {
                setWeather(response.data);
                setLoading(false);
            })
        } else {
            setLoading(true);
        }
    }, [country, WEATHER_API_KEY])

    console.log(weather);

    if(!isLoading && country) {
        return(
            <div>
                <CountryToShow countryToShow={countryToShow}/>
                <Weather weather={weather}/>
            </div>
        )
    } else {
        if(countryToShow.length > 10) {
            return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
            )
        }
    
        const handleShowClick = (e) => {
            setFilterCountry(e.target.previousElementSibling.innerText)
        }
    
        return (
            <div>
            {countryToShow.map((country) => {
                return (
                <div key={country.numericCode}>
                    <span>{country.name}</span> 
                    <button onClick={handleShowClick}>Show</button>
                </div>
                )
            })}
            </div>
        )
    }
    
    
}

export default Country