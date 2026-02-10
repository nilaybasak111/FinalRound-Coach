const Question = require("../Schema/QuestionSchema");
const Session = require("../Schema/SessionSchema");

/*
@desc     Add Additional Questions To An Existing Session
@route    POST /api/questions/add
@access   Private {Requires JWT Token}
@req.body {
            "sessionId" : "698af29b96949f8539ebeff6",
            "questions" : [
                {
                    "question": "question add 1?",
                    "answer" : "answer add 1"
                },
                {
                    "question": "question add 2?",
                    "answer" : "answer add 2"
                }
            ]
        }
*/
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid Input Data" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session Not Found" });
    }

    // Create New Questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Update Session to Include New Questions IDs
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json(createdQuestions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/*
@desc     Pin or Unpin A Question
@route    POST /api/questions/:id/pin
@access   Private {Requires JWT Token}
@params   id (Question ID)
@req.body {}
*/
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question Not Found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/*
@desc     Update A Note for A Question
@route    POST /api/questions/:id/note
@access   Private {Requires JWT Token}
@params   id (Question ID)
@req.body {
            "note" : "Testing Note from Backend"
          }
*/
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question Not Found" });
    }

    // console.log("this is question ", question);
    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
