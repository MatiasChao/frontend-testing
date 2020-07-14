import React, { useEffect, useState } from 'react'
import axios from 'axios'
import credentials from '../credentials'
import GoogleMapReact from 'google-map-react'
import Marker from './maps/Marker'
import Restaurants from './Restaurants'
import RestaurantsPagination from './RestaurantsPagination'

const Home = (props) => { 
    const [user, setUser] = useState(null)
    const [center] = useState({lat: -34.9032800, lng: -56.1881600 });
    const [zoom] = useState(12)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    const [restaurantsPerPage] = useState(10)
    const [totalRestaurants, setTotalRestaurants] = useState(null)

    useEffect(() => {
        if(localStorage.getItem('user-token')){
            getUserInfo()
            checkUrlParams()
        } else
            props.history.push('/login')   
    }, [])

    const getUserInfo = async () => {
        const url = 'http://localhost:4000/api/users/info'

        await axios.get(url, {
            headers: {
                'Authorization' : localStorage.getItem('user-token')
            }
        })
        .then(res => {
            if (res.status === 200){
                setUser(res.data)

                // guardar el usuario para saber la cantidad de usuarios logueados
                saveUserLogged(res.data.id)

                localStorage.setItem('user-country', res.data.country.id)
            }
        })
        .catch(() => {
            console.log('ERROR')
        })
    }

    const saveUserLogged = (id) => {   
        const url = 'http://localhost:4000/api/users/logged'

        axios.post(url, {
            userId: id
        })
    }
        
   const _onClick = ({lat, lng, event}) => {
       setLat(lat)
       setLng(lng)
       searchRestaurantsByCoordinates(lat, lng, 0)
    }  

    const searchRestaurantsByCoordinates = async (latitude, longitude, offset) => {
        setLoading(true)
        const url = 'http://localhost:4000/api/restaurant/search'

        if(!user) await getUserInfo()

        const country = localStorage.getItem('user-country')
        const point = latitude + "," + longitude

        axios.post(url, {
            country: country,
            point: point,
            max: 20,
            offset: offset,
          })
        .then(res => {
            if (res.status === 200){
                setRestaurants(res.data.data)
                setTotalRestaurants(res.data.total)
            }
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    const checkUrlParams = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const latitudeParam = urlParams.get('lat')
        const longitudeParam = urlParams.get('lng')

        if(latitudeParam && longitudeParam)
            searchRestaurantsByCoordinates(latitudeParam, longitudeParam, 0)
    }

    const paginate = pageNumber => {
        let offset = restaurantsPerPage * pageNumber
        searchRestaurantsByCoordinates(lat, lng, offset)
        return pageNumber
    }

    return (
        <div>
            {
                user &&
                <div className="container d-flex justify-content-center pt-3 pb-3" style={{backgroundColor: '#F52F41', color: 'white'}}>
                    <span className="font-weight-bold"> Bienvenido: </span>
                    <span className="ml-2 mr-1"> { user.name } </span>
                    <span> { user.lastName } </span>
                </div>
            }         
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
            
                <div className="col-4 text-center">
                    {
                        totalRestaurants > 0 ?
                        <h3 className="h3 mt-3"> Restaurantes </h3> : 
                        <h4 className="h4 mt-3"> Click en el mapa para ver los restaurantes disponibles </h4>
                    }

                    <Restaurants 
                        restaurants = { restaurants }
                        loading = { loading }
                    />

                    {
                        totalRestaurants > 0 && 
                        <RestaurantsPagination 
                            restaurantsPerPage = { restaurantsPerPage }
                            totalRestaurants = { totalRestaurants }
                            paginate = { paginate }
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Home