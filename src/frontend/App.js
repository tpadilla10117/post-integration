import React, { useState, useEffect } from 'react';

import { Posts, Button, Navbar, LoginHandle, Logout, CreateAPost } from "./utils";
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api";
/* https://murmuring-garden-99126.herokuapp.com/api/posts */

function getCurrentToken() {
  const token = JSON.parse(localStorage.getItem('token'));
  return token;
};


function App() {

  const [ postData, setPostData ] = useState([]); //Data fetched for posts
  const [ token, setToken ] = useState(getCurrentToken()); //A user's jwt Token
  const [ user, setUser ] = useState( {} ); //Entire user object
  const [username, setUsername] = useState(''); //A Specific user

//This function grabs all posts from the API and sets on state:
  async function postDataRetrieval () {
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      const {data} = response;
      console.log("Here is my returned data:", data);
      setPostData(data);
      /* return data; */
      

    } catch (error) {

      console.error(error);
    }

  };

  //A Fetch method:

/*   async function postDataRetrieval() {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    console.log("Here is my data:", data);
    setPostData(data);
  } */



  useEffect( () => {
    /* postDataRetrieval(); */
    console.log("Fireing from App:", postData )
    console.log("type of data:", typeof postData);

  }, [postData])


  return (
    <div className="App">
      
     {/*  <Navbar /> */}
      <LoginHandle token={token} setToken={setToken} user={user} setUser={setUser} username={username} setUsername={setUsername}/>
      <Logout token={token} setToken={setToken} user={user} setUser={setUser} username={username} setUsername={setUsername}/>


      <Button postData={postData} setPostData={setPostData} postDataRetrieval={postDataRetrieval}/>

      <CreateAPost postData={postData} postDataRetrieval={postDataRetrieval} username={username}/>
      
      <Posts postData={postData} postDataRetrieval={postDataRetrieval}/>

      
    </div>
  );
}

export default App;
