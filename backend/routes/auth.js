const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// ROUTE:1 create a user using : POST "/api/auth/createuser does not require auth"

router.post('/createuser', [
  body('name', 'enter a valid name').isLength({ min: 2 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password must be atleast 8 characters').isLength({ min: 8 }),
],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //  check the user with this email id exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: " you are already exists please login " })
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      })

      const data = {
        user: { id: user.id }
      }
      const token = jwt.sign(data, 'shhhhh');

      res.json({ token })
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("internal server error");
    }
  })

// ROUTE:2  login the existing user with POST "/api/auth/login"

router.post("/login",
  [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password is required').isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { password, email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "please login with correct credentials" })
      }
      const passcompare = await bcrypt.compare(password, user.password)
      if (!passcompare) {
        success = false;
        return res.status(400).json({ error: "you enter the wrong password" })
      }
      const data = {
        user: { id: user.id }
      }
      const token = jwt.sign(data, 'shhhhh');
      success = true;
      res.json({ success, token })
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error");
    }
  });

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser,
  async (req, res) => {
    try {
       userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router;