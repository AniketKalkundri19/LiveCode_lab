const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const MONGO_URI = "mongodb+srv://aniketkalkundri:Aniket%4022@livecodelabcluster.ptjlp.mongodb.net/LiveCode_Lab?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: String, // Stored in plaintext for now (not ideal for production)
});
const User = mongoose.model("User", UserSchema);

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ message: "✅ User Registered Successfully!", username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Error registering user" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Both username and password are required!" });
    }

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "✅ Login Successful!", username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Error logging in" });
  }
});

// Serve static files from project root (make sure index.html exists)
app.use(express.static(path.join(__dirname, "./")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
