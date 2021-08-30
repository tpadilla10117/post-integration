/* Test function for running Unit tests in Jest: */

const sayHelloTo = ( { username }) => {
    return 'Hello ' + username;
};

module.exports = {
    sayHelloTo,
}