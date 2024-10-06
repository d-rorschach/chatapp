const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const { getChatSuggestion } = require("../services/gptCalls");

//@description     Get ai chat suggestion based on last chat
//@route           POST /api/ai/get/chat/suggestion/
//@access          Protected
const getChatSuggestionController = asyncHandler(async (req, res) => {
  try {
    const { chatId, prompt } = req.body;
    console.log("chat id : ", chatId);
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    const lastMessage = messages[messages.length - 1]?.content;
    console.log("clling gpt for this input: ", lastMessage);

    const aiChatSuggestionResponse = await getChatSuggestion(
      prompt,
      lastMessage
    );
    console.log("ai chat suggestion response: ", aiChatSuggestionResponse);
    res.json(aiChatSuggestionResponse);
  } catch (error) {
    console.log("error in getChatSuggestion: ", error.message);
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getChatSuggestionController,
};
