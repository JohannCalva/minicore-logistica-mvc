import { useEnvios } from './controllers/useEnvios'
import { FormularioFechas } from './views/FormularioFechas'
import { TablaResultados } from './views/TablaResultados'

function App() {
  const { datos, cargando, error, buscarCostos } = useEnvios()

  return (
    <div>
      <h1>Costos de envíos por repartidor</h1>
      <FormularioFechas onBuscar={buscarCostos} cargando={cargando} />
      {error && <p>{error}</p>}
      <TablaResultados datos={datos} />
    </div>
  )
}

export default App
