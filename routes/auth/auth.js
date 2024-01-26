const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../../models/User");

/**
 * Validation of user inputs
 */
const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(255).required(),
  lastName: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

/**
 * get all registered users
 */
router.get("/all-registered", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

/**
 * Signup user
 *
 * Checks, if user already exists
 * Hashes the password
 * Validates user input and eventually saves new user
 */
router.post("/register", async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send(`email already exists`);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const { error } = await registerSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const saveUser = await user.save();
      res.status(200).send(`user created, ${saveUser}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Login user
 *
 * Checks, if user email already exists
 * Checks, if user password matches the database
 * Validates user input and sends back jwt token
 */
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("incorrect email");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("incorrect password");

  try {
    const { error } = await loginSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const accessToken = jwt.sign(
        { _id: user._id, email: req.body.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 60 * 60,
        }
      );
      res.header("auth-token", accessToken).send(accessToken);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//* return all registered users */
router.get("/all-registered", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = router;
