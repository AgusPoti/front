import React from 'react';
import styles from './input.module.css'; // Importa los estilos

const Input = ({ iType, iPlaceholder, value, onChange }) => (
  <div className={styles.inputContainer}> {/* Contenedor para aplicar margen */}
    <input 
      type={iType} 
      placeholder={iPlaceholder} 
      value={value} 
      onChange={onChange} 
      className={styles.inputField} // Aplica los estilos al input
    />
  </div>
);

export default Input;


