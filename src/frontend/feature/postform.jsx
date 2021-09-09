import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './postform.css'

const BASE ="http://localhost:3000/api";

const CreateAPost = (props) => {

    const {username} = props;
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState('');
    const [ tags, setTags ] = useState('');

    const createPostHandler = async (event) => {
        event.preventDefault();
        
        const response = await axios.post(`${BASE}/posts`,username, 
            {title, content, tags});
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