const passport = require("passport");
const apiResponse = require("../helpers/apiResponse");

/**
 * Check if the user is authenticated
 */
exports.isLoggedIn = passport.authenticate("jwt", { session: false });

/**
 * Remove the req.user property and clear the login session (if any).
 * Docs: http://www.passportjs.org/docs/logout/
 */
exports.logout = (req, res) => {
  req.logout();
  return apiResponse.success(res, "You are now logged out! 👋");
};
