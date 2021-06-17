import React, { useEffect, useState } from 'react';
import axios from 'axios';
import callApi from "../../utils.js"

const BASE ="http://localhost:3000/api";

const LoginHandle = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {token, setToken, user, setUser} = props;

    const handleLogin = async (event) => {
      try {

        event.preventDefault();
       
        const response = await axios.post(`${BASE}/users/login`, 
            {username, password});
        const {data} = response;
      
           
        setUsername('');
        setPassword('');
        localStorage.setItem('token', data.token);
        setToken(data.token);
        const user = await callApi({token: data.token, url: '/users'});
       /*  if(user && user.username) {
            swal(`Welcome ${user.username}!`, "You Have Succesfully Logged In!", "success");
        } */
      } catch (error) {
          console.log(error);
      }
        }

    useEffect(() => {
        if(token) {
        setUser(user);
        }
    }, []);

    return <>
        <form onSubmit={handleLogin}>
            <h3>Login</h3>
                <input name="username" placeholder="UserName" type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} /><small id="textHelp" className="form-text text-muted">Enter Your UserName</small>

                <input name="password" placeholder="Password" minLength="8" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} /><small id="textHelp" className="form-text text-muted">Enter Your Password</small>
                <button type="submit">Login</button>
        </form>
    </>
}

export default LoginHandle;