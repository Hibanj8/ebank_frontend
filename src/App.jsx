import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import LoginForm from './pages/LoginForm';
import ClientDashboard from './pages/ClientDashboard';
import AgentntDashboard from './pages/AgentDashboard';
import CreateClient from './pages/CreateClient';
import CreateCompte from './pages/CreateCompte';
import UpdatePassword from './pages/UpdatePassword';
import NewTransfer from './pages/NewTransfer';

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("token_expiration");

    if (token && expiration) {
      const now = Date.now();
      if (now >= parseInt(expiration)) {
        localStorage.clear();
        window.location.href = "/"; 
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
        <Route path="/create-client" element={<CreateClient />} />
        <Route path="/create-compte" element={<CreateCompte />} />
        <Route path="/changer-mot-de-passe" element={<UpdatePassword />} />
        <Route path="/virement" element={<NewTransfer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;