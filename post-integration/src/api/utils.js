// Function middleware for Errors with no User:
    function requireUser(req, res, next) {
        if(!req.user) {
            next({
                name: "MissingUserError",
                message: "You must be logged in to perform this action"
            });
        }
        next();
    }

module.exports = {
    requireUser
}