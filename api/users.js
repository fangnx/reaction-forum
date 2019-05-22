import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validateRegisterInputs } from '../validators/register';

const router = express.Router();
// register endpoint
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInputs(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newUser = new User({
    name: req.body.name,
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

export { router as users };
