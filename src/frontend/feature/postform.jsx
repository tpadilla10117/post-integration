import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './postform.css'

const BASE ="http://localhost:3000/api";

const CreateAPost = (props) => {

    const {username, currentUser} = props;
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState('');
    const [ tags, setTags ] = useState('');

/* This handles the form submission to create a post: */
    const createPostHandler = async (event) => {
        event.preventDefault();
        
        //This is likely where my error is occuring:
        const response = await axios.post(`/posts`, 
            {authorId: currentUser.id, title: title, content: content, tags: tags});

        //Im actually getting back the values I expect
            /* console.log(content) */

            /* const newPost = await createPost({
                authorId: 1,
                title: "This is a new post",
                content: "Just made a new post!",
                tags: ["#sweet"],

            }); */

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