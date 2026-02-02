// src/pages/Profile.jsx
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const context = useContext(UserContext);

  if (!context) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#181818",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>⚠️</div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Ошибка загрузки
          </h2>
          <p style={{ color: "#B3B3B3", marginBottom: "1.5rem" }}>
            Проблема с загрузкой данных пользователя
          </p>
          <a href="/" className="btn btn-primary">
            На главную
          </a>
        </div>
      </div>
    );
  }

  const { user, logout } = context;

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#181818",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🔒</div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Требуется вход
          </h2>
          <p style={{ color: "#B3B3B3", marginBottom: "1.5rem" }}>
            Пожалуйста, войдите в свой аккаунт
          </p>
          <a href="/login" className="btn btn-primary">
            Войти
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#181818",
        paddingTop: "80px",
      }}
    >
      <div className="container">
        {/* Простой профиль */}
        <div
          style={{
            background: "#282828",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1DB954, #8B5CF6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                fontWeight: "bold",
              }}
            >
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                {user.name}
              </h1>
              <p style={{ color: "#B3B3B3", marginBottom: "16px" }}>
                {user.email}
              </p>
              <div
                style={{
                  color: "#1DB954",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Очки: {user.points || 0}
              </div>
            </div>

            <button onClick={logout} className="btn btn-secondary">
              Выйти
            </button>
          </div>

          {/* Статистика */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              { label: "Курсы", value: "3", color: "#8B5CF6" },
              { label: "Уроки", value: "15", color: "#3B82F6" },
              { label: "Дней подряд", value: "7", color: "#F59E0B" },
              {
                label: "Уровень",
                value: Math.floor((user.points || 0) / 100) + 1,
                color: "#1DB954",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#3E3E3E",
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "#B3B3B3",
                    fontSize: "0.875rem",
                    marginBottom: "8px",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    color: item.color,
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
