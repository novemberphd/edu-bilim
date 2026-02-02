import { API_URL } from "./config";

export const userApi = {
  // Вход пользователя
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error;
    }
  },

  // Регистрация пользователя
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      return await response.json();
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      throw error;
    }
  },

  // Получить данные пользователя
  async getUser(email) {
    try {
      const response = await fetch(`${API_URL}/api/users/${email}`);
      return await response.json();
    } catch (error) {
      console.error("Ошибка получения пользователя:", error);
      throw error;
    }
  },

  // Создать/обновить пользователя
  async saveUser(userData) {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка сохранения пользователя:", error);
      // Для совместимости - возвращаем мок данные
      return {
        success: true,
        user: { ...userData, points: userData.points || 0 },
      };
    }
  },

  // Добавить очки
  async addPoints(email, pointsToAdd) {
    try {
      const response = await fetch(`${API_URL}/api/points/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pointsToAdd }),
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка добавления очков:", error);
      return {
        success: false,
        error: "Сервер не доступен",
        // Локальное обновление для разработки
        newPoints: 0,
      };
    }
  },

  // Получить лидерборд
  async getLeaderboard() {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();

      // Сортируем по очкам по убыванию
      return Array.isArray(data)
        ? data.sort((a, b) => b.points - a.points)
        : [];
    } catch (error) {
      console.error("Ошибка получения рейтинга:", error);
      // Возвращаем мок данные при ошибке
      return [
        { email: "demo@edu.bilim", name: "Демо Пользователь", points: 150 },
        { email: "user1@test.com", name: "Иван Иванов", points: 280 },
        { email: "user2@test.com", name: "Мария Петрова", points: 320 },
        { email: "user3@test.com", name: "Алексей Смирнов", points: 195 },
      ];
    }
  },
};
