import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
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

        console.log("llega a login")

        const url = 'http://localhost:4000/api/auth/user'

        axios.post(url, {
            email: email,
            password: password
          })
          .then(function (response) {
            console.log("Auth-user: ", response.data);
            localStorage.setItem('user-token', response.data)
            props.history.push('/home') 
          })
          .catch(function (error) {
            console.log("Auth-error: ",error);
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