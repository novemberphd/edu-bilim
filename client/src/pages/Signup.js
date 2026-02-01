// src/pages/Signup.js - аналогично Login, но с полями для регистрации
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const newUser = {
        name: formData.name,
        email: formData.email,
        points: 0,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      await fetch("http://localhost:5000/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          points: 0,
          name: formData.name,
        }),
      });

      navigate("/profile");
    } catch (err) {
      setError("Ошибка регистрации");
    }
  };

  return (
    <div className="min-h-screen bg-spotify-base flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-spotify-green/20 to-purple-900/20 mb-6">
            <span className="text-4xl">🚀</span>
          </div>
          <h1 className="title-lg mb-3">Начните обучение</h1>
          <p className="text-spotify-secondary">
            Создайте аккаунт для доступа ко всем курсам
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
                Имя
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-spotify"
                placeholder="Иван Иванов"
                required
              />
            </div>

            <div>
              <label className="block text-spotify-secondary mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-spotify"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-spotify-secondary mb-2 font-medium">
                Подтвердите пароль
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-spotify"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="rounded bg-spotify-highlight border-spotify-highlight text-spotify-green"
                required
              />
              <label htmlFor="terms" className="text-spotify-secondary text-sm">
                Я согласен с{" "}
                <Link
                  to="/terms"
                  className="text-spotify-green hover:underline"
                >
                  условиями использования
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="btn-spotify btn-spotify-primary w-full"
            >
              Создать аккаунт
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-spotify-highlight">
            <p className="text-center text-spotify-secondary">
              Уже есть аккаунт?{" "}
              <Link
                to="/login"
                className="text-spotify-green font-semibold hover:underline"
              >
                Войти
              </Link>
            </p>
          </div>

          {/* Преимущества */}
          <div className="mt-8 p-4 bg-spotify-highlight/50 rounded-xl">
            <h4 className="font-semibold text-white mb-3">Что вы получите:</h4>
            <ul className="space-y-2 text-sm text-spotify-secondary">
              <li className="flex items-center gap-2">
                <span className="text-spotify-green">✓</span>
                Доступ ко всем курсам
              </li>
              <li className="flex items-center gap-2">
                <span className="text-spotify-green">✓</span>
                Отслеживание прогресса
              </li>
              <li className="flex items-center gap-2">
                <span className="text-spotify-green">✓</span>
                Участие в рейтинге
              </li>
            </ul>
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
