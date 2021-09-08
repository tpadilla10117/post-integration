import React, { useState, useEffect } from 'react';

import { Posts, Button, Navbar, LoginHandle, Logout, CreateAPost } from "./utils";
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api";
/* https://murmuring-garden-99126.herokuapp.com/api/posts */


function App() {

  const [ postData, setPostData ] = useState([]);
  const [ token, setToken ] = useState('');
  const [ user, setUser ] = useState( {} );

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
      <LoginHandle token={token} setToken={setToken} user={user} setUser={setUser} />
      <Logout token={token} setToken={setToken} user={user} setUser={setUser}/>


      <Button postData={postData} setPostData={setPostData} postDataRetrieval={postDataRetrieval}/>

      <CreateAPost />
      
      <Posts postData={postData} postDataRetrieval={postDataRetrieval}/>

      
    </div>
  );
}

export default App;
