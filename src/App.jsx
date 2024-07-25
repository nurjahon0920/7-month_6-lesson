import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/teacher"
              element={
                <PrivateRoute>
                  <Teacher />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Login />} />
            {/* <Route path="/teacher" element={<Teacher />} /> */}
            <Route path="/student" element={<Student />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
