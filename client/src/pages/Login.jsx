import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { userApi } from "../api/users";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Если нет бэкенд авторизации, используем мок
      if (!email.includes("@")) {
        throw new Error("Введите корректный email");
      }

      // Попытка реальной авторизации
      let userData;

      try {
        // Если на бэкенде есть эндпоинт /api/auth/login
        const authResult = await userApi.login(email, password);

        if (authResult.token) {
          localStorage.setItem("token", authResult.token);
          userData = authResult.user;
        } else {
          // Если нет токена, создаем/получаем пользователя
          userData = {
            email,
            name: email.split("@")[0],
            points: 0,
          };

          const saveResult = await userApi.saveUser(userData);
          if (saveResult.user) {
            userData = saveResult.user;
          }
        }
      } catch (authError) {
        console.log("Используем локальную авторизацию:", authError.message);

        // Локальная авторизация (для разработки)
        userData = {
          email,
          name: email.split("@")[0] || "Пользователь",
          points: 100 + Math.floor(Math.random() * 400), // Случайные очки 100-500
        };

        // Сохраняем на сервере
        const saveResult = await userApi.saveUser(userData);
        if (saveResult.user) {
          userData = saveResult.user;
        }
      }

      // Сохраняем пользователя в контекст
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Перенаправляем на профиль
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка входа:", err);
      setError(err.message || "Ошибка входа. Проверьте данные.");
    } finally {
      setLoading(false);
    }
  };

  // Проверка доступности бэкенда
  const checkBackend = async () => {
    try {
      const response = await fetch(`${API_URL}/api/test`);
      const data = await response.json();
      console.log("Бэкенд доступен:", data);
      return true;
    } catch (error) {
      console.log("Бэкенд не доступен, используем локальные данные");
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-spotify-base flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-spotify-green/20 to-purple-900/20 mb-6">
            <span className="text-4xl">🎧</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            С возвращением!
          </h1>
          <p className="text-spotify-secondary">
            Войдите, чтобы продолжить обучение
          </p>
        </div>

        <div className="modal-spotify p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-spotify-secondary mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-spotify"
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-spotify-secondary mb-2 font-medium">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-spotify"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn-spotify btn-spotify-primary w-full"
              disabled={loading}
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-spotify-highlight">
            <p className="text-center text-spotify-secondary">
              Нет аккаунта?{" "}
              <Link
                to="/signup"
                className="text-spotify-green font-semibold hover:underline"
              >
                Зарегистрироваться
              </Link>
            </p>
          </div>

          {/* Быстрый вход для теста */}
          <div className="mt-8">
            <p className="text-center text-spotify-secondary mb-4">
              Быстрый вход (тестовые аккаунты):
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  email: "student1@edu.bilim",
                  password: "test123",
                  name: "Студент 1",
                },
                {
                  email: "student2@edu.bilim",
                  password: "test123",
                  name: "Студент 2",
                },
                {
                  email: "teacher@edu.bilim",
                  password: "test123",
                  name: "Преподаватель",
                },
                {
                  email: "admin@edu.bilim",
                  password: "test123",
                  name: "Админ",
                },
              ].map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                    setTimeout(() => {
                      const form = document.querySelector("form");
                      if (form) form.requestSubmit();
                    }, 100);
                  }}
                  className="btn-spotify btn-spotify-secondary text-sm py-2"
                  disabled={loading}
                >
                  {account.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-spotify-secondary">
          <p>Бэкенд: {API_URL}</p>
          <Link
            to="/"
            className="hover:text-white inline-flex items-center gap-2 mt-2"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
