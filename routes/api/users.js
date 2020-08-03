const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');
// validator is to send a clean response
// checks to see if we sent the name

const User = require('../../models/User');

// -----------------------------------------------------------------
//@route   GET api/users  <---the route endpoint
//@desc    Test route     <---what is this?
//@access  Public         <--is this a protected route?
// -----------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const user = await user.findById(req.user.id).select('-password');
    res.json(user);
    console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error!');
  }
});

// -----------------------------------------------------------------
//@route   POST api/users  <---the route endpoint
//@desc    Test route     <---what is this?
//@access  Public         <--is this a protected route?
// -----------------------------------------------------------------

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      //1. See if the user exists'

      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists man' });
      }

      //2. Get the user's gravatar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      //3. Creates a new instance of a user

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //4. Encrypt the password using bcrypt

      const salt = await bcrypt.genSalt(10);
      // generates a salt (ecrypted password)
      user.password = await bcrypt.hash(password, salt);
      // sets the empty user's pass to an encrypted hash
      await user.save();

      //5. Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      console.log(user);

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
