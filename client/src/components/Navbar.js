import { React, useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../Contexts/UserContext';

const Navbar = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include"
        }).then((response) => {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
            });
        });
    }, []);
    const logout = () => {
        fetch("http://localhost:4000/logout", {
            method: "POST",
            credentials: "include"
        });
        setUserInfo(null);
    }
    const username = userInfo?.email;
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Blogger</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {username && (<>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/create">Create Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" onClick={logout}>Logout</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page">Welcome {username}</Link>
                                </li>
                            </>)}
                            {!username && (<>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/signup">Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                            </>)}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar