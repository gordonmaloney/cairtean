const express = require("express");
const router = express.Router();
const {
  getCards,
  createCard,
  updateCard,
  createCardsBulk
} = require("../controllers/cardsController");
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getCards)
router.post("/", protect, createCard);
router.post("/bulk", protect, createCardsBulk);
router.put("/", protect, updateCard);

module.exports = router;
