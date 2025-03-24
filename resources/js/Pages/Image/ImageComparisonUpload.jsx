import React, { useState } from 'react';
import axios from 'axios';
/* import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; */

export default function ImageComparison() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Por favor, selecciona una imagen.");

    const formData = new FormData();
    formData.append("idExamen", 1); // Cambia el ID según sea necesario
    formData.append("imagenAComparar", image);

    setLoading(true);
    try {
      const response = await axios.post("/comparar-imagenes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error al comparar imágenes", error);
      alert("Hubo un error en la comparación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Comparación de Imágenes</h1>
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Comparando..." : "Comparar Imagen"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">Resultado</h2>
          <p>Diferencias: {result.resultado.diferencias}</p>
          <p>Porcentaje de coincidencia: {result.resultado.porcentajeCoincidencia.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
