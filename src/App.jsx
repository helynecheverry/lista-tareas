import { useState } from "react";

function App() {
  // Estado principal: array de tareas en memoria (se pierde al recargar).
  const [tareas, setTareas] = useState([]);
  // Estado del input controlado.
  const [texto, setTexto] = useState("");

  // AGREGAR
  function agregarTarea(evento) {
    evento.preventDefault();
    const limpio = texto.trim();
    if (limpio === "") return;
    const nueva = { id: crypto.randomUUID(), texto: limpio, hecha: false };
    setTareas([...tareas, nueva]);
    setTexto("");
  }

  // MARCAR COMO TERMINADA
  function alternarHecha(id) {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
      )
    );
  }

  // BORRAR
  function borrarTarea(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  }

  // Valores derivados del estado (no son estado nuevo, se calculan en cada render).
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.hecha).length;
  const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);

  return (
    <div className="tarjeta">
      <header className="cabecera">
        <div className="cabecera-izq">
          <div className="icono-app">&#10003;</div>
          <div>
            <h1>Mis tareas</h1>
            <p className="subtitulo">
              {completadas} de {total} completadas
            </p>
          </div>
        </div>
        <span className="porcentaje">{porcentaje}%</span>
      </header>

      <div className="barra-progreso">
        <div className="barra-relleno" style={{ width: `${porcentaje}%` }} />
      </div>

      <form onSubmit={agregarTarea} className="formulario">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button type="submit">+ Agregar</button>
      </form>

      {tareas.length === 0 ? (
        <p className="vacio">No hay tareas todavia. Agrega la primera.</p>
      ) : (
        <ul className="lista">
          {tareas.map((tarea) => (
            <li key={tarea.id} className={tarea.hecha ? "item hecha" : "item"}>
              <label className="item-label">
                <input
                  type="checkbox"
                  checked={tarea.hecha}
                  onChange={() => alternarHecha(tarea.id)}
                />
                <span>{tarea.texto}</span>
              </label>
              <button
                className="btn-borrar"
                onClick={() => borrarTarea(tarea.id)}
                aria-label="Borrar tarea"
              >
                &#10005;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
