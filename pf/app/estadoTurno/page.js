"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EstadoTurno = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const mensajeParam = urlParams.get('mensaje');
    
    if (mensajeParam) {
      setMensaje(mensajeParam);
    }
  }, []);

  return (
    <div>
      <h1>Estado del Turno</h1>
      <p>{mensaje || 'No hay información disponible.'}</p>
      <button onClick={() => router.push('/')}>Volver a Home</button>
    </div>
  );
};

export default EstadoTurno;
