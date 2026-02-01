// src/pages/Profile.js
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { user, logout } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-spotify-base">
        <div className="text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="title-md mb-4">Требуется вход</h2>
          <p className="text-spotify-secondary mb-6">
            Пожалуйста, войдите в свой аккаунт
          </p>
          <a href="/login" className="btn-spotify btn-spotify-primary">
            Войти
          </a>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Всего очков",
      value: user.points || 0,
      icon: "⭐",
      color: "from-spotify-green to-green-400",
    },
    {
      label: "Завершено курсов",
      value: 3,
      icon: "📚",
      color: "from-purple-500 to-purple-700",
    },
    {
      label: "Пройдено уроков",
      value: 15,
      icon: "🎯",
      color: "from-blue-500 to-cyan-400",
    },
    {
      label: "Дней подряд",
      value: 7,
      icon: "🔥",
      color: "from-orange-500 to-red-500",
    },
  ];

  const achievements = [
    {
      title: "Новичок",
      description: "Заработал первые 100 очков",
      icon: "🥇",
      achieved: true,
    },
    {
      title: "Упорный",
      description: "7 дней подряд активности",
      icon: "💪",
      achieved: true,
    },
    { title: "Мастер", description: "500 очков", icon: "👑", achieved: false },
    { title: "Гений", description: "1000 очков", icon: "🧠", achieved: false },
  ];

  return (
    <div className="min-h-screen bg-spotify-base">
      <div className="container-custom py-8">
        {/* Профиль пользователя */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Аватар */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-spotify-green to-purple-600 flex items-center justify-center">
                <span className="text-4xl font-black text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-spotify-black border-4 border-spotify-base flex items-center justify-center">
                <span className="text-xl">🎓</span>
              </div>
            </div>

            {/* Информация */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="title-lg">{user.name}</h1>
                  <p className="text-spotify-secondary mt-2">{user.email}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="badge-spotify badge-new">
                      Премиум студент
                    </span>
                    <span className="badge-spotify badge-popular">Топ 10%</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="btn-spotify btn-spotify-secondary"
                >
                  Выйти
                </button>
              </div>

              {/* Уровень */}
              <div className="max-w-md">
                <div className="flex justify-between text-sm text-spotify-secondary mb-2">
                  <span>
                    Уровень {Math.floor((user.points || 0) / 100) + 1}
                  </span>
                  <span>{(user.points || 0) % 100}/100 до след. уровня</span>
                </div>
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${(user.points || 0) % 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Табы */}
        <div className="flex border-b border-spotify-highlight mb-8">
          {[
            { id: "overview", label: "Обзор", icon: "📊" },
            { id: "achievements", label: "Достижения", icon: "🏆" },
            { id: "courses", label: "Мои курсы", icon: "📚" },
            { id: "settings", label: "Настройки", icon: "⚙️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-spotify-green text-white"
                  : "text-spotify-secondary hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Контент табов */}
        <div className="animate-fadeIn">
          {activeTab === "overview" && (
            <>
              {/* Статистика */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${stat.color} rounded-xl p-6`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-white">
                          {stat.value}
                        </div>
                        <p className="mt-2 opacity-90 text-white">
                          {stat.label}
                        </p>
                      </div>
                      <span className="text-3xl">{stat.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Активные курсы */}
              <div className="bg-spotify-elevated rounded-xl p-6 mb-8">
                <h3 className="title-md mb-6">Сейчас слушаю</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((courseId) => (
                    <div key={courseId} className="spotify-card">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-900 to-spotify-green flex items-center justify-center">
                          <span className="text-2xl">💻</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-1">
                            Курс {courseId}
                          </h4>
                          <p className="text-spotify-secondary text-sm">
                            Прогресс: {courseId * 25}% • {courseId * 3}/12
                            уроков
                          </p>
                          <div className="progress-container mt-2">
                            <div
                              className="progress-bar"
                              style={{ width: `${courseId * 25}%` }}
                            ></div>
                          </div>
                        </div>
                        <button className="play-button">▶</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "achievements" && (
            <div className="bg-spotify-elevated rounded-xl p-6">
              <h3 className="title-md mb-6">Ваши достижения</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`spotify-card ${achievement.achieved ? "border-spotify-green/30" : "opacity-60"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-spotify-secondary text-sm mt-1">
                          {achievement.description}
                        </p>
                      </div>
                      <span
                        className={`text-2xl ${achievement.achieved ? "text-spotify-green" : "text-spotify-secondary"}`}
                      >
                        {achievement.achieved ? "✅" : "🔒"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-spotify-elevated rounded-xl p-6">
              <h3 className="title-md mb-6">Настройки профиля</h3>
              <form className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-spotify-secondary mb-2 font-medium">
                    Имя
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="input-spotify"
                  />
                </div>
                <div>
                  <label className="block text-spotify-secondary mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="input-spotify"
                  />
                </div>
                <div>
                  <label className="block text-spotify-secondary mb-2 font-medium">
                    О себе
                  </label>
                  <textarea
                    className="input-spotify h-32"
                    placeholder="Расскажите о себе..."
                  ></textarea>
                </div>
                <button className="btn-spotify btn-spotify-primary">
                  Сохранить изменения
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
