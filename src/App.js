import { useState,useEffect } from 'react';
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCountriesData = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const res = await data.json();
      setCountries(res);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);
  
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container">
    <h1>Country Flags</h1>
    <input
      className="searchInput"
      type="text"
      placeholder="Search countries..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className="cardsContainer">
      {filteredCountries.length > 0
        ? filteredCountries.map((country) => (
            <div className="countryCard" key={country.cca3}>
              <img
                className="countryImage"
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
              />
              <h2 className="countryName">{country.name.common}</h2>
            </div>
          ))
        : null}
    </div>
  </div>
  );
}

export default App;
