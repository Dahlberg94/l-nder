import { Link, useParams, useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../index.css";
import "./Details.css";

const CountryDetails = () => {
  const { name } = useParams();
  const country = useLoaderData();
  const [loading, setLoading] = useState(true); 
  const [countryNames, setCountryNames] = useState({});

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNameMap = data.reduce((acc, country) => {
          acc[country.cca3] = country.name.common;
          return acc;
        }, {});
        setCountryNames(countryNameMap);
      } catch (error) {
        console.error("Error fetching all countries:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchAllCountries();
  }, []);

  
  if (loading || !country || !countryNames) {
    return (
      <div className="country-details">
        <div className="skeleton-flag-info"></div>
        <div className="skeleton-details-info">
          <div className="skeleton-info"></div>
          <div className="skeleton-info"></div>
          <div className="skeleton-info"></div>
          <div className="skeleton-info"></div>
        </div>
      </div>
    );
  }

  const borders = country.borders || [];

  return (
    <div className="country-details">
      <div className="flag-info">
        <img
          className="flagga"
          src={country.flags.png}
          alt={`${country.name.common} flag`}
        />
      </div>
      <div className="infoD">

          <h1>{country.name.common}</h1>
 
        <div className="details-info">
          <div className="detailsinfo">
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
            <p>
  Native Name:{" "}
  {country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : "No native name available"}
</p>
          </div>
          <div className="detailsinfo">
            <p>Top Level Domain: {country.tld}</p>
            <p>
              Currencies:{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((currency) => `${currency.name}`)
                    .join(", ")
                : "No currencies data available"}
            </p>
            <p>
              Languages:{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "No language data available"}
            </p>
          </div>
        </div>
        <div className="border-countries">
          <h2>Border Countries:</h2>
          <div className="border-scroll">
            {borders.length > 0 ? (
              <ul className="borderulist">
                {borders.map((borderCode) => (
                  <li key={borderCode} className="borderlista">
                    {/* {hittar namn på granländerna av countrynames} */}
                    <Link to={`/country/${countryNames[borderCode]}`}>
                      {countryNames[borderCode]}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>This country has no border Border Countries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CountryDetailsLoader = async ({ params }) => {
  const { name } = params;

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch country details");
    }
    const data = await res.json();
    const country = data[0];

    if (country.borders && country.borders.length > 0) {
      const borderRes = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(
          ","
        )}`
      );
      const neighbors = await borderRes.json();
      country.borders = neighbors.map((neighbor) => neighbor.cca3);
    } else {
      country.borders = [];
    }

    return country;
  } catch (error) {
    console.error("Error loading country details:", error);
    throw new Response("Error loading country details", { status: 500 });
  }
};

export default CountryDetails;
