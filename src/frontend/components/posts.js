import React, {useEffect} from "react";

function Posts (props) {

    const { postData, postDataRetrieval } = props;

    /* useEffect( () => {
        postDataRetrieval();
    }) */

    return (
        <div>

            {/* <p>YO</p> */}
            <ul>
                {postData.posts && postData.posts.map( items => (
                    <li >{items.title}</li>
                ))}
            </ul>

        </div>
    );
};

export default Posts;