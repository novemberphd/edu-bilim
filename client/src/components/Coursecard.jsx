// src/components/CourseCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Coursecard({ course }) {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    // Переходим на страницу деталей курса
    navigate(`/courses/${course.id}`);
  };

  const handleQuickView = () => {
    // Быстрый просмотр (можно модальное окно)
    alert(`Быстрый просмотр: ${course.title}`);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <h3
        style={{
          color: "#1DB954",
          marginTop: "0",
          marginBottom: "10px",
          fontSize: "1.3em",
        }}
      >
        {course.title}
      </h3>

      <p
        style={{
          color: "#555",
          lineHeight: "1.5",
          marginBottom: "15px",
          minHeight: "60px",
        }}
      >
        {course.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.9em",
          color: "#777",
          borderTop: "1px solid #eee",
          paddingTop: "15px",
          marginBottom: "15px",
        }}
      >
        <span title="Преподаватель">👨‍🏫 {course.instructor}</span>
        <span title="Длительность">⏱️ {course.duration}</span>
        <span title="Уровень">📊 {course.level}</span>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleStartCourse}
          style={{
            flex: 1,
            padding: "10px",
            background: "#1DB954",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1em",
            fontWeight: "bold",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1ed760")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1DB954")}
        >
          Начать обучение
        </button>

        <button
          onClick={handleQuickView}
          style={{
            padding: "10px 15px",
            background: "transparent",
            color: "#1DB954",
            border: "2px solid #1DB954",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1em",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1DB954";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#1DB954";
          }}
        >
          👁️
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
