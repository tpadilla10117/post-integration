import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './postform.css'
/* import callApi from "../../api/xutils"; */

const BASE ="http://localhost:3000/api";


const PostForm = (props) => {

    const {username, currentUser, token} = props;
    const [ title, setTitle ] = useState("");
    const [ updateTitle, setUpdateTitle ] = useState("");
    const [ content, setContent ] = useState('');
    const [ updateContent, setUpdateContent] = useState('');
    const [ tags, setTags ] = useState('');
    const [ updateTags, setUpdateTags] = useState('');

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
    };


/* This is to update posts: */
    const updatePostHandler = async(event) => {
        event.preventDefault();

        const response = await axios ({
            method: 'patch',
            url: `${BASE}/posts/3`,
            data: {
                authorId: currentUser.id,
                title: updateTitle,
                content: updateContent,
                tags: updateTags
            },
            headers: { 'Authorization': `Bearer ${token}`}

        });

        const {data} = response;

        console.log("We updated a post!:", data)

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

            <form onSubmit={updatePostHandler} className="update_form">
                <input type="text" placeholder="Update your title" value={updateTitle} onChange={(event) => setUpdateTitle(event.target.value)} />
                <input type ="text" placeholder="Enter updated content" value={updateContent} onChange={(event) => setUpdateContent(event.target.value)} />
                <input type="text" placeholder="Update your tags" value={updateTags} onChange={(event) => setUpdateTags(event.target.value)}/>

                <button type="submit">UPDATE</button>


            </form>


        </div>
    );
};

export default PostForm;