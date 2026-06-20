import { supabase } from "../utils/supabaseClient";

/*
  Obtiene el costo total de envíos por repartidor dentro de un rango de fechas.
  Esta es la única función que conoce la fórmula de negocio:
   costo = peso_kg * tarifa_por_kg de la zona del envío
 */
export async function obtenerCostos(fechaInicio, fechaFin) {
  const { data, error } = await supabase
    .from("envios")
    .select(
      `
      peso_kg,
      fecha_envio,
      repartidor:id_repartidor ( id_repartidor, nombre ),
      zona:id_zona ( nombre_zona, tarifa_por_kg )
    `,
    )
    .gte("fecha_envio", fechaInicio)
    .lte("fecha_envio", fechaFin);

  if (error) {
    throw new Error(`Error al consultar envíos: ${error.message}`);
  }

  return agruparPorRepartidor(data);
}

/*
  Agrupa los envíos por repartidor y calcula el costo total.
  Un repartidor puede tener envíos en distintas zonas — el costo
  se calcula por envío individual y luego se suman.
 */
function agruparPorRepartidor(envios) {
  const grupos = {};

  for (const envio of envios) {
    const repartidor = envio.repartidor;
    const zona = envio.zona;

    if (!repartidor || !zona) continue; // datos huérfanos, se ignoran

    const id = repartidor.id_repartidor;
    const costoEnvio = Number(envio.peso_kg) * Number(zona.tarifa_por_kg);

    if (!grupos[id]) {
      grupos[id] = {
        id_repartidor: id,
        nombre: repartidor.nombre,
        cantidadEnvios: 0,
        totalKg: 0,
        zonas: new Set(),
        tarifas: new Set(),
        costoTotal: 0,
      };
    }

    grupos[id].cantidadEnvios += 1;
    grupos[id].totalKg += Number(envio.peso_kg);
    grupos[id].zonas.add(zona.nombre_zona);
    grupos[id].tarifas.add(zona.tarifa_por_kg);
    grupos[id].costoTotal += costoEnvio;
  }

  // convertir a array y formatear para la vista
  return Object.values(grupos).map((g) => ({
    ...g,
    zonas: Array.from(g.zonas).join(", "),
    tarifas: Array.from(g.tarifas).map((t) => `$${t}`).join(", "),
    totalKg: g.totalKg.toFixed(2),
    costoTotal: g.costoTotal.toFixed(2),
  }));
}
