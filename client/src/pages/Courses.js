// src/pages/Courses.js
import { Link } from "react-router-dom";
import coursesData from "../data/courses.json";

export default function Courses() {
  // Создаем плейлисты (категории курсов)
  const playlists = [
    { name: "Популярные курсы", emoji: "🔥", courses: coursesData.slice(0, 3) },
    { name: "Новые релизы", emoji: "🎵", courses: coursesData.slice(3, 6) },
    {
      name: "Для начинающих",
      emoji: "👶",
      courses: coursesData.filter((c) => c.id <= 3),
    },
    {
      name: "Продвинутые",
      emoji: "⚡",
      courses: coursesData.filter((c) => c.id > 3),
    },
  ];

  return (
    <div className="min-h-screen bg-spotify-base">
      <div className="container-custom py-8">
        {/* Заголовок */}
        <div className="mb-12">
          <h1 className="title-lg mb-4">Все курсы</h1>
          <p className="text-spotify-secondary">
            Слушайте знания как музыку. Выбирайте из {coursesData.length} курсов
          </p>
        </div>

        {/* Плейлисты курсов */}
        {playlists.map((playlist, idx) => (
          <div key={idx} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{playlist.emoji}</span>
                <h2 className="title-md">{playlist.name}</h2>
              </div>
              <Link
                to="/courses"
                className="text-spotify-secondary hover:text-white text-sm"
              >
                Показать все
              </Link>
            </div>

            <div className="grid-spotify">
              {playlist.courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="album-card group"
                >
                  <div className="relative mb-4">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-gray-900 to-spotify-green flex items-center justify-center">
                      <span className="text-4xl">
                        {course.id % 3 === 0
                          ? "💻"
                          : course.id % 3 === 1
                            ? "📱"
                            : "🎨"}
                      </span>
                    </div>
                    <button className="play-button absolute bottom-2 right-2">
                      ▶
                    </button>
                    <div className="absolute top-2 left-2">
                      <span className="badge-spotify badge-level">
                        {course.id <= 3 ? "Базовый" : "Продвинутый"}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-white mb-2 truncate">
                    {course.title}
                  </h3>
                  <p className="text-spotify-secondary text-sm mb-3">
                    {course.lessons.length} уроков •{" "}
                    {course.lessons.reduce((sum, l) => sum + l.points, 0)} очков
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-spotify-muted">
                      🎓 {Math.floor(Math.random() * 1000) + 100} студентов
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>4.8</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Все курсы сеткой */}
        <div className="mt-16">
          <h2 className="title-md mb-8">Полная коллекция курсов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.map((course) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="spotify-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-900 to-spotify-green flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">
                      {course.id % 3 === 0
                        ? "💻"
                        : course.id % 3 === 1
                          ? "📱"
                          : "🎨"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white mb-1 truncate">
                      {course.title}
                    </h3>
                    <p className="text-spotify-secondary text-sm mb-2 line-clamp-2">
                      {course.description ||
                        `Курс из ${course.lessons.length} уроков`}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="badge-spotify badge-popular text-xs">
                        {course.lessons.length} треков
                      </span>
                      <span className="text-spotify-muted text-xs">
                        {course.lessons.reduce((sum, l) => sum + l.points, 0)}{" "}
                        очков
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
