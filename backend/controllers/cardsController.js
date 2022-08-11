const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { db } = require("../models/userModel");


//@desc get user cards
//@route GET /api/cards
//@access private
const getCards = asyncHandler(async (req, res) => {

  res.status(200).json(req.user.cards);
});

//@desc create new card
//@route POST /api/card
//@access private
const createCard = asyncHandler(async (req, res) => {

  console.log(req.body)
  
  if (!req.body.front || !req.body.back) {
    res.status(400);
    throw new Error("Cards must have both a front and back field");
  }

  //create card from req.body
  const card = req.body;

  //push card to user's cards array
  req.user.cards.push(card);

  //find and update user
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.user, {
    new: true,
  });

  res.status(200).json(updatedUser.cards);
});

//@desc bulk add cards
//@route post/api/card/bulk
//@access private
const createCardsBulk = asyncHandler(async (req, res) => {
  if (!req.body.cards.length > 0) {
    res.status(400);
    throw new Error("Bulk adding cards requires an array");
  }

  const cards = JSON.parse(req.body.cards);

  const combinedCards = [...req.user.cards, ...cards];

  req.user.cards = combinedCards;

  req.user.save();

  res.status(200).json(req.user);
});

//@desc update card
//@route PUT /api/card
//@access private
const updateCard = asyncHandler(async (req, res) => {
 

  console.log(req.body)

  if (!req.body.date) {
    res.status(400);
    throw new Error("Must have new date to update card");
  }

  const user = req.user;


  //find card in users card array
  const existingCard = req.user.cards.find(
    (card) => card._id.toString() == req.body._id.toString()
  );


  //update card fields
  existingCard.date = req.body.date;
  existingCard.delay = req.body.delay;
  existingCard.reviews = req.body.reviews;
  existingCard.front = req.body.front;
  existingCard.back = req.body.back;
  existingCard.tag = req.body.tag

  user.save();

  res.status(200).json(user.cards);
});

module.exports = {
  getCards,
  createCard,
  updateCard,
  createCardsBulk,
};
