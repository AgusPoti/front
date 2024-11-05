"use client";

import React, { useState, useEffect } from 'react';
import Titulo from '../components/titulo';
import Input from '../components/input';
import styles from './page.module.css';
import FormDesplegable from '../components/formDesplegable';
import Boton from '../components/boton';
import Footer from '../components/footer';
import ProximoTurno from '../components/timer/page';
import axios from 'axios';

export default function Informacion() {
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [sintomas, setSintomas] = useState('');
  const [mostrarProximoTurno, setMostrarProximoTurno] = useState(false);
  const [turnoId, setTurnoId] = useState(null);
  const [estadoTurno, setEstadoTurno] = useState('');
  const [finalizado, setFinalizado] = useState(false);
  const token = localStorage.getItem('token');

 

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const interval = setInterval(async () => {
      if (turnoId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/unTurno/${turnoId}`,
          config
          );
          const estado = response.data["idEstadoTurno"];

          if (estado === 2) { 
            setEstadoTurno('Está siendo atendido');
            setFinalizado(false); 
          } else if (estado === 3) {
            setEstadoTurno('Finalizó su consulta');
            setMostrarProximoTurno(false); 
            setFinalizado(true); 
          }
        } catch (error) {
          console.error('Error al obtener el estado del turno:', error);
        }
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, [turnoId]);

  const handleSelectArea = (id) => {
    setSelectedAreaId(id);
  };

  const handleInputChange = (e) => {
    setSintomas(e.target.value);
  };

  const handleNext = async () => {
  
    if (selectedAreaId && sintomas.trim()) {
      try {
        const idMedico = Math.floor(Math.random() * 3) + 1;
        const idPaciente = Math.floor(Math.random() * 3) + 1;
        const idEstadoTurno = 1;
        const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

        const response = await axios.post('http://localhost:3000/api/insertarTurno', {
          idMedico,
          idPaciente,
          idArea: selectedAreaId,
          idEstadoTurno,
          Sintomas: sintomas,
        }, config );

        const turnoNuevo = response.data;
        setTurnoId(turnoNuevo.Id);
        setMostrarProximoTurno(true);
        setEstadoTurno('');
        setSintomas('');
        setFinalizado(false);
      } catch (error) {
        console.error('Error al crear el turno:', error);
        alert('Hubo un error al crear el turno. Inténtalo de nuevo.');
      }
    } else {
      alert('Por favor, selecciona un área e ingresa los síntomas.');
    }
  };

  const handleCancelTurno = async () => {
    if (turnoId) {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
      try {
        await axios.delete(`http://localhost:3000/api/borrarTurno/${turnoId}`, config);
        alert('Turno cancelado exitosamente.');
        setTurnoId(null);
        setMostrarProximoTurno(false);
        setEstadoTurno('');
        setFinalizado(false);
        setSintomas('');
        setSelectedAreaId(null);
      } catch (error) {
        console.error('Error al cancelar el turno:', error);
        alert('Hubo un error al cancelar el turno. Inténtalo de nuevo.');
      }
    } else {
      alert('No hay ningún turno seleccionado para cancelar.');
    }
  };

  return (
    <main className={styles.container}>
      {!mostrarProximoTurno ? (
        <>
          <Titulo params="Información" />
          <FormDesplegable onSelectArea={handleSelectArea} />
          <Input
            iType="text"
            iPlaceholder="Ingrese sus síntomas"
            value={sintomas}
            onChange={handleInputChange}
          />
          <Boton sendText="Siguiente" onClick={handleNext} />
        </>
      ) : (
        <>
          <p>{estadoTurno}</p>
          {!finalizado && <ProximoTurno idArea={selectedAreaId} idTurno={turnoId} estadoTurno={estadoTurno} />}
          {finalizado && <p>Finalizó su consulta</p>}
          {!finalizado && <Boton sendText="Cancelar Turno" onClick={handleCancelTurno} />}
        </>
      )}
      <Footer />
    </main>
  );
}
