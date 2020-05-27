const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Asynchronously generates a salt.
 *
 * @param {number} length
 * @returns The resulting salt
 */
exports.genSalt = async function (length) {
  const newSalt = await new Promise((resolve, reject) => {
    bcrypt.genSalt(length, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
  return newSalt;
};

/**
 * Sign the given payload into a JSON Web Token string payload
 *
 * @param {Object} payload - Payload to sign
 * @param {string} key - secretOrPrivateKey
 * @param {Object} options - Options for the signature
 * @returns The JSON Web Token string
 */
exports.sign = async function (payload, key, options) {
  const tokenString = await new Promise((resolve, reject) => {
    jwt.sign(payload, key, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
  return tokenString;
};
