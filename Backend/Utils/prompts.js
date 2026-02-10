// const questionAnswerPrompt = (
//   role,
//   experience,
//   topicsToFocus,
//   numberOfQuestions
// ) => `
// You are an AI trained to generate technical interview questions and answers.

// Task:
// - Role: ${role}
// - Candidate Experience: ${experience} years
// - Focus Topics: ${topicsToFocus}
// - Write ${numberOfQuestions} interview questions.
// - For each question, generate a detailed but beginner-friendly answer.
// - If the answer needs a code example, add a small code block inside.
// - Keep formatting very clean.
// - Return a pure JSON array like:
//   [
//     {
//       "question": "Question here?",
//       "answer": "Answer here."
//     }
//   ]
// Important: Do NOT add any extra text. Only return valid JSON.
// `;

const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are an expert technical interviewer and educator.

Your task is to generate high-quality interview questions and beginner-friendly answers.

Context:
- Role: ${role}
- Experience Level: ${experience} years
- Focus Topics: ${topicsToFocus}

Instructions:

1. Generate exactly ${numberOfQuestions} technical interview questions.
2. For each question, write a clear, detailed, and beginner-friendly answer.
3. If a code example is required, include it inside the answer using triple backticks.
4. Keep answers concise, practical, and easy to understand.
5. Do NOT use markdown outside JSON.
6. Do NOT add explanations, notes, or comments.
7. Do NOT add headings or bullet points outside JSON.

Output Format:

Return ONLY a valid JSON array in this exact structure:

[
  {
    "question": "Your question here?",
    "answer": "Your answer here."
  }
]

Important Rules:
- Output must be valid JSON.
- Escape all special characters properly.
- No text before or after the JSON.
- No markdown outside the answer field.
`;

// const conceptExplainPrompt = (question) => `
//   You are an AI trained to generate explanations for a given interview question.

//   Task:

//   - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
//   - Question: "${question}"
//   - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
//   - If the explanation includes a code example, provide a small code block.
//   - Keep the formatting very clean and clear.
//   - Return the result as a valid JSON object in the following format:

//   {
//     "title": "Short title here?",
//     "explanation": "Explanation here."
//   }

//   Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
// `;

const conceptExplainPrompt = (question) => `
You are a senior software engineer and technical instructor.

Your task is to explain an interview concept clearly to a beginner developer.

Question:
"${question}"

Instructions:

1. Explain the concept in simple and easy language.
2. Assume the reader has basic programming knowledge.
3. Use practical examples when helpful.
4. If needed, include a short code example using triple backticks.
5. Keep the explanation structured and readable.
6. Do NOT use markdown outside JSON.
7. Do NOT add extra commentary.

After the explanation, generate a short, clear title that summarizes the concept.

Output Format:

Return ONLY a valid JSON object in this exact structure:

{
  "title": "Short clear title",
  "explanation": "Detailed explanation here"
}

Important Rules:
- Output must be valid JSON.
- Escape quotes and special characters.
- No text before or after the JSON.
- No markdown outside the explanation field.
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
