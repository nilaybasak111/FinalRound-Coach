const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../Utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/*
@desc      Generate Interview Questions and Answers using Gemini
@route     POST /api/ai/generate-questions
@access    Private {Requires JWT Token}
@req.body  {
            "role": "Backend Developer",
            "experience": "0",
            "topicsToFocus": "Nodejs, JavaScript, Express, Multer",
            "numberOfQuestions": 5
            }
*/
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      // VERY IMPORTANT For Free Tier
      //   generationConfig: {
      //     maxOutputTokens: 400,
      //     temperature: 0.2,
      //     topP: 0.9,
      //   },
    });

    let rawText = response.text;

    // Clean It : Remove ```json and ``` From Beginning and End
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // Remove Starting ```json
      .replace(/```$/, "") // Remove Ending ```
      .trim(); // Remove Extra Spaces

    // Now Safe To Parse
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed To Generate Interview Questions",
      error: error.message,
    });
  }
};

/*
@desc      Generate Explains A Interview Question using Gemini
@route     POST /api/ai/generate-explanation
@access    Private {Requires JWT Token}
@req.body  {
            "question": "Difference Between State and Props?"
           }
*/
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      // VERY IMPORTANT For Free Tier
      //   generationConfig: {
      //     maxOutputTokens: 400,
      //     temperature: 0.2,
      //     topP: 0.9,
      //   },
    });

    let rawText = response.text;

    // Clean It : Remove ```json and ``` From Beginning and End
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // Remove Starting ```json
      .replace(/```$/, "") // Remove Ending ```
      .trim(); // Remove Extra Spaces

    // Now Safe To Parse
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed To Generate Concept Explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
