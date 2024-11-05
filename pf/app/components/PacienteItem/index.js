import React from 'react';
import styles from "./PacientesItem.module.css";

const PacienteItem = ({ paciente, onClick }) => {
  return (
    <div className={styles.pacienteItem} onClick={() => onClick(paciente)}>
      <span>{paciente.id}</span>
      <span className={styles.nombre}>{paciente.nombre}</span>
      <span>{paciente.especialidad}</span>
      <span>{paciente.medico}</span>
      <span>{paciente.tiempoEspera}</span>
      <span></span>
    </div>
  );
};

export default PacienteItem;

