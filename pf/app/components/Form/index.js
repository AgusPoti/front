import React from 'react';
import styles from './form.module.css';

export default function Form() {
    return (
        <form className={styles.form}>
            <div className={styles.formGroup}>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type="text" placeholder="Nombre y apellido" />
                    <span className={styles.editIcon}>&#9998;</span>
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type="email" placeholder="Correo electrónico" />
                    <span className={styles.editIcon}>&#9998;</span>
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type="tel" placeholder="Teléfono" />
                    <span className={styles.editIcon}>&#9998;</span>
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type="text" placeholder="DNI" />
                    <span className={styles.editIcon}>&#9998;</span>
                </div>
            </div>
            <button className={styles.button} type="submit">Guardar</button>
        </form>
    );
}
