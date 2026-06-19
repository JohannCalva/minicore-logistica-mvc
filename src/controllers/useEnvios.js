import { useState } from "react";
import { obtenerCostos } from "../models/envioModel.js";

/*
  Controller: orquesta entre el Model y la View.
  No conoce tarifas, pesos, ni cómo se calcula el costo,
  solo sabe pedir el resultado y manejar el estado de la UI.
 */
export function useEnvios() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function buscarCostos(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
      setError("Debes seleccionar ambas fechas");
      return;
    }

    if (fechaInicio > fechaFin) {
      setError("La fecha de inicio no puede ser mayor a la fecha fin");
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const resultado = await obtenerCostos(fechaInicio, fechaFin);
      setDatos(resultado);
    } catch (err) {
      setError(err.message);
      setDatos([]);
    } finally {
      setCargando(false);
    }
  }

  return { datos, cargando, error, buscarCostos };
}
