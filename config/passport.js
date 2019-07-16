const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/config');

module.exports = function (passport) {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: config.JWT_SECRET
    };

    console.log('**********************************');
    console.log(JSON.stringify(ExtractJwt.fromAuthHeaderWithScheme('jwt')));
    console.log('**********************************');

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            console.log(JSON.stringify(opts.jwtFromRequest));
            User.getUserById(jwt_payload.data._id, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );
};