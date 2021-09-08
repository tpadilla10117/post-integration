import React from "react";

function Posts (props) {

    const { postData/* , postDataRetrieval */ } = props;

    /* useEffect( () => {
        postDataRetrieval();
    }) */

    return (
        <div>

            
           {/*  <ul>
                {postData.posts && postData.posts.map( items => (
                    <li key={items.id} >{items.content}</li>
                ))}
            </ul> */}

            {postData.posts && postData.posts.map( items => (
                    <div key={items.id} >
                        <h1>{items.title}</h1>
                        <h3>{items.author.username}</h3>
                        <p>{items.content}</p>
                    </div>
                ))}
            

        </div>
    );
};

export default Posts;