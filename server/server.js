const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "users.json");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://edu-bilim.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// Создаем файл если его нет
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(
      [
        { email: "demo@edu.bilim", name: "Демо Пользователь", points: 150 },
        { email: "user1@test.com", name: "Иван Иванов", points: 280 },
        { email: "user2@test.com", name: "Мария Петрова", points: 320 },
        { email: "user3@test.com", name: "Алексей Смирнов", points: 195 },
      ],
      null,
      2,
    ),
  );
}

// Получить всех пользователей
app.get("/api/users", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Ошибка чтения файла" });
  }
});

// Создать/обновить пользователя
app.post("/api/users", (req, res) => {
  try {
    const { email, name, points } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email обязателен" });
    }

    let users = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex >= 0) {
      // Обновляем существующего пользователя
      users[userIndex].name = name || users[userIndex].name;
      users[userIndex].points = points || users[userIndex].points;
    } else {
      // Создаем нового пользователя
      users.push({
        email,
        name: name || email.split("@")[0],
        points: points || 0,
      });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true, user: users.find((u) => u.email === email) });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сохранения" });
  }
});

// Добавить очки пользователю
app.post("/api/users/add-points", (req, res) => {
  try {
    const { email, pointsToAdd } = req.body;
    if (!email || !pointsToAdd) {
      return res.status(400).json({ error: "Email и pointsToAdd обязательны" });
    }

    let users = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex >= 0) {
      users[userIndex].points += parseInt(pointsToAdd);
    } else {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    res.json({
      success: true,
      email,
      newPoints: users[userIndex].points,
      pointsAdded: parseInt(pointsToAdd),
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка добавления очков" });
  }
});

// Получить топ пользователей
app.get("/api/leaderboard", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const sorted = users.sort((a, b) => b.points - a.points);
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: "Ошибка чтения файла" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`🌐 API доступен на http://localhost:${PORT}/api`);
});
