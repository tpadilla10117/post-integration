import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './postform.css'

const CreateAPost = () => {

    return (
        <div id="postform">

            <form>
             {/*    <input type="text" placeholder="Full name (required if registering)" value={name} onChange={ event => setName(event.target.value) }/> */}

                <input type="text" placeholder="Add a title"/>
                <input type="text" placeholder="Enter in some content"/>
                <input type="text" placeholder="Hashtag"></input>

                <button type="submit">Submit Form</button>
                

            </form>


        </div>
    );
};

export default CreateAPost;