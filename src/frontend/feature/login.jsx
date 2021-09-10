import React, { useEffect, useState } from 'react';
import axios from 'axios';
import callApi from "../../api/xutils";

const BASE ="http://localhost:3000/api";

function storeCurrentToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  };

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
            storeCurrentToken(data.token)
            setToken(data.token); //not getting set in state
            console.log("Here is token prior to setting:", token)
        
        }
        
    //This is necessary, but im getting back the entire users object.  I only need the logged in user:
    
       /* const user = await callApi({token: data.token, url: '/users'});
       console.log("From call API:", user)
 */
  
        if(username && data.recoveredData.username) {
           /*  alert('Logged in!') */
            /* setUser(`${data.recoveredData.username}`)
            console.log("Set the logged in users name:", username); */
        }

        
    //Consolelog below gives me the success message and token on the object:
        
        console.log("Here is the data:", data);
        console.log("My logged in user's data object:", data.recoveredData);
        console.log("My logged in user's info:", data.recoveredData.username )
        console.log("Do I have a user?:", user)
        console.log("Here is a token from data object:", data.token) //returns token as a string
        console.log("Here is a token:", token) //not getting saved in state

      
       
        
      } catch (error) {
          console.log(error);
      }
    };

//Doesn't fire -  no token saved in state, and also need to decide if want to change based on dependency
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