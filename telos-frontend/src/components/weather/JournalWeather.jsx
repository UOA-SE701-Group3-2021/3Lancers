import { useEffect, useState } from "react"
import axios from "axios"
import { FaTimes } from 'react-icons/fa';
import styles from './JournalWeather.module.css'

const WEATHER_KEY = '6dd200d839f5f055c8e0e1600cb96fba';

const WeatherWidget = ({ id, deleteWidget }) => {

  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState("Hello");
  const [location, setLocation] = useState("Auckland");

  const fetchWeather = async (loc = "Auckland") => {
    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: loc,
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
    fetchWeather(location);
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