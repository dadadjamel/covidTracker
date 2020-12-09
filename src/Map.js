import React, { Component, useState,useEffect } from 'react';
import {MapContainer ,TileLayer} from "react-leaflet"
import "./map.css"
import {showDataOnMap} from './utils'

const Mape = ({countries, casesType,center,zoom}) => {
    // const [mapCenter,setMapCenter] = useState(center)
    // const [mapZoom,setMapZoom] = useState(zoom)
    // useEffect(() => {
    //     const changeState = (state) => setMapCenter(state);
    //     changeState(center)
    //     console.log("from useEffect ",center)
    // }, [center])
    // useEffect(() => {
    //     const changeState = (state) => setMapZoom(state);
    //     changeState(zoom)
    //     console.log("from useEffect ",zoom)
    // }, [zoom])
    
    return ( 
        // <h3>انا الخريطة</h3>
        <div className="map"  >
            <MapContainer center={center} zoom={zoom}>
                {console.log("from component",center)}
                {console.log("from component",zoom)}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                {showDataOnMap(countries,casesType)}
            </MapContainer>
        </div>
     );
}
 
export default Mape;