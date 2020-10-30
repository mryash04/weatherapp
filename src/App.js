import React from 'react';
import "./index.css";
import {useState} from 'react';

const api={
  key: "c50ce91fa3b698c9c1a76e31326ef3f5",
  base: "http://api.openweathermap.org/data/2.5/"
}

const App = () =>{

  const[query, setQuery] = useState("");
  const[weather, setWeather] = useState("");

  const search = (evt) =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then((apidata) =>{
        return apidata.json();
      }).then((releatedinfodata) =>{
        setWeather(releatedinfodata);
        setQuery("");
      });
    };
  };

  const date = new Date().toLocaleDateString();

  let dateinfo = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sataurday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}, ${month}, ${year}`;  
  }

  return(
    <React.Fragment>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'warm': 'cold'): 'cold'}>
        <main>
        <div className="input-box">
          <input type="text" placeholder="search...." className="search-bar"
          onChange={e => setQuery(e.target.value)} 
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
              <div className="location-info">
                  <h2>{weather.name}, {weather.sys.country}</h2>
                  <p className="date-datainfo">{dateinfo(new Date())}</p>
              </div>
              <div className="weather-info">
                  <h2 className="weather-temprature">{Math.round(weather.main.temp)}°c</h2>
                  <p className="weather-type">{weather.weather[0].main}</p>
              </div>
          </div>
        ) : ("")}
        </main>
      </div>
    </React.Fragment>
  );
};

export default App;
