import React, {useEffect} from "react";

function Logout (props) {


    const { user, setUser, token, setToken, username, setUsername, setCurrentUser } = props;

/* Function that removes token from localStorage when user log's out: */
    function clearCurrentUser() {
        localStorage.removeItem('token');
        console.log("Cleared user object out", user);
        console.log("User has loggedout", username)
        
    };

/* onClick handler to log a user out of the app: */
    const handleLogout = () => {
      clearCurrentUser();
      setUser({});
      setUsername("");
      setCurrentUser('');
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