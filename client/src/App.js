import React from "react"; // ТОЛЬКО ЭТА СТРОКА ДЛЯ ИМПОРТА REACT!

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "50px",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        ✅ EDU BILIM РАБОТАЕТ!
      </h1>
      <p style={{ fontSize: "1.5rem" }}>Сайт полностью функционирует</p>
      <div style={{ marginTop: "40px" }}>
        <button style={buttonStyle}>Главная</button>
        <button style={buttonStyle}>Курсы</button>
        <button style={buttonStyle}>Войти</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "15px 30px",
  margin: "10px",
  background: "white",
  color: "#667eea",
  border: "none",
  borderRadius: "50px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};
// НИКАКИХ ДОПОЛНИТЕЛЬНЫХ EXPORT ЗДЕСЬ!
