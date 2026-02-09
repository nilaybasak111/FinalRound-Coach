const dotenv = require("dotenv");
dotenv.config({ path: "../.env" }); // Adding Path for .env
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

// Cors Configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Configuration of json Data for the API
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DataBase Connection
const ConnectDB = require("./Database/ConnectDB");
ConnectDB();

const authRoutes = require("./Routes/authRoutes");

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/sessions", sessionRoutes);
// app.use("/api/questions", questionRoutes);

// app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
// app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Server Uploads Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

app.listen(PORT, () => {
  console.log(`Server is Running in the Port ${PORT}`);
});
