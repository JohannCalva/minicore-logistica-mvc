# Tutorial filtrado por fechas — React (MVC personalizado con hooks)

En este proyecto se demuestra cómo implementar el patrón MVC en React para filtrar envíos por rango de fechas y calcular el costo total por repartidor, usando Supabase como base de datos.

**Video explicativo:** https://youtu.be/uA-GbHjLSSA

---

## Proyecto

**Nombre:** minicore-logistica-mvc  
**MVC utilizado:** Arquitectura MVC personalizada en React con hooks (sin framework externo)  
**Descripción:** Aplicación que permite a una empresa de logística calcular el costo total de envíos por repartidor dentro de un rango de fechas, aplicando la tarifa por kilogramo de cada zona de entrega.

---

## Estructura MVC

```
src/
├── models/
│   └── envioModel.js        # Model: consultas Supabase + fórmula de negocio
├── controllers/
│   └── useEnvios.js         # Controller: hook de React, estado UI y validación
└── views/
    ├── FormularioFechas.jsx # View: formulario de rango de fechas
    └── TablaResultados.jsx  # View: tabla de resultados por repartidor
```

**Flujo de datos:**  
`View` captura fechas → `Controller` valida y llama al `Model` → `Model` consulta Supabase y aplica `peso_kg × tarifa_por_kg` → `Controller` actualiza estado → `View` re-renderiza.

---

## Requisitos previos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com) con las tablas `envios`, `repartidor` y `zona`

---

## Correr localmente

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/JohannCalva/minicore-logistica-mvc
   cd minicore-logistica-mvc
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env` en la raíz del proyecto:

   ```
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_PUBLISHABLE_KEY=tu_anon_key
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Proyecto deployado

https://minicore-logistica-mvc.vercel.app/

---

## Documentación y recursos

**Documentación oficial:**

- [React — Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

**Videos de referencia:**

- [React y Supabase, Aplicacion completa - Auth y CRUD](https://www.youtube.com/watch?v=I1zzgAfSUBQ)
- [REACT: Crea tu primera web DESDE CERO [para principiantes]](https://www.youtube.com/watch?v=pFyAu4R684s)

---

## Contacto

Johann Calva — johann.calva@udla.edu.ec
