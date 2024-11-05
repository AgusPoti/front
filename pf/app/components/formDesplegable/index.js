
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";  

export default function FormDesplegable({ onSelectArea }) {
  const [categorias, setCategorias] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    axios.get('http://localhost:3000/api/areas',
    config
    )
      .then(response => {
        console.log("Datos recibidos de la API:", response.data);
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error);
      });
  }, []);

  const handleChange = (event) => {
    const selectedId = Number(event.target.value); 
    console.log("ID convertido (en handleChange):", selectedId); 
    onSelectArea(!isNaN(selectedId) ? selectedId : null); 
  };

  return (
    <div className={styles.dropdownContainer}>
      <form className={styles.formContainer}>
        <select 
          id="opciones" 
          name="opciones" 
          onChange={handleChange} 
          defaultValue="" 
          className={styles.selectDropdown}
        >
          <option value="" disabled>Seleccione un área</option>
          {categorias.map(cat =>  
            <option key={cat.Id} value={cat.Id}>
              {cat.Especialidad}
            </option>
          )}
        </select>
      </form>
    </div>
  );
}
