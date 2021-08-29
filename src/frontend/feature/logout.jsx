import React, {useEffect} from "react";

function Logout (props) {


    const { user, setUser, token, setToken } = props;

/* Function that removes token from localStorage when user log's out: */
    function clearCurrentUser() {
        localStorage.removeItem('token');
        console.log("User has logged out", user);
        
    };

/* onClick handler to log a user out of the app: */
    const handleLogout = () => {
      clearCurrentUser();
      setUser({});
      setToken('');

    }
  
    useEffect(() => {
      if(!token) {
          const theToken = localStorage.getItem('token');
          setToken(theToken);

      }
    }, []);

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;