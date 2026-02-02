import React from "react";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Edu Bilim Platform</h1>
      <nav style={styles.nav}>
        <button style={styles.button}>Главная</button>
        <button style={styles.button}>Курсы</button>
        <button style={styles.button}>Рейтинг</button>
        <button style={styles.loginButton}>Войти</button>
        <button style={styles.registerButton}>Регистрация</button>
      </nav>
      <main style={styles.main}>
        <h2>Добро пожаловать!</h2>
        <p>Ваша образовательная платформа работает!</p>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>📚 Курсы</h3>
            <p>Интерактивные материалы</p>
          </div>
          <div style={styles.card}>
            <h3>🏆 Рейтинг</h3>
            <p>Соревнуйтесь с другими</p>
          </div>
          <div style={styles.card}>
            <h3>📊 Прогресс</h3>
            <p>Отслеживайте успехи</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
  nav: {
    marginBottom: "40px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  loginButton: {
    padding: "12px 24px",
    backgroundColor: "#1DB954",
    color: "black",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  registerButton: {
    padding: "12px 24px",
    backgroundColor: "#FF6B6B",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "40px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: "25px",
    borderRadius: "12px",
    flex: "1",
    minWidth: "250px",
  },
};

export default App;
