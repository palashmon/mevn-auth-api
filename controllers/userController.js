const bcrypt = require("bcryptjs");
const { body, validationResult, check } = require("express-validator");
const User = require("../models/UserModel");
const apiResponse = require("../helpers/apiResponse");
const getAsyncFn = require("../helpers/getAsyncFn");

/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
exports.register = async (req, res) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Display sanitized values/errors messages.
      return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
    }
    const {
      name, username, email, password, confirmPassword,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password do not match." });
    }

    // Check for the unique Username
    const user = await User.findOne({ username }).exec();
    if (user) {
      return apiResponse.validationError(res, "Username is already taken.");
    }

    // Check for the Unique Email
    const useremail = await User.findOne({ email }).exec();
    if (useremail) {
      return apiResponse.validationError(res, "Email is already registred. Did you forgot your password.");
    }

    // The data is valid and new we can register the user
    const newUser = new User({
      name, username, password, email,
    });

    // Hash the password
    const salt = await getAsyncFn.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    await newUser.save();
    return apiResponse.success(res, "Hurry! User is now registered.");
  } catch (err) {
    // throw error in json response with status 500.
    return apiResponse.error(res, err);
  }
};


/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
exports.login = async (req, res) => {
  try {
    // Check if user exists with given username first
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return apiResponse.error(res, "Username is not found.");
    }

    // If there is user we are now going to compare the password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      // User's password is correct and we need to send the JSON Token for that user
      const payload = {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      };

      const key = process.env.JWT_SECRET;
      const token = await getAsyncFn.sign(payload, key, { expiresIn: "7d" });
      const data = {
        token: `Bearer ${token}`,
        user,
      };
      return apiResponse.successWithData(res, "Hurry! You are now logged in.", data);
    }
    return apiResponse.error(res, "Incorrect password.");
  } catch (err) {
    return apiResponse.error(res, err);
  }
};


/**
 * @route GET api/users/profile
 * @desc Return the User's data
 * @access Private - only authenticated users have access
 */
exports.profile = (req, res) => apiResponse.json(res, { user: req.user });

// eslint-disable-next-line consistent-return
exports.validateRegister = [
  // Validate fields.
  body("name").isLength({ min: 1 }).trim().withMessage("Name field is required")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("username").isLength({ min: 1 }).trim().withMessage("Username field is required")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("email").normalizeEmail().isEmail().withMessage("That Email is not valid"),
  body("password", "Password Cannot be Blank!").notEmpty(),
  body("confirmPassword", "Confirmed Password cannot be blank!").notEmpty(),
];
