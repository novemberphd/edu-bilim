import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-black via-spotify-base to-gray-900 pt-8">
      <div className="container-custom">
        {/* Герой секция */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-8">
            <div className="text-8xl mb-6">🎓</div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spotify-green via-green-400 to-cyan-400 bg-clip-text text-transparent">
              Добро пожаловать в Edu.Bilim
            </h1>
            <p className="text-xl text-spotify-secondary mb-10">
              Интерактивная платформа для онлайн-обучения с геймификацией
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="btn-spotify btn-spotify-primary text-lg px-8 py-4"
            >
              Начать обучение
            </Link>
            <Link
              to="/courses"
              className="btn-spotify btn-spotify-secondary text-lg px-8 py-4"
            >
              Смотреть курсы
            </Link>
          </div>
        </div>

        {/* Фичи */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="spotify-card text-center p-8">
            <div className="text-5xl mb-6">🏆</div>
            <h3 className="text-xl font-bold mb-4">Система рейтинга</h3>
            <p className="text-spotify-secondary">
              Зарабатывайте очки, соревнуйтесь с другими студентами
            </p>
          </div>

          <div className="spotify-card text-center p-8">
            <div className="text-5xl mb-6">📚</div>
            <h3 className="text-xl font-bold mb-4">Разнообразные курсы</h3>
            <p className="text-spotify-secondary">
              Программирование, дизайн, маркетинг и многое другое
            </p>
          </div>

          <div className="spotify-card text-center p-8">
            <div className="text-5xl mb-6">⚡</div>
            <h3 className="text-xl font-bold mb-4">Интерактивные уроки</h3>
            <p className="text-spotify-secondary">
              Практические задания и мгновенная проверка
            </p>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="bg-gradient-to-r from-spotify-green/20 to-purple-900/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-spotify-secondary mb-8 text-lg">
            Присоединяйтесь к тысячам студентов уже сегодня
          </p>
          <Link
            to="/signup"
            className="btn-spotify btn-spotify-primary text-lg px-10 py-4"
          >
            Создать аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
}
