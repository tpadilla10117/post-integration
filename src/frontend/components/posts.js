import React, {useEffect} from "react";

function Posts (props) {

    const { postData, postDataRetrieval } = props;

    /* useEffect( () => {
        postDataRetrieval();
    }) */

    return (
        <div>

            {/* <p>YO</p> */}
            {/* <ul>
                {postData && postData.map( items => (
                    <li>{items}</li>
                ))}
            </ul> */}

        </div>
    );
};

export default Posts;