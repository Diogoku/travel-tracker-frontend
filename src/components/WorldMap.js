import React, { useState, useEffect } from "react";

// REACT-REDUX
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

// REACT-LEAFLET
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// AXIOS
import axios from "../axios";

// CSS
import "../css/worldMap.css";

function WorldMap() {
  const [countriesData, setCountriesData] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const { data } = await axios.get(process.env.REACT_APP_COUNTRIES_API);
      setCountriesData(data);
    };
    fetchCountriesData();
  }, []);

  return (
    <div className="worldMap">
      <Map center={{ lat: 34.80746, lng: -40.4796 }} zoom={2}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countriesData.map((countryData) => {
          if (
            countryData.latlng[0] &&
            countryData.latlng[1] &&
            user.countries.includes(countryData.name)
          ) {
            return (
              <Marker
                key={countryData.alpha2Code}
                position={countryData.latlng}
              >
                <Popup>{countryData.name}</Popup>
              </Marker>
            );
          }
        })}
      </Map>
      <div className="test"></div>
    </div>
  );
}

export default WorldMap;
