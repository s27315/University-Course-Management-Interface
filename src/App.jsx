import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

export default function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setIsAuth(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return isAuth ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}
