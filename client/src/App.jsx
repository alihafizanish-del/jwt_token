import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:5000/logs");
    const data = await res.json();
    setLogs(data);
    setShowLogs(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login Page</h2>

      {/* Top message */}
      {message && (
        <h3 style={{ color: message.includes("not") ? "red" : "green" }}>
          {message}
        </h3>
      )}

      <input
        type="email"
        placeholder="Enter your Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <button style={{ marginLeft: "10px" }} onClick={fetchLogs}>
        Admins
      </button>

      {showLogs && (
        <div style={{ marginTop: "20px" }}>
          <h3>Login Attempts</h3>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>
                {log.email} → {log.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

