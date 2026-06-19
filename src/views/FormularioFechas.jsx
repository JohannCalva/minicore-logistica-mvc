import { useState } from 'react'

/*
  View: solo captura el rango de fechas y avisa al padre cuando
  el usuario hace submit. No sabe nada de Supabase ni de cálculos.
 */
export function FormularioFechas({ onBuscar, cargando }) {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  function manejarSubmit(e) {
    e.preventDefault()
    onBuscar(fechaInicio, fechaFin)
  }

  return (
    <form onSubmit={manejarSubmit} className="formulario-fechas">
      <div className="campo">
        <label htmlFor="fecha-inicio">Fecha inicio</label>
        <input
          id="fecha-inicio"
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />
      </div>

      <div className="campo">
        <label htmlFor="fecha-fin">Fecha fin</label>
        <input
          id="fecha-fin"
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={cargando}>
        {cargando ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}