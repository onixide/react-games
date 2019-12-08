const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('config');

module.exports = function (passport) {

	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

	if (!config.get('jwt.secret')) {
		throw new Error('jwt secret is not defined.');
	}

	opts.secretOrKey = config.get('jwt.secret');

	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({ _id: jwt_payload.data._id }, (err, user) => {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));
}