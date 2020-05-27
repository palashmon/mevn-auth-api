const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/UserModel");
const key = process.env.JWT_SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = (passport) => {
  const jwtStrategy = new Strategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload._id).then((user) => {
      if (user) return done(null, user);
      return done(null, false);
    }).catch((err) => console.log(err));
  });
  passport.use(jwtStrategy);
};
