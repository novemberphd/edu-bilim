// src/pages/CourseDetail.js
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import coursesData from "../data/courses.json";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((c) => c.id === parseInt(id));

  const [openLesson, setOpenLesson] = useState(null);
  const [tasksProgress, setTasksProgress] = useState(() => {
    const saved = localStorage.getItem("tasksProgress");
    return saved ? JSON.parse(saved) : {};
  });
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem("points");
    return saved ? parseInt(saved) : 0;
  });
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    localStorage.setItem("tasksProgress", JSON.stringify(tasksProgress));
    localStorage.setItem("points", points.toString());
  }, [tasksProgress, points]);

  const completeTask = async (taskId, taskPoints, lessonIndex) => {
    if (tasksProgress[taskId]) return;

    const newProgress = { ...tasksProgress, [taskId]: true };
    setTasksProgress(newProgress);

    if (!completedLessons.includes(lessonIndex)) {
      setCompletedLessons([...completedLessons, lessonIndex]);
    }

    const newPoints = points + taskPoints;
    setPoints(newPoints);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        await fetch("http://localhost:5000/points", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, points: newPoints }),
        });
      } catch (err) {
        console.error("Ошибка при обновлении очков:", err);
      }
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-spotify-base">
        <div className="text-center">
          <div className="text-6xl mb-6">🎵</div>
          <h2 className="title-md mb-4">Курс не найден</h2>
          <button
            onClick={() => navigate("/courses")}
            className="btn-spotify btn-spotify-secondary"
          >
            ← Вернуться к плейлистам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-base">
      {/* Хедер курса */}
      <div
        className="h-64 relative bg-gradient-to-b from-gray-900 to-spotify-base"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                          url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-spotify-base to-transparent">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-purple-900 to-spotify-green flex items-center justify-center shadow-2xl">
                <span className="text-7xl">
                  {course.id % 3 === 0
                    ? "💻"
                    : course.id % 3 === 1
                      ? "📱"
                      : "🎨"}
                </span>
              </div>

              <div className="flex-1">
                <p className="text-sm text-spotify-green font-semibold mb-2 uppercase tracking-wider">
                  ОБРАЗОВАТЕЛЬНЫЙ КУРС
                </p>
                <h1 className="title-lg mb-4">{course.title}</h1>
                <div className="flex items-center gap-6 text-spotify-secondary">
                  <span>👤 Преподаватель</span>
                  <span>📅 {course.lessons.length} уроков</span>
                  <span>
                    ⭐ {course.lessons.reduce((sum, l) => sum + l.points, 0)}{" "}
                    очков
                  </span>
                </div>
              </div>

              <button className="btn-spotify btn-spotify-primary text-lg py-4 px-8">
                <span className="text-2xl mr-2">▶</span>
                Начать обучение
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2">
            {/* Прогресс */}
            <div className="bg-spotify-elevated rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white mb-1">Ваш прогресс</h3>
                  <p className="text-spotify-secondary">
                    {completedLessons.length} из {course.lessons.length} уроков
                    завершено
                  </p>
                </div>
                <span className="text-spotify-green font-bold">
                  {Math.round(
                    (completedLessons.length / course.lessons.length) * 100,
                  )}
                  %
                </span>
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${(completedLessons.length / course.lessons.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Треки (уроки) */}
            <div className="bg-spotify-elevated rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="title-md">Треки курса</h2>
                <span className="text-spotify-secondary">
                  {course.lessons.length} треков
                </span>
              </div>

              <div className="space-y-2">
                {course.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className={`lesson-item ${completedLessons.includes(idx) ? "lesson-item-completed" : ""}`}
                    onClick={() =>
                      setOpenLesson(openLesson === idx ? null : idx)
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          completedLessons.includes(idx)
                            ? "bg-spotify-green text-spotify-black"
                            : "bg-spotify-highlight text-spotify-secondary"
                        }`}
                      >
                        {completedLessons.includes(idx) ? "✓" : idx + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-spotify-secondary">
                          {lesson.points} очков •{" "}
                          {lesson.taskId ? "С заданием" : "Теория"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-spotify-secondary">
                        {openLesson === idx ? "Скрыть" : "Показать"}
                      </span>
                      <span
                        className={`text-lg transition-transform ${
                          openLesson === idx ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Сайдбар */}
          <div className="space-y-6">
            {/* Информация о курсе */}
            <div className="bg-spotify-elevated rounded-xl p-6">
              <h3 className="font-bold text-white mb-4">О курсе</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-spotify-secondary">Длительность</span>
                  <span className="text-white">
                    {course.lessons.length * 2} часов
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-spotify-secondary">Уровень</span>
                  <span className="badge-spotify badge-level">
                    {course.id <= 3 ? "Начальный" : "Продвинутый"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-spotify-secondary">Очков за курс</span>
                  <span className="text-spotify-green font-bold">
                    {course.lessons.reduce((sum, l) => sum + l.points, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-spotify-secondary">Студентов</span>
                  <span className="text-white">
                    {Math.floor(Math.random() * 1000) + 100}
                  </span>
                </div>
              </div>
            </div>

            {/* Ваши очки */}
            <div className="bg-gradient-to-br from-spotify-green/20 to-purple-900/20 rounded-xl p-6 border border-spotify-green/30">
              <h3 className="font-bold text-white mb-4">Ваш счет</h3>
              <div className="text-center">
                <div className="text-4xl font-black text-spotify-green mb-2">
                  {points}
                </div>
                <p className="text-spotify-secondary">очков заработано</p>
              </div>
              <Link
                to="/leaderboard"
                className="btn-spotify btn-spotify-success w-full mt-6"
              >
                Посмотреть рейтинг
              </Link>
            </div>

            {/* Рекомендации */}
            <div className="bg-spotify-elevated rounded-xl p-6">
              <h3 className="font-bold text-white mb-4">Рекомендуем также</h3>
              <div className="space-y-4">
                {coursesData
                  .filter((c) => c.id !== course.id)
                  .slice(0, 2)
                  .map((recCourse) => (
                    <Link
                      key={recCourse.id}
                      to={`/course/${recCourse.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-spotify-highlight transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-900 to-spotify-green flex items-center justify-center">
                        <span className="text-xl">
                          {recCourse.id % 3 === 0
                            ? "💻"
                            : recCourse.id % 3 === 1
                              ? "📱"
                              : "🎨"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm">
                          {recCourse.title}
                        </h4>
                        <p className="text-xs text-spotify-secondary">
                          {recCourse.lessons.length} уроков
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
