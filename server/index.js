import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Store login attempts
let loginLogs = [];

// Home Route
app.get("/", (req, res) => {
  res.send("JWT Server Running Successfully");
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    loginLogs.push({
      email,
      status: "valid"
    });

    return res.json({
      success: true,
      message: "Your email address is valid."
    });
  } else {
    loginLogs.push({
      email,
      status: "not valid"
    });

    return res.json({
      success: false,
      message: "Your email address is not valid."
    });
  }
});

// Admin API → Return all login logs
app.get("/logs", (req, res) => {
  res.json(loginLogs);
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
