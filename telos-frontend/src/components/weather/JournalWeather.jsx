import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa';
import styles from './JournalWeather.module.css'

const WEATHER_KEY = '6dd200d839f5f055c8e0e1600cb96fba';

const WeatherWidget = ({ id, deleteWidget }) => {

  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState("Unknown");
  const [location, setLocation] = useState("Unknown");

  const fetchWeather = async (lat = 0, lon = 0) => {
    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat,
            lon,
            appid: WEATHER_KEY,
            units: "metric"
          }
        }
      );
      setDesc(res.data.weather[0].main);
      setTemp(res.data.main.temp);
      setLocation(res.data.name)
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeather(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return (
    <div className={styles.weatherWidget}>
      <div className={styles.header}>
        <FaTimes className={styles.cross} onClick={() => deleteWidget(id)} />
      </div>
      <div className={styles.weather}>
        <div className={styles.box}>
          <h1>{Math.round(temp)}℃</h1>
          <h3>{location}</h3>
          <h3>{desc}</h3>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget;
