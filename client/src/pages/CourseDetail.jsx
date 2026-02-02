import { useParams, Link } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-spotify-base pt-8">
      <div className="container-custom">
        <div className="mb-6">
          <Link to="/courses" className="text-spotify-green hover:underline">
            ← Назад к курсам
          </Link>
        </div>

        <div className="bg-spotify-elevated rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl">📚</div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Курс {id}</h1>
              <p className="text-spotify-secondary">
                Детальная информация о курсе
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Содержание курса</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((lesson) => (
                  <div key={lesson} className="spotify-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">Урок {lesson}</h3>
                        <p className="text-spotify-secondary text-sm">
                          Описание урока
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-spotify-green">10 очков</span>
                        <button className="play-button">▶</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="spotify-card mb-6">
                <h3 className="font-bold mb-4">Статистика</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-spotify-secondary text-sm">Прогресс</p>
                    <div className="progress-container mt-1">
                      <div
                        className="progress-bar"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-spotify-secondary text-sm">
                      Заработано очков
                    </p>
                    <p className="text-2xl font-bold text-spotify-green">50</p>
                  </div>
                </div>
              </div>

              <button className="btn-spotify btn-spotify-primary w-full mb-4">
                Продолжить обучение
              </button>

              <button className="btn-spotify btn-spotify-secondary w-full">
                Добавить в избранное
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
