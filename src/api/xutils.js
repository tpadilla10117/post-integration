import axios from 'axios';
const BASE ="http://localhost:3000/api";

/* This function abstracts away api calls */
    /* the properties(method, body, etc) are what we use when calling our api*/
    const callApi = async ({method, body, url, token}) => {
        try {
            const options = {
                method: method || 'get',
                data: body,
                url: `${BASE}${url}`
            }
            /* if we have a token, pass another property to the options object */
            if(token) {
                options.headers = {
                    'Authorization': `Bearer ${token}`
                }
            }
            const {data} = await axios(options)
            return data;
        } catch(error) {
            console.error(error)
        }
    }

    export default callApi;