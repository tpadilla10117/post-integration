import React, { useState, useEffect } from 'react';

import { Posts, Button } from "./utils";
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api";
/* https://murmuring-garden-99126.herokuapp.com/api/posts */


function App() {

  const [ postData, setPostData ] = useState([]);

//This function grabs all posts from the API and sets on state:
  /* async function postDataRetrieval () {
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      const data = response;
      console.log("Here is my returned data:", data);
      return data;
      

    } catch (error) {

      console.error(error);
    }

  }; */

  async function postDataRetrieval() {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    console.log("Here is my data:", data);
    setPostData(data);
  }
/* postDataRetrieval(); */


  useEffect( () => {
    /* postDataRetrieval(); */
    console.log("Fireing from App:", postData )
    console.log("type of data:", typeof postData);

  }, [postData])


  return (
    <div className="App">
      <h1>Hello World</h1>

      <Button postData={postData} setPostData={setPostData} postDataRetrieval={postDataRetrieval}/>
      <Posts postData={postData} postDataRetrieval={postDataRetrieval}/>

      
    </div>
  );
}

export default App;
