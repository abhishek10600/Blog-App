import { React, useContext, useState } from 'react'
import Navbar from './Navbar'
import { Navigate } from "react-router-dom";
import { UserContext } from '../Contexts/UserContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const login = async (ev) => {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
        if (response.ok) {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        } else {
            alert("Invalid Credentials");
        }
    }
    if (redirect) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <Navbar />
            <form onSubmit={login}>
                <input
                    type="email"
                    placeholder="enter your email"
                    value={email}
                    onChange={(ev) => {
                        return setEmail(ev.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="enter your password"
                    value={password}
                    onChange={(ev) => {
                        return setPassword(ev.target.value);
                    }}
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login