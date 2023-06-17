

import React, { useState, useEffect } from 'react';

const CountryDetails = ({ country }) => {
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v2/name/${country}?fullText=true`);
    
        const data = await response.json();
        console.log(data)
        setCountryDetails(data[0]); // Assuming the first result is the correct country
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountryDetails();
  }, [country]);

  if (!countryDetails) {
    return <div>Loading...</div>;
  }

  const { name, flag, population, currencies,latlng,region,languages,capital,timezones,nativeName
   } = countryDetails;

  return (
    <div className="country-details">
      <h3 className='text-center text-uppercase'>{name}</h3>
      <img src={flag} alt={`${name} Flag`} className="country-flag img-fluid" />
      {/* <span>Population: {population}</span>
      <span>Currency: </span> */}
      <table className='mt-1'>
        <tr>
        <th>capital</th>
        <td>{capital}</td>
        </tr>
        <tr>
        <th>currency</th>
        <td>{currencies[0].name} ({currencies[0].code}) ({currencies[0].symbol})</td>
        </tr>
        <tr>
        <th>Population</th>
        <td>{population}</td>
        </tr>
  <tr>
        <th>LatLang</th>
        <td>{latlng[0]},{latlng[1]}</td>
        </tr>

        <tr>
        <th >Language</th>
        <td>
          <span className="lang-btn">{languages[0].name}</span>
          {/* <span className="lang-btn">{languages[1].name}</span> */}
        </td>
        </tr>

        <tr>
        <th>Nativename</th>
        <td>{nativeName}</td>
        </tr>

        <tr>
        <th >timezone</th>
        <td>{timezones}</td>
        </tr>
        <tr>
        <th >Region</th>
        <td>{region}</td>
        </tr>


        
      </table>
    </div>
  );
};

export default CountryDetails;
