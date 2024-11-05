"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from "../components/timer/page"
import styles from "./page.module.css"

const ProximoTurno = ({ idArea, sintomas }) => {
  const [tiempoMultiplicado, setTiempoMultiplicado] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');


  useEffect(() => {
    if (!idArea) return;

    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
      };
        const tiempoResponse = await axios.get(`http://localhost:3000/api/tiempoEspera/${idArea}`, config);
        const cantidadResponse = await axios.get(`http://localhost:3000/api/cantidadPersonas/${idArea}`, config);
        const tiempoEspera = parseFloat(tiempoResponse.data[0]?.TiempoEspera || 0);
        const cantidadPersonas = cantidadResponse.data.cantidadPersonas || 0;

        const tiempoFinal = tiempoEspera * cantidadPersonas;
        setTiempoMultiplicado(tiempoFinal);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Hubo un error al obtener los datos.');
      }
    };

    fetchData();
  }, [idArea]);

  return (
    <div className={styles.timerContainer}>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : tiempoMultiplicado !== null ? (
        <div className={styles.circle}>
          <Timer tiempoMultiplicado={tiempoMultiplicado} />
          <div className={styles.turnoInfo}>
            <p>Turno de: {idArea}</p>
            <p>Síntomas: {sintomas}</p>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProximoTurno;
