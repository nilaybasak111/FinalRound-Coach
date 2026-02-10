const Session = require("../Schema/SessionSchema");
const Question = require("../Schema/QuestionSchema");

/*
@desc     Create A New Session and Linked Questions
@route    POST /api/sessions/create
@access   Private {Requires JWT Token}
@req.body {
            "role": "Backend Developer",
            "experience": 0,
            "description": "Preparing for Backend Developer roles",
            "topicsToFocus": "NodeJs, JavaScript, Express",
            "questions": [
                {
                    "question": "question1?",
                    "answer": "answer1"
                },
                {
                    "question": "question2?",
                    "answer": "answer2"
                }
            ]
        }
*/

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id; // Assuming You have A Middleware Setting req.user

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        // Create Question and Link It to the Session
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs; // Adding Questions to the Session
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/*
@desc     Get All Sessions for the Logged-In User
@route    GET /api/sessions/my-sessions
@access   Private {Requires JWT Token}
@req.body {}
*/
exports.getMySessions = async (req, res) => {
  try {
    // Get All Sessions for the Logged-In User with Populated Questions
    const sessions = await Session.find({ user: req.user.id })
      .sort({
        createdAt: -1,
      })
      .populate("questions");

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/*
@desc     Get A Session by ID with Populated Questions
@route    GET /api/sessions/:id
@access   Private {Requires JWT Token}
@params   id
@req.body {}
*/
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session Not Found" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/*
@desc     Delete A Session and Its Linked Questions
@route    DELETE /api/sessions/:id
@access   Private {Requires JWT Token}
@params   id
@req.body {}
*/
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session Not Found" });
    }

    // Check If The Logged-In User is the Owner of the Session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized To Delete This Session" });
    }

    // First Delete All Questions Linked to this Session
    await Question.deleteMany({ session: session._id });

    // Then Delete The Session
    await session.deleteOne();

    res.status(200).json({ message: "Session Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
