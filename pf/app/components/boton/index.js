import React from 'react';
import styles from './boton.module.css';

const Boton = ({ sendText, onClick }) => {
  return (
    <button className={styles.boton} onClick={onClick}>
      {sendText}
    </button>
  );
};

export default Boton;