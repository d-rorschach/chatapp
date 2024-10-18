const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const {
  getChatSuggestion,
  analyzeConversation,
  getAiTip,
} = require("../services/gptCalls");

//@description     Get ai chat suggestion based on last chat
//@route           POST /api/ai/get/chat/suggestion/
//@access          Protected
const getChatSuggestionController = asyncHandler(async (req, res) => {
  try {
    const { chatId, prompt, userId } = req.body;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    const lastMessage =
      messages[messages.length - 1]?.sender._id == userId
        ? "Me: " + messages[messages.length - 1]?.content
        : "Match: " + messages[messages.length - 1]?.content;
    console.log("calling gpt for this input: ", lastMessage);

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

//@description     Get ai chat analysis based on last 5 chats
//@route           POST /api/ai/get/chat/analyze/
//@access          Protected
const getChatAnalysisController = asyncHandler(async (req, res) => {
  try {
    const { chatId, prompt, userId } = req.body;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    const last5Message = [];

    for (let i = 0; i < messages.length && i < 5; i++) {
      if (messages[messages.length - 1 - i]?.sender._id == userId) {
        last5Message.push("Me: " + messages[messages.length - 1 - i]?.content);
      } else {
        last5Message.push(
          "Match: " + messages[messages.length - 1 - i]?.content
        );
      }
    }
    last5Message.reverse();
    console.log("calling gpt for this input: ", last5Message);

    const aiChatSuggestionResponse = await analyzeConversation(
      prompt,
      last5Message
    );
    console.log("ai chat suggestion response: ", aiChatSuggestionResponse);
    res.json(aiChatSuggestionResponse);
  } catch (error) {
    console.log("error in getChatSuggestion: ", error.message);
    res.status(500);
    throw new Error(error.message);
  }
});

//@description     Get AI chat tip based on situation
//@route           POST /api/ai/get/chat/tip/
//@access          Protected
const getAiTipController = asyncHandler(async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("calling gpt for this input: ", prompt);

    const aiTipResponse = await getAiTip(prompt);
    console.log("ai chat suggestion response: ", aiTipResponse);
    res.json(aiTipResponse);
  } catch (error) {
    console.log("error in getChatSuggestion: ", error.message);
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getChatSuggestionController,
  getChatAnalysisController,
  getAiTipController,
};
