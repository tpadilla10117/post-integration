import React, { useState, useEffect } from 'react';

import { Posts } from "./utils";
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api";


function App() {

  const [ postData, setPostData ] = useState([]);

//This function grabs all posts from the API and sets on state:
  async function postDataRetrieval () {
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      const data = response;
      console.log("Here is my returned data:", data);
      return data;
      

    } catch (error) {

      console.error(error);
    }

  };
postDataRetrieval();


  return (
    <div className="App">
      <h1>Hello World</h1>

      <Posts postData={postData}/>

      
    </div>
  );
}

export default App;
