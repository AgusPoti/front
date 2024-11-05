'use client';

import React from 'react';
import styles from './page.module.css';
import Form from '../components/Form';
import Titulo from '../components/titulo';
import Footer from '../components/footer';

export default function Home() {
    return (
        <div>
            <ProximoTurnoPage />
        </div>
    );
}

const ProximoTurnoPage = () => {
    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <img src="/img/mujer.jpg" className={styles.imagenRedonda} alt="Imagen redonda" />
                <h2>Victoria Robertson</h2>
            </header>
            <Form />
            <Footer />
        </main>
    );
};
