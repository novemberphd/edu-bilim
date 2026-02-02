// src/api/index.js
import { API_URL } from "./config";

// Mock данные для разработки
const mockCourses = [
  {
    id: 1,
    title: "📚 Математика",
    description: "Основы алгебры и геометрии для начинающих",
    instructor: "Профессор Иванов",
    duration: "12 недель",
    level: "Начальный",
  },
  {
    id: 2,
    title: "🔬 Физика",
    description: "Законы Ньютона, термодинамика и оптика",
    instructor: "Доктор Петрова",
    duration: "16 недель",
    level: "Средний",
  },
  {
    id: 3,
    title: "💻 Программирование",
    description: "JavaScript, React и современный фронтенд",
    instructor: "Senior Developer Сидоров",
    duration: "20 недель",
    level: "Начальный",
  },
  {
    id: 4,
    title: "🎨 Дизайн",
    description: "UI/UX дизайн для веб-приложений",
    instructor: "Дизайнер Кузнецова",
    duration: "10 недель",
    level: "Начальный",
  },
  {
    id: 5,
    title: "🌐 Веб-разработка",
    description: "Полный стек: фронтенд + бэкенд",
    instructor: "Fullstack Developer Алексеев",
    duration: "24 недели",
    level: "Продвинутый",
  },
];

export const api = {
  getCourses: async () => {
    try {
      // Сначала пробуем получить реальные данные
      console.log("Пытаемся подключиться к:", API_URL);
      const response = await fetch(`${API_URL}/api/test`, {
        signal: AbortSignal.timeout(3000), // Таймаут 3 секунды
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Данные с сервера:", data);
      return data.courses || mockCourses;
    } catch (error) {
      console.warn(
        "⚠️ Сервер не отвечает, используем mock данные. Ошибка:",
        error.message,
      );
      // Возвращаем mock данные для разработки
      return mockCourses;
    }
  },

  testConnection: async () => {
    try {
      const response = await fetch(`${API_URL}/api/test`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn("Сервер не отвечает:", error.message);
      // Возвращаем mock ответ
      return {
        message:
          "⚠️ Бэкенд не запущен. Используются локальные данные для разработки.",
        timestamp: new Date().toISOString(),
        note: "Для подключения к реальному бэкенду запустите сервер на localhost:5000",
        courses: mockCourses,
      };
    }
  },
};
