const tablaPartidos = document.getElementById("tablaPartidos");
const buscador = document.getElementById("buscador");

let partidos = [];

function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

function pintarPartidos(listaPartidos) {
  tablaPartidos.innerHTML = "";

  if (listaPartidos.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 6;
    celda.textContent = "No se encontraron partidos.";
    fila.appendChild(celda);
    tablaPartidos.appendChild(fila);
    return;
  }

  listaPartidos.forEach((partido) => {
    const fila = document.createElement("tr");

    fila.appendChild(crearCelda(partido.partido));
    fila.appendChild(crearCelda(partido.ciudad));
    fila.appendChild(crearCelda(partido.estadio));
    fila.appendChild(crearCelda(partido.horaLocal));
    fila.appendChild(crearCelda(partido.horaPeninsular));
    fila.appendChild(crearCelda(partido.horaCanarias));

    tablaPartidos.appendChild(fila);
  });
}

function filtrarPartidos() {
  const texto = buscador.value.toLowerCase().trim();

  const partidosFiltrados = partidos.filter((partido) =>
    partido.partido.toLowerCase().includes(texto) ||
    partido.ciudad.toLowerCase().includes(texto) ||
    partido.estadio.toLowerCase().includes(texto)
  );

  pintarPartidos(partidosFiltrados);
}

async function cargarPartidos() {
  try {
    const respuesta = await fetch("partidos.json");
    partidos = await respuesta.json();
    pintarPartidos(partidos);
  } catch (error) {
    tablaPartidos.innerHTML = "";
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 6;
    celda.textContent = "No se pudieron cargar los partidos.";
    fila.appendChild(celda);
    tablaPartidos.appendChild(fila);
  }
}

buscador.addEventListener("input", filtrarPartidos);
cargarPartidos();
