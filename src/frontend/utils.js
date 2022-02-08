/* This components handles exports in the main App: */

    export { default as Header } from './components/layout/header/Header.jsx';

    export { default as Posts } from './components/posts.js';

    export { default as Button } from './components/button.js';

    export { default as Navbar } from './components/navbar.js';

    export { default as Login } from './components/layout/login/Login.jsx';

    export { default as Logout } from './components/layout/logout/Logout.jsx';

    export { default as Postform } from './components/layout/postform/Postform.jsx';

/* -------------------------------------------------------------------------- */
    /* "pages" components: */

    export { default as Landing } from '../frontend/components/pages/landing/Landing.jsx';


/* -------------------------------------------------------------------------- */
/* Functions: */

    /* Scroll to top of the page after a user clicks a link: */
    export const scrollTop = () => {
        window.scrollTo({ behavior: "smooth", top: "0px"});
    };
