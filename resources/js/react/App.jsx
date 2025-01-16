import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'


const urlInicioSesion = `http://localhost:8080/TFG_DAW/public/inicio_sesion`;

const Redireccionar = () =>{

  const navigate = useNavigate();

  const redirigir = () => {
    navigate(urlInicioSesion);
  };

}

function App() {

  return (
    <>
      <h1>TFG</h1>
      <button onClick={redirigir}>
        <h3>Iniciar sesión</h3>
      </button>  
      <button onClick={redirigir}>
        <h3>Registrar sesión</h3>
      </button>
    </>
  )
}

export default App
