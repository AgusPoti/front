import React from 'react';
import Boton from '../boton';
import { useRouter } from 'next/navigation';
import styles from '../ModalCancelacion/ModalCancelacion.module.css';


const Modal = ({ onClose, children }) => {
  const router = useRouter();

  const handleConfirm = () => {
    router.push('./Perfil'); 
  };
  return (
    <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h5 className={styles.modalTitle}>¿Seguro que quieres cancelar el turno?</h5>
      </div>
      <div className={styles.modalFooter}>
          <Boton sendText="Si, cancelar" onClick={handleConfirm} />
          <Boton sendText="No, vovler" onClick={onClose} />
        </div>
    </div>
  </div>
  );
};

export default Modal;
