"use client";

import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import styles from './Timer.module.css';

const Timer = ({ idArea, idTurno, estadoTurno }) => {
  const [tiempoMultiplicado, setTiempoMultiplicado] = useState(1);
  const [cantidadPersonas, setCantidadPersonas] = useState(0);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');


  const fetchData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    try {
      const tiempoResponse = await axios.get(`http://localhost:3000/api/tiempoEspera/${idArea}`, config);
      const tiempoEspera = parseFloat(tiempoResponse.data[0]?.TiempoEspera || 1);

      const cantidadResponse = await axios.get(`http://localhost:3000/api/cantidadPersonas/${idArea}/${idTurno}`, config);
      let cantidadPersonasData = cantidadResponse.data.cantidadPersonas || 0;

      const estadoResponse = await axios.get(`http://localhost:3000/api/unTurno/${idTurno}`, config);
      const estadoTurnoActual = estadoResponse.data.idEstadoTurno;

      if (estadoTurnoActual === 3) {
        cantidadPersonasData = Math.max(cantidadPersonasData - 1, 0);
      }

      setCantidadPersonas(cantidadPersonasData);
      const tiempoFinal = cantidadPersonasData > 0 ? tiempoEspera * cantidadPersonasData : 1;
      setTiempoMultiplicado(tiempoFinal);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Hubo un error al obtener los datos.');
    }
  };

  useEffect(() => {
    if (!idArea || !idTurno) return;

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [idArea, idTurno]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }


  if (estadoTurno === 'Está siendo atendido') {
    return <p className={styles.noPeopleMessage}></p>;
  }

  const durationInSeconds = tiempoMultiplicado * 60;

  return (
    <div className={styles.timerContainer}>
      {cantidadPersonas === 0 ? (
        <p className={styles.noPeopleMessage}>No hay nadie en la fila de espera</p>
      ) : (
        <div className={styles.countdownWrapper}>
          <CountdownCircleTimer
            isPlaying
            duration={durationInSeconds}
            colors={['#b71c1c', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[durationInSeconds, durationInSeconds * 0.66, durationInSeconds * 0.33, 0]}
            trailColor="#d9d9d9"
            strokeWidth={10}
            size={200}
            onComplete={() => {
              console.log('El tiempo ha terminado');
              return { shouldRepeat: false };
            }}
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60);
              const seconds = remainingTime % 60;
              return (
                <>
                  <div className={styles.timeText}>
                    {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                  </div>
                  <div className={styles.minutesText}>minutos</div>
                </>
              );
            }}
          </CountdownCircleTimer>
        </div>
      )}
      <div className={styles.pacientesInfo}>
        <p>Cantidad de personas previas: <strong>{cantidadPersonas}</strong></p>
      </div>
    </div>
  );
};

export default Timer;
