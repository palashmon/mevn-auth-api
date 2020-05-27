const passport = require("passport");

/**
 * Check if the user is authenticated
 */
exports.isLoggedIn = passport.authenticate("jwt", { session: false });
