const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const app = express();
const PORT = 5000;
const WS_PORT = 5001;
const DATA_FILE = path.join(__dirname, "users.json");

app.use(cors());
app.use(express.json());

// Создаем файл если его нет
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify([
      { email: "demo@edu.bilim", name: "Демо Пользователь", points: 150 },
      { email: "user1@test.com", name: "Иван Иванов", points: 280 },
      { email: "user2@test.com", name: "Мария Петрова", points: 320 },
      { email: "user3@test.com", name: "Алексей Смирнов", points: 195 },
    ]),
  );
}

app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(users);
});

app.post("/points", (req, res) => {
  const { email, points } = req.body;
  let users = JSON.parse(fs.readFileSync(DATA_FILE));

  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex >= 0) {
    users[userIndex].points = points;
  } else {
    users.push({ email, name: email.split("@")[0], points });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  res.json({ success: true, email, points });
});

app.post("/points/add", (req, res) => {
  const { email, pointsToAdd } = req.body;
  let users = JSON.parse(fs.readFileSync(DATA_FILE));

  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex >= 0) {
    users[userIndex].points += pointsToAdd;
  } else {
    users.push({
      email,
      name: email.split("@")[0],
      points: pointsToAdd,
    });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  res.json({
    success: true,
    email,
    newPoints: users[userIndex]?.points || pointsToAdd,
  });
});

app.listen(PORT, () => {
  console.log(`📊 Server running on http://localhost:${PORT}`);
});

// WebSocket сервер
const wss = new WebSocket.Server({ port: WS_PORT });
console.log(`📡 WebSocket server running on ws://localhost:${WS_PORT}`);

const clients = new Set();

wss.on("connection", (ws) => {
  console.log("New WebSocket client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clients.delete(ws);
  });
});
