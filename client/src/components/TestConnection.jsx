// src/components/TestConnection.jsx
import React, { useEffect, useState } from "react";
import { API_URL } from "../api/config";
import { api } from "../api";

function TestConnection() {
  const [status, setStatus] = useState("Проверка подключения...");
  const [serverInfo, setServerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    // Определяем, используем ли мы localhost
    setIsLocalhost(API_URL.includes("localhost"));

    api
      .testConnection()
      .then((data) => {
        if (data.message && data.message.includes("не отвечает")) {
          setStatus("🟡 Локальный режим (бэкенд не запущен)");
        } else {
          setStatus("✅ Бэкенд работает");
        }
        setServerInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setStatus("🔴 Ошибка подключения");
        setLoading(false);
        console.error("Ошибка:", err);
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        background: isLocalhost ? "#fff3cd" : "#d4edda",
        margin: "10px 0",
        borderRadius: "8px",
        border: `1px solid ${isLocalhost ? "#ffeaa7" : "#c3e6cb"}`,
      }}
    >
      <h3>🔗 Состояние подключения</h3>
      <p>
        <strong>Статус:</strong> {status}
      </p>
      <p>
        <strong>API URL:</strong> {API_URL}
      </p>
      <p>
        <strong>Режим:</strong>{" "}
        {isLocalhost ? "Локальная разработка" : "Продакшен"}
      </p>

      {!loading && serverInfo && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "white",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>Сообщение:</strong> {serverInfo.message}
          </p>
          {serverInfo.note && (
            <p>
              <em>{serverInfo.note}</em>
            </p>
          )}
          <p>
            <strong>Курсов доступно:</strong>{" "}
            {(serverInfo.courses || []).length}
          </p>
        </div>
      )}

      {isLocalhost && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "#e7f3ff",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>💡 Для подключения к бэкенду:</strong>
          </p>
          <ol style={{ margin: "5px 0 0 20px" }}>
            <li>Откройте новый терминал</li>
            <li>
              Перейдите в папку <code>server</code>
            </li>
            <li>
              Выполните: <code>npm start</code>
            </li>
            <li>Обновите эту страницу</li>
          </ol>
        </div>
      )}
    </div>
  );
}

export default TestConnection;
