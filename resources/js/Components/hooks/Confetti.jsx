import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function CelebrationConfetti({ isRaining, origin }) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  if (!isRaining) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        origin={origin}
        // Puedes ajustar otras props aquí para el efecto de "cañón"
        initialVelocityY={-20} // Inicialmente hacia arriba
        gravity={0.3}
        wind={Math.random() * 0.4 - 0.2} // Un poco de viento aleatorio
        spread={90} // Ángulo de dispersión
        particleCount={100} // Cantidad de confeti por ráfaga
      />
    </div>
  );
}