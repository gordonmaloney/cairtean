const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc register new user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email,
      token: generateToken(user._id),
      last: user.last,
      streak: user.streak,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//@desc authenticate user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check user email
  const user = await User.findOne({ email });

  //check user pw
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email,
      token: generateToken(user._id),
      last: user.last,
      streak: user.streak,
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

//@desc get user data
//@route GET /api/users/me
//@access private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc update user streak
//@route PUT /api/users/streak
//@access private
const updateStreak = async (req, res) => {
  const user = await User.findOne({email: req.body.email} );
  const { last, streak } = req.body;


  try {
    user.streak = streak;
    user.last = last;
  } catch (error) {
    throw new Error("data error");
  }

  user.save();

  res.status(201).json({
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    token: generateToken(user._id),
    last: req.user.last,
    streak: req.user.streak,
  });};

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateStreak,
};
