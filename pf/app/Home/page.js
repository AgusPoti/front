"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css'; 
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const handleMapClick = () => {
    setShowMap(prevState => !prevState); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.pageContainer}>


      {!showMap ? (
        <>
          <div className={styles.logoContainer}>
            <Image
              src="/img/logos.png"
              alt="Logo"
              layout="intrinsic"
              width={300} 
              height={150} 
            />
          </div>

          {buttonsVisible && (
            <div className={styles.buttonsContainer}>
              <Link href="/informacion" passHref legacyBehavior>
                <a className={styles.linkButton}>
                  Sacar Turno
                </a>
              </Link>

              <div className={styles.nextTurnContainer}>
                <span className={styles.nextTurnLabel}>Próximo turno en:</span>
                <span className={styles.nextTurnValue}>---</span>
              </div>

              <button className={styles.secondaryButton} onClick={handleMapClick}>
                Ver mapa
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.mapContainer}>
          <Image 
            src="/img/mapa.png" 
            alt="Mapa"
            width={360}
            height={200}
            layout="responsive"
          />
          <button className={styles.secondaryButton} onClick={handleMapClick}>
            Volver
          </button>
        </div>
      )}
    </div>
  );
};
