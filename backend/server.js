const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // Built-in middleware for URL-encoded data

// Connect to MongoDB Atlas
const MONGO_URI = "your_mongo_uri_here";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

// Register (Signup) Route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists!" });

    // Save new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ message: "✅ User Registered Successfully!", username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Error saving user" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate user
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "✅ Login Successful!", username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Error logging in" });
  }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../")));

// Route to serve the main index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
