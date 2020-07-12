import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => { 

    const [user, setUser] = useState(null)

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

    return (
        <div>
            {
                localStorage.getItem('user-token')
            }
            {
                user &&
                <div className="container d-flex justify-content-center" style={{backgroundColor: '#F52F41', color: 'white'}}>
                    <span> Bienvenido: </span>
                    <span> { user.name } Matias</span>
                    <span> { user.lastName } Chao</span>
                </div>
            }
              <div className="container d-flex justify-content-center" style={{backgroundColor: '#F52F41', color: 'white'}}>
                  <div className="pt-2 pb-2">
                    <span className="font-weight-bold"> Bienvenido: </span>
                    <span> Matias</span>
                    <span> Chao</span>
                  </div>
                </div>
            
        </div>
    )
}

export default Home