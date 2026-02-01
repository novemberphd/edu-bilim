import { useEffect, useState, useCallback, useRef } from "react";

export default function LeaderBoard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      // Для теста - используем моковые данные
      const mockUsers = [
        { email: "demo@edu.bilim", name: "Демо Пользователь", points: 150 },
        { email: "user1@test.com", name: "Иван Иванов", points: 280 },
        { email: "user2@test.com", name: "Мария Петрова", points: 320 },
        { email: "user3@test.com", name: "Алексей Смирнов", points: 195 },
        { email: "user4@test.com", name: "Ольга Сидорова", points: 420 },
        { email: "user5@test.com", name: "Дмитрий Кузнецов", points: 180 },
      ];

      // Сортируем по очкам по убыванию
      const sorted = mockUsers.sort((a, b) => b.points - a.points);
      setUsers(sorted);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Ошибка при загрузке рейтинга:", err);
      setError("Не удалось загрузить рейтинг. Используются демо-данные.");

      // Показываем демо данные при ошибке
      const demoUsers = [
        { email: "demo1@test.com", name: "Тест 1", points: 100 },
        { email: "demo2@test.com", name: "Тест 2", points: 90 },
        { email: "demo3@test.com", name: "Тест 3", points: 80 },
      ];
      setUsers(demoUsers.sort((a, b) => b.points - a.points));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-orange-400";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-orange-500 to-red-400";
      default:
        return rank % 2 === 0 ? "bg-white/5" : "bg-white/10";
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => fetchLeaderboard(), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container-custom py-8">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="title-lg mb-2">🏆 Топ-чарт студентов</h1>
              <p className="text-spotify-secondary">
                Рейтинг студентов по набранным очкам
              </p>
            </div>

            <button
              onClick={handleRefresh}
              className="btn-spotify btn-spotify-primary flex items-center gap-2"
            >
              <span className="text-xl">🔄</span>
              Обновить
            </button>
          </div>
        </div>

        {/* Загрузка */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 border-4 border-spotify-green/30 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-spotify-green rounded-full animate-spin border-t-transparent -mt-20"></div>
            </div>
            <p className="text-gray-400">Загружаем топ-чарт...</p>
          </div>
        )}

        {/* Ошибка */}
        {error && !loading && (
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-medium text-white">{error}</p>
                <p className="text-gray-400 text-sm mt-1">
                  Показываем демо-данные
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Основной контент */}
        {!loading && users.length > 0 && (
          <>
            {/* Топ-3 */}
            {users.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[users[1], users[0], users[2]].map((user, idx) => {
                  const rank = idx === 1 ? 1 : idx === 0 ? 2 : 3;
                  return (
                    <div
                      key={user.email}
                      className={`p-8 rounded-2xl ${getRankColor(rank)} ${
                        rank === 1
                          ? "md:order-2 scale-105 -mt-4"
                          : rank === 2
                            ? "md:order-1"
                            : "md:order-3"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-5xl mb-4">{getRankIcon(rank)}</div>

                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-900 to-spotify-green mx-auto mb-4 flex items-center justify-center border-4 border-gray-900">
                          <span className="text-3xl font-bold text-white">
                            {user.name?.charAt(0)?.toUpperCase() ||
                              user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        <h3 className="font-bold text-xl mb-1 truncate">
                          {user.name || user.email.split("@")[0]}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 truncate">
                          {user.email}
                        </p>

                        <div className="bg-gray-900/50 rounded-xl p-4">
                          <div className="text-3xl font-black text-white">
                            {user.points}
                          </div>
                          <p className="text-gray-400 text-sm">очков</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Остальные участники */}
            <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Все участники{" "}
                    <span className="text-spotify-green">({users.length})</span>
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-gray-800">
                {users.slice(3).map((user, idx) => {
                  const rank = idx + 4;
                  return (
                    <div
                      key={user.email}
                      className="hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 text-center">
                              <span className="font-bold text-gray-400">
                                #{rank}
                              </span>
                            </div>

                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                              <span className="font-bold text-white">
                                {user.name?.charAt(0)?.toUpperCase() ||
                                  user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>

                            <div className="min-w-0">
                              <h4 className="font-medium text-white truncate">
                                {user.name || user.email.split("@")[0]}
                              </h4>
                              <p className="text-sm text-gray-400 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-spotify-green">
                              {user.points}
                            </div>
                            <p className="text-sm text-gray-400">очков</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
