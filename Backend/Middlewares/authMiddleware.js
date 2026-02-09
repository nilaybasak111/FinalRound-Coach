const jwt = require("jsonwebtoken");
const User = require("../Schema/UserSchema");

// Middleware To Protect Routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Bearer <token>
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // Extracting <token> from Bearer <token>
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password"); // Getting User Details Excluding Password
      next();
    } else {
      res.status(401).json({ message: "Unauthorized, No Token" });
    }
  } catch (error) {
    // console.log(error);
    res.status(401).json({ message: "Token Failed", error: error.message });
  }
};

module.exports = { protect };
