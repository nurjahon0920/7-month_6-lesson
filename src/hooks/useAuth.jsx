import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username2, setUsername2] = useState(null);
  const [password2, setPassword2] = useState(null);
  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === "admin" && password === "1111") {
      setUsername2({ username });
      setPassword2({ password });
      setUser({ username });
      navigate("/teacher");
    } else {
      alert("Login yoki parol noto'g'ri!");
    }
  };

  const logout = () => {
    setUser(null);
    setUsername2(null);
    setPassword2(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, username2, password2, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
