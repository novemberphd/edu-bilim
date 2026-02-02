import { Link } from "react-router-dom";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "React для начинающих",
      description: "Освойте современный React с нуля",
      icon: "⚛️",
      lessons: 12,
      level: "Начальный",
    },
    {
      id: 2,
      title: "JavaScript продвинутый",
      description: "Продвинутые концепции JavaScript",
      icon: "📜",
      lessons: 16,
      level: "Продвинутый",
    },
    {
      id: 3,
      title: "UI/UX дизайн",
      description: "Дизайн интерфейсов и пользовательский опыт",
      icon: "🎨",
      lessons: 10,
      level: "Средний",
    },
    {
      id: 4,
      title: "Node.js серверы",
      description: "Создание серверов на Node.js",
      icon: "🖥️",
      lessons: 14,
      level: "Средний",
    },
    {
      id: 5,
      title: "Базы данных",
      description: "SQL, NoSQL и оптимизация запросов",
      icon: "🗄️",
      lessons: 18,
      level: "Продвинутый",
    },
    {
      id: 6,
      title: "Мобильная разработка",
      description: "React Native для iOS и Android",
      icon: "📱",
      lessons: 20,
      level: "Продвинутый",
    },
  ];

  return (
    <div className="min-h-screen bg-spotify-base pt-8">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">📚 Все курсы</h1>
          <p className="text-spotify-secondary text-lg">
            Выберите курс и начните обучение сегодня
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="spotify-card group hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-4xl mb-3">{course.icon}</div>
                  <span className="badge-spotify badge-popular">
                    {course.level}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-spotify-green">
                    {course.lessons}
                  </div>
                  <p className="text-xs text-spotify-secondary">уроков</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {course.title}
              </h3>
              <p className="text-spotify-secondary mb-6">
                {course.description}
              </p>

              <div className="flex items-center justify-between">
                <Link
                  to={`/courses/${course.id}`}
                  className="btn-spotify btn-spotify-primary"
                >
                  Начать курс
                </Link>
                <button className="text-spotify-secondary hover:text-white">
                  ⭐
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Информация о курсах */}
        <div className="bg-spotify-elevated rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Как проходят курсы?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="font-bold mb-2">Видео уроки</h3>
              <p className="text-spotify-secondary">
                Качественные видео материалы
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="font-bold mb-2">Практика</h3>
              <p className="text-spotify-secondary">Интерактивные задания</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-bold mb-2">Очки опыта</h3>
              <p className="text-spotify-secondary">
                Зарабатывайте очки за прогресс
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
