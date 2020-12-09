import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core"
import InfoBox from './InfoBox';
import Mape from './Map';
import Table from './Table';
import {sortData} from './utils'
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css"

function App() {

  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('worldwide')
  const [countryInfo, setcountryInfo] = useState({})
  const [tabledata, settabledata] = useState([])
  const [mapCenter,setMapCenter] = useState([34.80746, -40.479])
  const [mapzoom,setmapzoom] = useState(3) 
  const [mapCountries,setmapCountries] = useState([])
  const [casestype,setcasestype] =useState('cases')

  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setcountryInfo(data)
    })
  },[])

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          const sortedData = sortData(data)
          setcountries(countries)
          settabledata(sortedData)
          setmapCountries(data)
        })

    }
    getCountriesData()

  }, [])

  const onCountryChange = async (e) => {
    
    const countryCode = e.target.value
    console.log("country code : ",countryCode)
    setcountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then((response) => response.json())
    .then(data =>{
      setcountryInfo(data)
      console.log(data)
      setcountry(countryCode)
      setMapCenter(data.countryInfo?.lat ,data.countryInfo?.long)
      console.log({data:[data.countryInfo?.lat ,data.countryInfo?.long]})
      setmapzoom(4)
      // setmapcenter({lat:data.countryInfo?.lat, lng:data.countryInfo?.lng})
    })
    
  }
  
  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left" >
        <div className='app__header' >
          <h2>Covid-19 Tracker</h2>
          <FormControl className="app__dropdown">
            <Select  onChange={onCountryChange} variant='outlined' value={country} >
              <MenuItem value="worldwide" >Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value} >{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats" >
          <InfoBox isred active={casestype==="cases"} onClick={e => setcasestype('cases')} title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox active={casestype==="recovered"} onClick={e => setcasestype('recovered')} title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox isred active={casestype==="deaths"} onClick={e => setcasestype('deaths')} title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Mape casesType={casestype} countries={mapCountries} center={mapCenter} zoom={mapzoom} />
      </div>

      <Card className="app__right" >
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tabledata} />
            <h3>Worldwide new {casestype}</h3>
          <LineGraph casesType={casestype}/>
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
