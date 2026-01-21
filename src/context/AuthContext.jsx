import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "tup_users";       // все пользователи
const AUTH_KEY = "tup_auth_user";    // текущая сессия

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 восстановление сессии
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const getUsers = () =>
    JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const saveUsers = (users) =>
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // ✍️ Регистрация
  const register = (email, password) => {
    const users = getUsers();

    if (users.some(u => u.email === email)) {
      throw new Error("USER_EXISTS");
    }

    const newUser = { email, password };
    const updatedUsers = [...users, newUser];

    saveUsers(updatedUsers);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
    setUser({ email });

    return Promise.resolve({ email });
  };

  // 🔐 Логин
  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(
      u => u.email === email && u.password === password
    );

    if (!found) {
      throw new Error("INVALID_CREDENTIALS");
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
    setUser({ email });

    return Promise.resolve({ email });
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout,
  }), [user]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}