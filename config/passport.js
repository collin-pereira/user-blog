const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models').User

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (email, password, done) {
        try {
            const user = await User.findByCredentials(email, password)
            user ? done(null, user) : done(null, false, { message: "Invalid Credentials" })
        } catch (error) {
            done(error)
        }
    }
))

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findByPk(jwt_payload.id)
    .then(user=>{
        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
    .catch(err=>{
        return done(err,false)
    })
}));