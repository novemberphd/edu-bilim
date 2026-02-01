// src/pages/Login.js
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const mockUser = {
        email,
        name: email.split("@")[0],
        points: Math.floor(Math.random() * 500),
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate("/profile");
    } catch (err) {
      setError("Ошибка входа. Проверьте данные.");
    }
  };

  return (
    <div className="min-h-screen bg-spotify-base flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-spotify-green/20 to-purple-900/20 mb-6">
            <span className="text-4xl">🎧</span>
          </div>
          <h1 className="title-lg mb-3">С возвращением!</h1>
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
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded bg-spotify-highlight border-spotify-highlight text-spotify-green"
                />
                <span className="text-spotify-secondary text-sm">
                  Запомнить меня
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-spotify-green hover:underline text-sm"
              >
                Забыли пароль?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-spotify btn-spotify-primary w-full"
            >
              Войти
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

          {/* Демо вход */}
          <div className="mt-8">
            <p className="text-center text-spotify-secondary mb-4">
              Или войдите для демо:
            </p>
            <button
              onClick={() => {
                setEmail("demo@edu.bilim");
                setPassword("demo123");
                setTimeout(() => document.querySelector("form").submit(), 100);
              }}
              className="btn-spotify btn-spotify-secondary w-full"
            >
              Демо вход
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-spotify-secondary hover:text-white inline-flex items-center gap-2"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
