// Import the OpenAI package
const { OpenAI } = require("openai");

// Function to list available models
async function listModels() {
  try {
    const response = await openai.listModels();
    console.log(response.data);
    // Uncomment if you want to log each model's ID
    // response.data.data.forEach((model) => {
    //     console.log(model.id);
    // });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

// Function to analyze a conversation using OpenAI's GPT-3.5 Turbo
async function analyzeConversation(conversationText) {
  try {
    const prompt = `
      As a dating coach, analyze the following conversation between the user and their match. Identify strengths, weaknesses, and provide suggestions for improvement.

      Conversation:
      ${conversationText}

      Analysis:
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    // Return the response content
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing conversation:", error);
  }
}

async function getChatSuggestion(prompt, conversationText) {
  try {
    // const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
    // });

    const oldPrompt = `
      As a dating coach, analyze the following conversation between the user and their match. Tell me what is the next possible intersting chat suggestion. give me a crisp intersting response.

      Conversation:
      ${conversationText}

      Analysis:
    `;

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: prompt }],
    // });

    // Return the response content
    // return response.choices[0].message.content;
    return prompt;
  } catch (error) {
    console.error("Error analyzing conversation:", error);
  }
}

module.exports = { getChatSuggestion };
