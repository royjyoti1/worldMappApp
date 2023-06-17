import React, { useState ,useEffect } from 'react';
import mapData from '../data/countries.json'
import { MapContainer ,GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './worldMap.css';
import CountryDetails from './CountryDetails';


const WorldMap = () => {

    const[selectedCountry,setSelectedCountry]=useState(null);
    const [searchCountry, setSearchCountry] = useState('');
    const[mapHighlight,setMapHighlight]=useState("red")


    
    const onCountryMouseOver=(e)=>{
        e.target.setStyle({
            color:"yellow",
            opacity:"0.4"
        })

    }
    const onCountryClick=(e)=>{
    
        const country=e.target.feature.properties.ADMIN;
        setSelectedCountry(country);
        e.target.setStyle({
            color:mapHighlight,
            opacity:"0.5"
            
        })

    
    }
    
    
    
    const onEachCountry=(country,Layer)=>{
        const countryName=country.properties.ADMIN;
        Layer.bindPopup(countryName);
        Layer.on({
            mouseover:onCountryMouseOver,
            click:onCountryClick
        })
    }
    const handleSearch = (e) => {
        setSearchCountry(e.target.value);
        setMapHighlight("green");
      };
    
      useEffect(() => {
        // Reset selected country when search input is changed
        setSelectedCountry(null);
      }, [searchCountry]);

  return (
  <section className='container'>
  <h3 className='text-center text-danger'>World Map App</h3>
   <article className='row border-2 p-1'>
    <div className="searchBar text-center p-2">
        <input type="text" placeholder='enter country to search'
        value={searchCountry} onChange={handleSearch} />
        <i className="fa-solid fa-magnifying-glass"></i>
    </div>
   <MapContainer 
  className='col-9'
  style={{"height":"90vh"}}
  zoom={2}
  center={[20,100]}
  doubleClickZoom={false} //disable double click zoom
  tap={false}

  >
    <GeoJSON data={mapData.features}
    className="country-map"
    style={{"color":"skyblue"}}
    onEachFeature={onEachCountry}
    ></GeoJSON>  {/* this GeoJson take country geographic data and help to create shape of country*/ }
    

  </MapContainer>
  <div className='col-3 border border-2 rounded p-2 countryDetails-Container' style={{ "height": "90vh" }}>
          {selectedCountry || searchCountry ? (
            <CountryDetails country={selectedCountry || searchCountry} />
          ) : (
            <div className="empty-details">No country selected</div>
          )}
        </div>
   </article>
  </section>
  );
}
  
  


export default WorldMap;
