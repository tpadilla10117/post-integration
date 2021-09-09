import React, { useEffect, useState } from 'react';
import axios from 'axios';
import callApi from "../../api/xutils";

const BASE ="http://localhost:3000/api";

const LoginHandle = (props) => {

    
    const [password, setPassword] = useState('');
    const {token, setToken, user, setUser, username, setUsername} = props;

/* Handler that runs on submit of the returned form: */
/* Test: username: trin, pw: t7711 */
    const handleLogin = async (event) => {
      try {

        event.preventDefault();
       
        const response = await axios.post(`${BASE}/users/login`, 
            {username, password});
        const {data} = response;
      
           
        setUsername('');
        setPassword('');

    /* Set token in localStorage to Persist login: */
        if(data.token) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
        }
        
       /*  const user = await callApi({token: data.token, url: '/users'}); */

  
        if(username && data.recoveredData.username) {
            alert('Logged in!')
            setUser(`${data.recoveredData.username}`)
            console.log("Set the logged in users name:", username);
        }

        
    //Consolelog below gives me the success message and token on the object:
        /* console.log("The user's token:",data.token); */
        console.log("Here is the data:", data);
        console.log("My logged in user's data object:", data.recoveredData);
        console.log("My logged in user's info:", data.recoveredData.username )

        
       
        
      } catch (error) {
          console.log(error);
      }
    };

    useEffect(() => {
        if(token) {
        setUser(user);
        }
    }, []);

    return <>
        <form onSubmit={handleLogin}>
            <h3>Login</h3>
                <input name="username" placeholder="UserName" type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} /><small id="textHelp" className="form-text text-muted">Enter Your UserName</small>

                <input name="password" placeholder="Password" /* minLength="8"  */type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} /><small id="textHelp" className="form-text text-muted">Enter Your Password</small>
                <button type="submit">Login</button>
        </form>
    </>
}

export default LoginHandle;