const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Handles JSON requests
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const MONGO_URI = "mongodb+srv://aniketkalkundri:Aniket%4022@livecodelabcluster.ptjlp.mongodb.net/LiveCode_Lab?retryWrites=true&w=majority";
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

// Default Route (for Render)
app.get('/', (req, res) => {
  res.send('LiveCode Lab API is running 🚀');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('LiveCode Lab API is running 🚀');
});

