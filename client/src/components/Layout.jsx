import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Layout() {
  const context = useContext(UserContext);
  const user = context?.user;

  return (
    <div className="min-h-screen bg-spotify-base">
      {/* Навигация */}
      <nav className="bg-spotify-black/90 backdrop-blur-sm border-b border-spotify-highlight fixed w-full z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <span className="text-3xl">🎓</span>
                <span className="text-xl font-bold text-white">Edu.Bilim</span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="nav-link">
                  Главная
                </Link>
                <Link to="/courses" className="nav-link">
                  Курсы
                </Link>
                <Link to="/leaderboard" className="nav-link">
                  Рейтинг
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-spotify-secondary hidden md:block">
                    Привет, <span className="text-white">{user.name}</span>
                  </span>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:opacity-80"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-spotify-green to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Войти
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-spotify btn-spotify-primary"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Основной контент - Outlet для вложенных роутов */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Футер */}
      <footer className="bg-spotify-black border-t border-spotify-highlight mt-12">
        <div className="container-custom py-8">
          <p className="text-center text-spotify-secondary">
            © 2024 Edu.Bilim. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
