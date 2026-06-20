/*
  View: solo recibe el array ya calculado por el Model
  (a través del Controller) y lo pinta. No calcula nada.
 */
export function TablaResultados({ datos }) {
  if (datos.length === 0) {
    return <p className="sin-resultados">No hay envíos en el rango seleccionado.</p>
  }

  return (
    <table className="tabla-resultados">
      <thead>
        <tr>
          <th>Repartidor</th>
          <th>Envíos</th>
          <th>Total kg</th>
          <th>Zona(s)</th>
          <th>Tarifa/kg</th>
          <th>Costo total</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((fila) => (
          <tr key={fila.id_repartidor}>
            <td>{fila.nombre}</td>
            <td>{fila.cantidadEnvios}</td>
            <td>{fila.totalKg} kg</td>
            <td>{fila.zonas}</td>
            <td>{fila.tarifas}</td>
            <td>${fila.costoTotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}