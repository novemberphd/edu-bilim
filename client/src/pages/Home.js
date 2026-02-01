// src/pages/Home.js
import { Link } from "react-router-dom";
import coursesData from "../data/courses.json";

export default function Home() {
  const featuredCourses = coursesData.slice(0, 4);

  return (
    <div className="min-h-screen bg-spotify-base">
      {/* Герой секция */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-spotify-green/10 via-transparent to-spotify-base"></div>

        <div className="container-custom pt-12 pb-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="title-lg mb-6">
              <span className="block text-white">Welcome to </span>
              <span className="text-gradient-spotify">Edu Bilim</span>
            </h1>

            <p className="text-xl text-spotify-secondary mb-10 max-w-2xl mx-auto">
              Учиться — значит открывать то, что ты уже знаешь. Делать — значит
              демонстрировать, что ты это знаешь. Учить — значит напоминать
              другим, что они знают не хуже тебя
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/courses"
                className="btn-spotify btn-spotify-primary group"
              >
                <span> Начать курсы</span>
              </Link>
              <Link to="/signup" className="btn-spotify btn-spotify-secondary">
                Создать аккаунт
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Рекомендуемые курсы */}
      <div className="container-custom pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="title-md">Рекомендуемые для вас</h2>
          <Link to="/courses" className="text-spotify-green hover:underline">
            Показать все
          </Link>
        </div>

        <div className="grid-spotify">
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="album-card group"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-900 to-spotify-green flex items-center justify-center">
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
              </div>

              <h3 className="font-bold text-white mb-2 truncate">
                {course.title}
              </h3>
              <p className="text-spotify-secondary text-sm mb-3 line-clamp-2">
                {course.description ||
                  `${course.lessons.length} интерактивных уроков`}
              </p>

              <div className="flex items-center justify-between">
                <span className="badge-spotify badge-new">НОВОЕ</span>
                <span className="text-spotify-muted text-sm">
                  {course.lessons.length} треков
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Особенности платформы */}
      <div className="bg-spotify-elevated py-20">
        <div className="container-custom">
          <h2 className="title-md text-center mb-12">
            Почему <span className="text-gradient-spotify">Edu.Bilim</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎧",
                title: "Персонализировано",
                description: "Курсы подстраиваются под ваш темп обучения",
              },
              {
                icon: "📊",
                title: "Прогресс в реальном времени",
                description:
                  "Отслеживайте свой прогресс как в музыкальном плеере",
              },
              {
                icon: "🏆",
                title: "Геймификация",
                description:
                  "Зарабатывайте очки, достижения и поднимайтесь в рейтинге",
              },
            ].map((feature, idx) => (
              <div key={idx} className="spotify-card text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-spotify-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container-custom py-20">
        <div className="bg-gradient-to-r from-spotify-green/20 to-purple-900/20 rounded-2xl p-12 border border-spotify-green/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="title-md mb-6">Готовы начать свое обучение?</h2>
            <p className="text-spotify-secondary mb-8">
              Присоединяйтесь к тысячам студентов, которые уже улучшили свои
              навыки
            </p>
            <Link
              to="/signup"
              className="btn-spotify btn-spotify-primary inline-flex items-center gap-3"
            >
              <span>🎧 Начать бесплатно</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
