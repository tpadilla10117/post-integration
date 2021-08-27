import React from 'react';

function Button (props) {

    const {postDataRetrieval} = props;

    return (
        <div>
            <button onClick={postDataRetrieval}>Click Me</button>
        </div>
    );
};

export default Button;