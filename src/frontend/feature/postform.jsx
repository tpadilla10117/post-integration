import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './postform.css'
import callApi from "../../api/xutils";

const BASE ="http://localhost:3000/api";


const CreateAPost = (props) => {

    const {username, currentUser, token} = props;
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState('');
    const [ tags, setTags ] = useState('');

    const config = {
        headers: { 'Authorization': `Bearer ${token}`}
    }

/* This handles the form submission to create a post: */
    const createPostHandler = async (event) => {
        event.preventDefault();

    //This makes a post request, but I need to do it in Axios:
       /* const user = await callApi({token: token, url: `/posts`, method: 'post', 
       
        body: {
            authorId: currentUser.id, 
            title: title, 
            content: content, 
            tags: tags
        }
    
        });
       const {callApiData} = user; */
        
        //This is likely where my error is occuring:
       /*  const response = await axios.post(`${BASE}/posts`, config, 
            
            {
                authorId: currentUser.id, 
                title: title, 
                content: content, 
                tags: tags
            }); */
            

        const response = await axios({
            method: 'post',
            url: `${BASE}/posts`,
            data: {
                authorId: currentUser.id, 
                title: title, 
                content: content, 
                tags: tags
            },
            headers: { 'Authorization': `Bearer ${token}`}
        })

        const {data} = response;

        console.log("We created a post:", data)
    }

    return (
        <div id="postform">

            <form onSubmit={createPostHandler}>
             {/*    <input type="text" placeholder="Full name (required if registering)" value={name} onChange={ event => setName(event.target.value) }/> */}

                <input type="text" placeholder="Add a title" value={title} onChange={(event) => setTitle(event.target.value) } />
                <input type="text" placeholder="Enter in some content" value={content} onChange={ (event) => setContent(event.target.value)}/>
                <input type="text" placeholder="Hashtag" value={tags} onChange={ (event) => setTags(event.target.value)}></input>

                <button type="submit">Submit Form</button>
                

            </form>


        </div>
    );
};

export default CreateAPost;