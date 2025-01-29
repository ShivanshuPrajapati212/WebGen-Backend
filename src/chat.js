require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const SYSTEM_PROMPT = require("./prompts")
const cleanText = require("./parseResponse")

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT, generationConfig: {
  maxOutputTokens: 32000,  // Set max tokens
  temperature: 1,      // Adjust creativity
  topP: 0.8,             // Nucleus sampling
  responseMimeType: "application/json",
}});

const chat = async (prompt) => {

const result = await model.generateContentStream(prompt);
let response = ''

for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  response = response + chunkText
}

  response = JSON.parse(response)

  const cleanedResponse = cleanText(response.code)
  console.log("Done...")
  return cleanedResponse
}

module.exports = chat