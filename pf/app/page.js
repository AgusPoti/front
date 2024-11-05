"use client";

import { useState } from 'react';
import Login from './Login/page.js';
import LoginForm from './LoginForm/page.js';
import { UserProvider } from './components/UserContext/index.js';
import './page.module.css';

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(true);
  };

  const switchToLogin = () => {
    setShowLoginForm(false); 
  };

  return (
    <UserProvider>
    <div className="app">
      {!showLoginForm ? (
        <>
          <Login />
          <button className="btn" onClick={toggleLoginForm}>Ver Registro</button>
        </>
      ) : (
        <LoginForm onSwitchToLogin={switchToLogin} />
      )}
    </div>
    </UserProvider>
  );
};

export default App;
