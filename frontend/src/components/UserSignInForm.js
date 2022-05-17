import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function UserSignInForm(){
    const API = process.env.REACT_APP_API_URL;
    const [signInCred, setSignInCred] = useState({
        username: "",
        password: ""
    })

    const handleInputChange = (event) => {
        setSignInCred({...signInCred, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //axios get user, if no user found show alert message


    }
    return (
        <div>
            <form onSubmit={handleSubmit} onChange={handleInputChange}>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" required/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="text" required/>
                <input type="submit" />
                <div>
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default UserSignInForm