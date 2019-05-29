import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../config/passport';
import User from '../models/User';
import { validateRegisterInputs } from '../validators/register';
import { validateLoginInputs } from '../validators/login';

const router = express.Router();

// Register endpoint
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInputs(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
});

// Login endpoint
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInputs(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 63246324
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

export { router as users };
