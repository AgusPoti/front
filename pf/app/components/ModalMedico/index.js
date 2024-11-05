import React from 'react';
import axios from 'axios';
import styles from './ModalMedico.module.css';

const ModalMedico = ({ idTurno, onConfirm, onCancel, message = "¿Deseas finalizar el turno?" }) => {
  const token = localStorage.getItem('token');

  const handleConfirm = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    try {
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        nuevoEstadoId: 3, 
      }, config );

      if (response.data.success) {
        onConfirm(); 
      } else {
        alert('No se pudo actualizar el estado del turno');
      }
    } catch (error) {
      console.error('Error al finalizar el turno:', error);
      alert('Error al finalizar el turno');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleConfirm}>
            Sí, ya finalizó
          </button>
          <button className={styles.button} onClick={onCancel}>
            No, volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMedico;
