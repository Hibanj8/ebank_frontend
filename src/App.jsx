import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import LoginForm from './pages/LoginForm';
import ClientDashboard from './pages/ClientDashboard';
import AgentntDashboard from './pages/AgentDashboard';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("token_expiration");

    if (token && expiration) {
      const now = Date.now();
      if (now >= parseInt(expiration)) {
        localStorage.clear();
        window.location.href = "/"; // ou navigate("/")
      } else {
        const timeout = setTimeout(() => {
          localStorage.clear();
          window.location.href = "/";
        }, parseInt(expiration) - now);
        return () => clearTimeout(timeout);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/agent/dashboard" element={<AgentntDashboard />} />
        <Route path="/changer-mot-de-passe" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;