import "./App.css";
import Axios from "axios";
import { useState } from "react";
import Prev from "./images/previous.svg";
import Next from "./images/next.svg";
import SunIcon from "./images/sun.png";
import ColdIcon from "./images/cold.png";

function App() {
  const [city, setCity] = useState("");
  const [citySearched, setCitySearched] = useState("");

  const [weatherData, setWeatherData] = useState({});
  const [showData, setShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currDay, setCurrDay] = useState(0);
  const [icon, setIcon] = useState("");

  const getWeather = () => {
    setIsLoading(true);
    Axios.get(`https://goweather.herokuapp.com/weather/${city}`).then(
      (response) => {
        console.log(response);
        console.log(response.data.temperature.substr(1, 3));
        setCitySearched(city);
        setIsLoading(false);
        setWeatherData(response.data);
        determineIcon(response.data);
        setShowData(true);
      }
    );
  };

  const incrementDay = () => {
    if (currDay == 2) {
      setCurrDay(0);
    } else {
      setCurrDay(currDay + 1);
    }
  };

  const decrementDay = () => {
    if (currDay == 0) {
      setCurrDay(2);
    } else {
      setCurrDay(currDay - 1);
    }
  };

  const determineIcon = (weatherData) => {
    if (Number(weatherData.temperature.substr(1, 3)) > 15) {
      setIcon(SunIcon);
    } else {
      setIcon(ColdIcon);
    }
  };

  return (
    <div className="App">
      <div className="inputContainer">
        <input
          onChange={(e) => setCity(e.target.value)}
          type="text"
          className="inputs"
          placeholder="Enter a City"
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      <div className="dataContainer">
        {isLoading && <h1>Data Loading</h1>}
        {showData && (
          <div className="weatherCard">
            <h1 className="dataCity"> {citySearched} </h1>
            <img className="weatherIcon" src={icon} />
            <h3 className="dataWeather">{weatherData.description}</h3>
            <h1 className="dataTemperature">{weatherData.temperature}</h1>
            <div className="forecastContainer">
              <div className="left">
                <button onClick={decrementDay}> &larr; </button>
              </div>
              <div className="middle">
                <div className="forecastData">
                  <h1>Day {weatherData.forecast[currDay].day}</h1>
                  <h1>{weatherData.forecast[currDay].temperature}</h1>
                  <h1>{weatherData.forecast[currDay].wind}</h1>
                </div>
              </div>
              <div className="right">
                <button>
                  <button onClick={incrementDay}> &rarr; </button>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
