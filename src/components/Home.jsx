import React, { useEffect, useState } from 'react'
import axios from 'axios'
import credentials from '../credentials'
import GoogleMapReact from 'google-map-react'
import Marker from './maps/Marker'

const Home = () => { 
    const [user, setUser] = useState(null)
    const [center, setCenter] = useState({lat: -34.9032800, lng: -56.1881600 });
    const [zoom, setZoom] = useState(12)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)


    useEffect(() => {
        //getUserInfo()
    }, [])

    const getUserInfo = () => {
        const url = 'http://localhost:4000/api/users/info'

        axios.get(url, {
            headers: {
                'Authorization' : localStorage.getItem('user-token')
            }
        })
        .then(res => {
            if (res.status === 200){
                console.log("res" , res.data)
                setUser(res.data)
            }  
        })
        .catch(() => {
            console.log('ERROR')
        })
    }
        
   const _onClick = ({lat, lng, event}) => {
       console.log(lat, lng, event) 
       setLat(lat)
       setLng(lng)

       searchRestaurantsByCoordinates(lat, lng)
    }  

    // PEGARLE AL BACK ASI ME TRAER LOS RESTAURANTES...
    const searchRestaurantsByCoordinates = ({lat, lng}) => {

    }

    return (
        <div>
            {
                user &&
                <div className="container d-flex justify-content-center" style={{backgroundColor: '#F52F41', color: 'white'}}>
                    <span> Bienvenido: </span>
                    <span> { user.name } Matias</span>
                    <span> { user.lastName } Chao</span>
                </div>
            }
              <div className="container p-4" style={{backgroundColor: '#F52F41', color: 'white'}}>
                  
                  <div className="row pb-5">
                      <div className="col-12 d-flex justify-content-center">
                        <span className="font-weight-bold"> Bienvenido: </span>
                        <span className="pl-2 pr-1"> Matias</span>
                        <span> Chao</span>
                      </div>
                  </div>

                </div>
                
                
                <div className="row w-100">
                    
                    <div className="col-6 text-center mt-4" style={{width: '100%', height: '550px'}}>
                        <GoogleMapReact
                            bootstrapURLKeys = {{ key: credentials.mapsKey }}
                            defaultZoom = { zoom }
                            defaultCenter = { center }
                            yesIWantToUseGoogleMapApiInternals
                            onClick = { _onClick }
                        >
                            {
                                lat && 
                                <Marker
                                    lat = { lat }
                                    lng = { lng }
                                    name="My Marker"
                                    color = "#F52F41"
                                />
                            }
                        </GoogleMapReact>
                    </div>

                    <div className="col-3">
                        restanrantes
                        {lat && lat} 
                        {lng && lng}
                    </div>
                </div>
            
        </div>
    )
}


export default Home