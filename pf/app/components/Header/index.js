import React from 'react';
import styles from '../styles/header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <button className={styles.backButton}>&#8592;</button>
            <h1>Próximo turno</h1>
            <img className={styles.icon} src="icon.png" alt="Icon" />
        </header>
    );
}
