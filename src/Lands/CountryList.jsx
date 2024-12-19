import { Link, useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Loader.css";
import "../index.css";

const CountryList = () => {
  const countries = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const regions = [...new Set(countries.map((country) => country.region))];

  
  useEffect(() => {
    if (countries) {
      setIsLoading(false); 
    } else {
      setError("Failed to load data"); 
    }
  }, [countries]);

 
  const filterCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion
      ? country.region === selectedRegion
      : true;
    return matchesSearch && matchesRegion;
  });

  if (isLoading) {
    
    return (
      <div className="container">
        <div className="filter">
          <input
            type="search"
            className="searchBar"
            placeholder="search for a country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="regionDropdown"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">All Regions</option>
          </select>
        </div>

        <div className="countries-container">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="skeleton-country-item">
                <div className="skeleton-flag"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    
    return (
      <div className="error-message">
        <p>Failed to load countries. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="filter">
        <input
          className="searchBar"
          placeholder="search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> 
        <select className="regionDropdown" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="">All Regions</option>
            {regions.map((region) => (
                <option key={region} value={region}>
                    {region}
                </option>
            ))}
        </select>
      </div>
      <div className="countries-container">
        {filterCountries.map((country) => (
          <Link to={`/country/${country.name.common}`} key={country.cca3} className="linksCard" >
          <div className="country-item">
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              className="country-flag"
            />
            <div className="countrues-container-info">
            <h3 className="country-name">{country.name.common}</h3>
            <p className="country-population">
              Population: {country.population.toLocaleString()}
            </p>
            <p className="country-region">Region: {country.region}</p>
            <p className="country-capital">Capital: {country.capital}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export const CountryListLoader = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    console.log("API response status:", res.status); // Kontrollera status
    if (!res.ok) {
      throw new Error("Failed to fetch countries");
    }
    const data = await res.json();
    const sortedData = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common, "sv")
    );
    console.log("Fetched sortedData:", sortedData); // Visa hämtad data
    return sortedData;
  } catch (error) {
    console.error("Error in CountryListLoader:", error);
    throw new Response("Error loading countries", { status: 500 });
  }
};

export default CountryList;
