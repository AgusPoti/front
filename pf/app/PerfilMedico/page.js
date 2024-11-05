"use client";

import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from "../components/UserContext";
import axios from 'axios';
import styles from './page.module.css';
import Boton from '../components/boton';

const PerfilMedico = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user || !user.isDoctor) {
      alert("No tienes permiso para acceder a esta página.");
      router.push('/'); // Redirige si no es médico
      return;
    }

    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('http://localhost:3000/api/listaEspera/2', config);
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de espera:', error);
        setError('Error al obtener la lista de espera');
      }
    };

    fetchData();
  }, [user, router, token]);

  const handleCallPatient = async (patientName, idTurno) => {
    if (!idTurno) {
      alert('ID de turno no válido');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        nuevoEstadoId: 2 
      }, config);

      if (response.data.success) {
        localStorage.setItem('idTurno', idTurno);
        router.push('/PacienteAtendido'); 
      } else {
        alert('No se pudo actualizar el estado del turno');
      }
    } catch (error) {
      console.error('Error al actualizar el estado del turno:', error);
      alert('Error al actualizar el estado del turno');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Lista de espera</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.list}>
        {data.length === 0 ? (
          <p>No hay pacientes en lista de espera</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <div className={styles.index}>{index + 1}</div>
              <div className={styles.name}>{item.pacientenombre}</div>
              <Boton sendText={"Llamar paciente"} onClick={() => handleCallPatient(item.pacientenombre, item.idturno)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PerfilMedico;
