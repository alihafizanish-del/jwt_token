import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Store login attempts
let loginLogs = [];

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    loginLogs.push({ email, status: "valid" });
    return res.json({
      success: true,
      message: "Your email address is valid."
    });
  } else {
    loginLogs.push({ email, status: "not valid" });
    return res.json({
      success: false,
      message: "Your email address is not valid."
    });
  }
});

// Admin API → return all login logs
app.get("/logs", (req, res) => {
  res.json(loginLogs);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
