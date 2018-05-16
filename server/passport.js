import bcrypt from 'bcrypt-nodejs';
var LocalStrategy = require('passport-local').Strategy;

import db from './config/database';

const initializePassport = (passport) => {
  
    passport.serializeUser((user, cb) => {
        cb(null, user[0].user_id)
    })
  
    passport.deserializeUser((id, cb) => {
        db('users').where('user_id', id).then(user => {
            cb(null, user)
        }).catch(err => {
            cb(err);
        });
    })

    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    }, (email, password, cb) => {
        return db('users').where('email', email).then(user => {
            if (!user) {
                return cb(null, false, { message: 'Invalid email and password combination' })
            }
        
            bcrypt.compare(password, user[0].password, (err, res) => {
                if (err) {
                return cb(err)
                }
                if (!res) {
                return cb(null, false, { message: 'Invalid email and password combination' })
                }
        
                return cb(null, user, { message: 'Login Successful' })
            })
        
        }).catch(cb);
    }));
}

export default { initializePassport };