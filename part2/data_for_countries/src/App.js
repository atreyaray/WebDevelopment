import React, {useState, useEffect } from 'react';
import axios from 'axios'

const TooManyComp = () =>  (<p>Too many matches, specify another filter</p>)
const FullInfo = (props) => {
  const { final } = props
  // displayWeatherData(final)
  return (
    <>
      <h1>{final.name}</h1>
      <div>capital {final.capital}</div>
      <div>population {final.population}</div>
      <h3>languages</h3>
      <ul>
        {final.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={final.flag} width={100} height={60} alt={'Flag'} ></img>
    </>
  )
}

const App = () => {

  const [countries, setCountries] = useState([
    {
      name: '',
      capital: '',
      population: 0,
      languages: [''],
      flag: '',
      show: false
    },
  ])
  const [weather, setWeather] =useState ({
    temp: 0,
    imgSrc: '',
    windSpeed:0,
    windDir:''
  })
  const [filter, setFilter] = useState('')
  const [showOne, setShowOne] = useState(0)
  
  // hook
  const url = 'https://restcountries.eu/rest/v2/all'
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        const parsedData =  response.data.map(data=> {
            const name = data.name
            const capital = data.capital
            const population = data.population
            const languages = data.languages
            const flag = data.flag
            const show = false
            return { name, capital, population, languages, flag, show }
          })
        setCountries(parsedData)
      })
      },[])

  useEffect( () => {
      const api_key = process.env.REACT_APP_API_KEY 
      const showCountry = countries.filter(country => country.show)
      if (showCountry.length !== 0){
        const params = {
        access_key: api_key,
        query: showCountry[0].capital 
        }
        axios
          .get('http://api.weatherstack.com/current', { params })
          .then(response => {
            const apiResponse = response.data
            const temp = apiResponse.current.temperature
            const imgSrc = apiResponse.current.weather_icons[0]
            const windSpeed = apiResponse.current.wind_speed
            const windDir = apiResponse.current.wind_dir
            const newWeather =  {temp,imgSrc,windSpeed,windDir}
            setWeather(newWeather)
          })
      }
      else{
        // console.log('no',)
      }
    },[countries,showOne] )
  
  // event handler for filter input
  const handleInputChange = (event) => {
    setShowOne(1-showOne)
    const newCountry = event.target.value
    setFilter(newCountry)
    const newCountries = [...countries]
    newCountries.forEach(c => c.show = false)
    setCountries(newCountries)
  }

  //filtered countries and length
  const countriesToShow = countries.filter(c => c.name.toLowerCase().slice(0, filter.length) === filter)
  const results = countriesToShow.length

  // event handler for button click
  const handleButtonClick = (country) => {
    const idx = countries.map((c,i) => c.name === country.name ?i :-1).filter(c => c !== -1)[0]
    const newCountries = [...countries]
    newCountries[idx] = {...country,show:!country.show}
    setCountries(newCountries)
  }

  const handleShowOne = (country) =>{
    setShowOne(1-showOne)
  }

  return(
    <>
      <div>
        find countries <input value={filter} onChange={handleInputChange}/></div>
      <div>
        {
          results > 10 
            ?<TooManyComp /> 
            : countriesToShow.map(country => {
              if (results > 1){ 
                return (
                    <div key={country.name}>
                      {country.name}
                      <button type='button' onClick={handleButtonClick.bind(this, country)} >show</button>
                      {country.show ? <FullInfo final={country}  /> : <></>}
                      {country.show 
                      ?<>
                        <div><strong>temperature:</strong>{weather.temp} Celcisus</div>
                        <img src={weather.imgSrc} width={60} height={60} alt={`weather icon`} />
                        <div><strong>wind: </strong>{weather.windSpeed} mph {weather.windDir}</div>
                       </>
                        
                      :<></> }
                    </div>
                )
              }
              else{
                if (showOne === 0 && country.name !== ''){
                  const idx = countries.map((c, i) => c.name === country.name ? i : -1).filter(c => c !== -1)[0]
                  const newCountries = [...countries]
                  newCountries[idx] = { ...country, show: !country.show }
                  setCountries(newCountries)
                  handleShowOne(country)
                }   
                return(
                  <div key={country.name}>
                    {country.name}
                    <FullInfo final={country} />
                    <>
                      <div><strong>temperature:</strong>{weather.temp} Celsius</div>
                      <img src={weather.imgSrc} width={60} height={60} alt={`weather icon`} />
                      <div><strong>wind: </strong>{weather.windSpeed} mph {weather.windDir}</div>
                    </>
                  </div>
                )
              }
            }) 
        }
      </div>
    </>
  )
}

export default App;
