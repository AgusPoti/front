import React from 'react';
import styles from "./ModalMedico.module.css";

const ModalConfirmacion = ({ paciente, onConfirmar, onCancelar }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>¿{paciente.nombre} terminó de realizar su turno de {paciente.especialidad}?</p>
        <div className={styles.botones}>
          <button className={styles.confirmar} onClick={onConfirmar}>Sí, ya finalizó</button>
          <button className={styles.cancelar} onClick={onCancelar}>No, volver</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;

