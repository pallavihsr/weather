import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/navbar/NavBar';
import { Container, Form } from 'react-bootstrap';
import Home from './assets/home.png';
import CloudyBlue from './assets/cloudy-blue.svg';
import RainyBlue from './assets/rainy-blue.svg';
import PartialBlue from './assets/partial-blue.svg';
import SunnyBlue from './assets/sunny-blue.svg';
import weatherData from './result';
import lastMonth from './result2';

import cloudy from './assets/cloudy.svg';
import rainy from './assets/rainy.svg';
import sunny from './assets/sunny.svg';
import partial from './assets/partial.svg';
import MyLineChart from './MyLineChart';


function App() {
  const [city, setCity] = useState('New York');
  const [country, setCountry] = useState('United States');
  const [lat, setLat] = useState('39.6852874');
  const [long, setLong] = useState('-93.9268836');
  const [date, setDate] = useState('');
  const [data, setData] = useState(weatherData);
  const [data2, setData2] = useState(lastMonth);

  const weatherConditionMap = {
    Sunny: SunnyBlue,
    Drizzle: RainyBlue,
    Clouds: CloudyBlue,
    Clear: SunnyBlue,
    Thunderstorm: RainyBlue,
    Rain: RainyBlue,
    Snow: RainyBlue,
  };

  const fetchData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // fetchData();
    const currentDate = new Date();

    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(currentDate);
    setDate(formattedDate);
    // Set the date to the first day of the current month
    currentDate.setDate(1);

    // Move to the previous month
    currentDate.setMonth(currentDate.getMonth() - 1);

    // Get the timestamp of the first day of the previous month
    const firstDayOfPreviousMonthTimestamp = currentDate.getTime() / 1000; // Convert to seconds

    // Move to the first day of the current month
    currentDate.setDate(1);

    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);

    // Set the date to the last day of the previous month
    currentDate.setDate(0);

    // Get the timestamp of the last day of the previous month
    const lastDayOfPreviousMonthTimestamp = currentDate.getTime() / 1000;
    console.log(lastDayOfPreviousMonthTimestamp);
    console.log(firstDayOfPreviousMonthTimestamp);
  }, []);

  return (
    <>
      <div className='p-3'>
        <NavBar city={city} country={country} />
        {/* Header Data */}

        <Container className='my-5 d-flex justify-content-between align-items-center'>
          <div className='location-details'>
            <h2 className='m-0'>{city}, <br /> {country}</h2>
            <p className='date m-0'>{date}</p>
            <div className='d-flex align-items-center mt-1'>
              <>
                <img src={weatherConditionMap[data.current.weather[0].main]} alt="Clear" />
                <span className='ms-2 text-blue'>{data.current.weather[0].main}</span>
              </>
            </div>
          </div>
          <div className='home-image'>
            <img src={Home} alt="Home Image" />
            <button className='home-live-button'>Live</button>
          </div>
        </Container>

        <Container className='weather-short-info my-5'>
          <div className='d-flex justify-content-between weather-card-container'>
            {/* <div className='text-white text-center weather-card active'>
              <p className='mb-2'>{(new Date(data.current.dt * 1000).getHours())}:00</p>
              <img src={cloudy} alt="Cloud Image" />
              <p className='mt-2 mb-0'>{(data.current.temp).toFixed()}</p>
            </div> */}
            {data.hourly.map((hour, index) => {
              if (index == 0) {
                return (
                  <div className='text-white text-center weather-card active'>
                    <p className='mb-2'>{(new Date(hour.dt * 1000).getHours())}:00</p>
                    <img src={cloudy} alt="Cloud Image" />
                    <p className='mt-2 mb-0'>{(hour.temp).toFixed()}</p>
                  </div>
                )
              } else {
                return (
                  <div className='text-white text-center weather-card'>
                    <p className='mb-2'>{(new Date(hour.dt * 1000).getHours())}:00</p>
                    <img src={cloudy} alt="Cloud Image" />
                    <p className='mt-2 mb-0'>{(hour.temp).toFixed()}</p>
                  </div>
                )
              }
            })}
          </div>
        </Container>

        <hr className='divider' />
        <Container className='my-4 additional-info'>
          <h3>Additional Info</h3>
          <div className='d-flex justify-content-between mt-3'>
            <div className='additional-info-card'>
              <p className='unit my-0'>Precipitation</p>
              <p className='value my-2'>{data.hourly.reduce((totalPop, hour) => totalPop + hour.pop, 0) / data.hourly.length}%</p>
            </div>
            <div className='additional-info-card'>
              <p className='unit my-0'>Humidity</p>
              <p className='value my-2'>{data.current.humidity}%</p>
            </div>
            <div className='additional-info-card'>
              <p className='unit my-0'>Windy</p>
              <p className='value my-2'>{(data.current.wind_speed * 3.6).toFixed(0)}Km/h</p>
            </div>
          </div>
        </Container>
        <hr className='divider' />
        <Container className='mt-4'>
          <div className='d-flex justify-content-between temperature-heading align-items-center'>
            <h3 className='m-0'>Temperature</h3>
            <Form.Select>
              <option>Last month</option>
              <option>Last week</option>
              <option>Last year</option>
            </Form.Select>
          </div>
        </Container>
      </div>
      <MyLineChart data={data.daily} data2={data2.daily} />
    </>
  );
}

export default App;
