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

// Middleware for Errors with no active user:
    function requireActiveUser(req, res, next) {
        if(!req.user.active || !req.user) {
            next({
                name: "UserNotActiveError",
                message: "The user is not Active"
            })
        }
    }

module.exports = {
    requireUser,
    requireActiveUser
}