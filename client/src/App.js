import React from "react";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Edu Bilim Platform</h1>

      <nav style={styles.nav}>
        <a href="/" style={styles.button}>
          Главная
        </a>
        <a href="/courses" style={styles.button}>
          Курсы
        </a>
        <a href="/leaderboard" style={styles.button}>
          Рейтинг
        </a>
        <a href="/login" style={styles.loginButton}>
          Войти
        </a>
        <a href="/signup" style={styles.registerButton}>
          Регистрация
        </a>
      </nav>

      <main style={styles.main}>
        <div style={styles.hero}>
          <h2>Добро пожаловать в Edu Bilim!</h2>
          <p>Ваша образовательная платформа. Начните обучение прямо сейчас.</p>

          <div style={styles.features}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📚</div>
              <h3>Курсы</h3>
              <p>
                Интерактивные уроки по программированию, математике и наукам
              </p>
              <button style={styles.actionButton}>Смотреть курсы</button>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🏆</div>
              <h3>Рейтинг</h3>
              <p>Соревнуйтесь с другими студентами и поднимайтесь в топе</p>
              <button style={styles.actionButton}>Открыть рейтинг</button>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📊</div>
              <h3>Прогресс</h3>
              <p>Отслеживайте свои успехи и получайте сертификаты</p>
              <button style={styles.actionButton}>Мой прогресс</button>
            </div>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2024 Edu Bilim. Образовательная платформа.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    margin: "40px 0 30px 0",
    color: "#1DB954",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "50px",
    flexWrap: "wrap",
    padding: "0 20px",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "#333",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.3s",
  },
  loginButton: {
    padding: "12px 25px",
    backgroundColor: "#1DB954",
    color: "black",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  registerButton: {
    padding: "12px 25px",
    backgroundColor: "#FF6B6B",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "60px",
  },
  features: {
    display: "flex",
    gap: "30px",
    marginTop: "50px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  featureCard: {
    backgroundColor: "#1E1E1E",
    padding: "30px",
    borderRadius: "15px",
    width: "300px",
    textAlign: "center",
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  actionButton: {
    marginTop: "20px",
    padding: "12px 25px",
    backgroundColor: "#1DB954",
    color: "black",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
  footer: {
    textAlign: "center",
    padding: "30px",
    marginTop: "50px",
    backgroundColor: "#000",
    color: "#888",
  },
};

export default App;
