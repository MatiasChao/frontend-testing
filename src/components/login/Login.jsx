import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => { 

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault()

        console.log("PROPS: ", props)
        console.log("LOL", process.env.clientUrl)

        const data = {clientId: "test", clientSecret: "PeY@@Tr1v1@943"};
        const url = `http://stg-api.pedidosya.com/public/v1/tokens?clientId=${data.clientId}&clientSecret=${data.clientSecret}`
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        console.log("llegando a login")

        fetch('https://cors-anywhere.herokuapp.com/' + url, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET'
            }
        })
        .then(function(response) {
            console.log("response: ", response)
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
        });
    }

    return (
        <div className="container d-flex justify-content-center" style={{backgroundColor: '#F52F41'}}>
                <div className="form-container mt-5 mb-5 p-3 text-center" style={{backgroundColor: '#fff'}}>
                    <h5 className="m-2 mb-3"> SIGN IN TO YOUR ACCOUNT </h5>

                    <form onSubmit={login}>
                        <div className="mb-2">
                            <input type="text" placeholder="email" className="p-2"
                                value = { email } name = "email" style={{backgroundColor: '#E5E8ED', border: 'none', width: '90%' }}
                                onChange = { e => onChange(e) } />
                        </div>

                        <div className="">
                            <input type="password" placeholder="password" className="p-2"
                                value = { password } name = "password" style={{backgroundColor: '#E5E8ED', border: 'none', width: '90%' }}
                                onChange = { e => onChange(e) }  />
                        </div>

                        <div>
                            <input type="submit" className="mt-4 p-2" value="SIGN IN" style={{ backgroundColor: '#F52F41', border: 'none', color: '#fff', width: '90%' }}/>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Login