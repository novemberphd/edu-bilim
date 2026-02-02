// В handleSubmit Signup.jsx:
try {
  // Регистрация на бэкенде
  const registerResult = await userApi.register({
    email: formData.email,
    name: formData.name,
    password: formData.password,
  });

  if (registerResult.success) {
    const userData = {
      email: formData.email,
      name: formData.name,
      points: 0, // Начальные очки для нового пользователя
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Сохраняем на сервере
    await userApi.saveUser(userData);

    navigate("/profile");
  }
} catch (error) {
  // Локальная регистрация если бэкенд недоступен
  const userData = {
    email: formData.email,
    name: formData.name,
    points: 0,
  };

  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  await userApi.saveUser(userData);

  navigate("/profile");
}
