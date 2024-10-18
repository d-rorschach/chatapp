const express = require("express");
const {
  getChatSuggestionController,
  getChatAnalysisController,
  getAiTipController,
} = require("../controllers/aiControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/get/chat/suggestion").post(protect, getChatSuggestionController);
router.route("/get/chat/analyze").post(protect, getChatAnalysisController);
router.route("/get/chat/tip").post(protect, getAiTipController);

module.exports = router;
