import React from "react";

function App() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>🎓 EDU BILIM - Работает!</h1>
      <p>Образовательная платформа готова к работе</p>

      <div style={{ marginTop: "30px" }}>
        <button style={buttonStyle}>Главная</button>
        <button style={buttonStyle}>Курсы</button>
        <button style={buttonStyle}>Преподаватели</button>
        <button style={buttonStyle}>Войти</button>
      </div>

      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "50px auto",
        }}
      >
        <h3>Добро пожаловать!</h3>
        <p>Здесь будет контент вашей образовательной платформы</p>
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: "10px",
  padding: "12px 24px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default App; // ТОЛЬКО ОДИН ЭКСПОРТ!
