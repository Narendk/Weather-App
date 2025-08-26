import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { FaCloudSun, FaTemperatureHigh, FaRegStickyNote, FaCity } from "react-icons/fa";

const Weather = () => {

  const [cityInput, setcityInput] = useState("") //InputBox
  const [city, setcity] = useState("") //Output value

  const [weather, setweather] = useState("")
  const [temp, settemp] = useState("")
  const [desc, setdesc] = useState("")

  const [visible, setvisible] = useState(false)

  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6 // slow down video
    }
  }, [])

  function handleCity(event) {
    setcityInput(event.target.value);
  }

  function getWeather() {
    var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=429634b49a952b316f23897e35089a0e`)

    weatherData.then(function (success) {
      console.log(success.data)
      setweather(success.data.weather[0].main)
      setdesc(success.data.weather[0].description)
      settemp((success.data.main.temp - 273.15).toFixed(2))
      setvisible(true)
      setcity(success.data.name);
      setcityInput(""); // clear input box only 
    })
  }

  return (
    <div className="relative h-screen w-screen flex justify-center items-center overflow-hidden">

      <video ref={videoRef} autoPlay loop muted playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/src/assets/weather-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative p-6 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm bg-white/10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-center text-white flex justify-center items-center"><img src="./src/assets/weather-icon.png" alt="weather-icon" />Weather Report</h1>

          <div className="border border-white/50 rounded overflow-hidden bg-white/20">
            <label className="flex items-center px-2">
              <img
                src="./src/assets/icons8-location.gif"
                alt="location"
                className="w-8 h-8"
              />
              <input onChange={handleCity}
                value={cityInput}
                type="text"
                placeholder="Enter location..."
                className="w-full px-2 py-2 outline-none bg-transparent text-white placeholder-white"
              />
              <svg onClick={getWeather} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#616161" d="M34.6 28.1H38.6V45.1H34.6z" transform="rotate(-45.001 36.586 36.587)"></path><path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z"></path><path fill="#37474F" d="M36.2 32.1H40.2V44.400000000000006H36.2z" transform="rotate(-45.001 38.24 38.24)"></path><path fill="#64B5F6" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z"></path><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
              </svg>
            </label>
          </div>

          {
            visible && (
              <div className="bg-white/10 rounded p-4 space-y-2 text-black backdrop-blur-sm">
                <p className='flex gap-2 items-center text-xl'><FaCity className="text-green-400" /><span className="font-semibold text-xl">City:</span> {city}</p>
                <p className='flex gap-2 items-center text-xl'><FaCloudSun className="text-yellow-300" /><span className="font-semibold text-xl">Weather:</span> {weather}</p>
                <p className='flex gap-2 items-center text-xl'><FaTemperatureHigh className="text-red-400" /><span className="font-semibold text-xl">Temperature:</span> {temp}°C</p>
                <p className='flex gap-2 items-center text-xl'><FaRegStickyNote className="text-blue-300" /><span className="font-semibold text-xl">Description:</span> {desc}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>


  )
}

export default Weather