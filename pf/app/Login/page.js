"use client";
import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext'; 
import axios from 'axios';

const Login = () => {
  const { user, setUser } = useContext(UserContext); 
  const [dni, setDni] = useState(''); 
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loginPaciente = async (dni, contrasena) => {
    try {
        const response = await axios.post('http://localhost:3000/api/login', { dni, contrasena });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data.message || 'Error en el login';
        console.error('Error en el login:', errorMessage);
        throw new Error(errorMessage);
    }
  };

  const guardarToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await axios.get('http://localhost:3000/api/protected', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error al obtener datos protegidos:', error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        const result = await loginPaciente(dni, contrasena);
        setUser(result.user);
        localStorage.setItem('token', result.token);

        window.location.href = result.isMedico ? '/PerfilMedico' : '/Home';
        guardarToken();
        setSuccess('Login exitoso!');
    } catch (error) {
        setError(error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="login-container">
      {user ? (
        <div>
          <h2>Bienvenido, {user.name}!</h2>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>DNI:</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <button type="submit">Iniciar Sesión</button>
          </form>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </>
      )}
    </div>
  );
};

export default Login;
