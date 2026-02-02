import React, { useEffect, useState } from "react";
import { API_URL } from "../api/config";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Запрос к бэкенду
    fetch(`${API_URL}/api/courses`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка курсов...</div>;

  return (
    <div>
      <h2>Курсы</h2>
      {courses.map((course) => (
        <div key={course._id || course.id} className="course-card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
