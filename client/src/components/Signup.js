import { React, useState } from 'react'
import Navbar from './Navbar';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const signup = async (ev) => {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/signup", {
            method: "POST",
            body: JSON.stringify({ email, password, cpassword }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
            alert("Signed Up Successfully");
        } else {
            alert("Signup Failed");
        }
    }
    return (
        <div>
            <Navbar />
            <form onSubmit={signup}>
                <input type="email" placeholder="enter your email" value={email} onChange={(ev) => {
                    return setEmail(ev.target.value);
                }} />
                <input type="password" placeholder="create your password" value={password} onChange={(ev) => {
                    return setPassword(ev.target.value);
                }} />
                <input type="password" placeholder="confirm password" value={cpassword} onChange={(ev) => {
                    return setCPassword(ev.target.value);
                }} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Signup