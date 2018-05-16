import bcrypt from 'bcrypt-nodejs';
import db from './../../config/database';
import passport from 'passport';
import moment from 'moment';

const validateUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send('success');
  } else {
    res.status(401).send('Unauthorized');
  }
}

const login = (req, res, next) => {
  
  passport.authenticate('local', null, function(err, user, info){
      if(err || !user){
        return res.status(401).send(info);
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(401).send('Unauthorized');
        }
        
        if (req.body.remember) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
          req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.status(200).send(info);
      });
  })(req, res, next);
}


const register = (req, res, next) => {
  const params = req.body.data;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
      res.end();
    } else {
      bcrypt.hash(params.password, salt, null, (err, password) => {
        const now = moment().valueOf();
        db.insert({
          email: params.email,
          password: password,
          first_name: params.firstName,
          last_name: params.lastName,
          created_at: now,
          updated_at: now
        })
        .returning('user_id')
        .into('users')  
        .then(function() {
          res.status(200).json('success');
        }).caught(function(err) {
            next(err);
        });
      })
    }

  })
}


const logout = (req, res) => {
  req.logout();
  res.status(200).send('success');
}

export default { 
    login, 
    register,
    logout,
    validateUser
};