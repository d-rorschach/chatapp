const express = require("express");
const { getChatSuggestionController } = require("../controllers/aiControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/get/chat/suggestion").post(protect, getChatSuggestionController);

module.exports = router;
