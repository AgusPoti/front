import React from 'react';
import styles from './footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['nav-icon']}>
                <Link href="/">
                    <img src="/img/casa.png" alt="Ícono de casa"/>
                </Link>
            </div>
            <div className={styles['nav-icon']}>
                <Link href="/Perfil">
                    <img src="/img/persona.png" alt="Ícono de persona"/>
                </Link>
            </div>
            <div className={styles['nav-icon']}>
                <Link href="/ProximoTurno">
                    <img src="/img/tiempo.png" alt="Ícono de tiempo"/>
                </Link>
            </div>
            <div className={styles.indicator}></div>
        </footer>
    );
}
