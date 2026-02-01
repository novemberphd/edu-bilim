// src/components/Header.js
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header-spotify">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-spotify-green to-spotify-green-light flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-spotify-black font-black text-xl">EB</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Edu.Bilim</h1>
              <p className="text-xs text-spotify-secondary">
                Learn • Grow • Achieve
              </p>
            </div>
          </Link>

          {/* Поиск (как в Spotify) */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск курсов, уроков..."
                className="input-spotify pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                🔍
              </div>
            </div>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Уведомления */}
                <button className="icon-hover w-10 h-10 rounded-full bg-spotify-highlight flex items-center justify-center">
                  🔔
                </button>

                {/* Аватар пользователя */}
                <div className="flex items-center gap-3">
                  <div className="avatar-spotify w-10 h-10 bg-gradient-to-br from-purple-500 to-spotify-green flex items-center justify-center">
                    <span className="font-bold">
                      {user.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium">
                      {user.name || "Пользователь"}
                    </p>
                    <p className="text-xs text-spotify-secondary">
                      {user.points || 0} очков
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-spotify btn-spotify-secondary text-sm"
                  >
                    Выйти
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="btn-spotify btn-spotify-secondary">
                  Войти
                </Link>
                <Link to="/signup" className="btn-spotify btn-spotify-primary">
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Нижняя навигация */}
        <div className="flex items-center gap-1 py-3 border-t border-spotify-gray">
          <Link to="/" className="nav-item">
            <span>🏠</span>
            <span className="hidden sm:inline">Главная</span>
          </Link>
          <Link to="/courses" className="nav-item">
            <span>📚</span>
            <span className="hidden sm:inline">Курсы</span>
          </Link>
          <Link to="/leaderboard" className="nav-item">
            <span>🏆</span>
            <span className="hidden sm:inline">Рейтинг</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <span>👤</span>
            <span className="hidden sm:inline">Профиль</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
