// =============================================
// TIENDA — Filtros + Paginación
// =============================================

// Estado global
const POR_PAGINA = 10;
let paginaActual = 1;
let categoriaActual = "todos";

// Mapa de páginas conocidas para construir el breadcrumb dinámico
const PAGINAS_ORIGEN = {
  "index":            { label: "Inicio",              href: "/index.html",              parent: null },
  "productos_info":   { label: "Productos",           href: "/productos_info.html",     parent: null },
  "cat_acuarios":     { label: "Acuarios y Peceras",  href: "/cat_acuarios.html",       parent: { label: "Productos", href: "/productos_info.html" } },
  "cat_bombas":       { label: "Bombas",              href: "/cat_bombas.html",         parent: { label: "Productos", href: "/productos_info.html" } },
  "cat_filtros":      { label: "Filtros",             href: "/cat_filtros.html",        parent: { label: "Productos", href: "/productos_info.html" } },
  "cat_skimmers":     { label: "Skimmers",            href: "/cat_skimmers.html",       parent: { label: "Productos", href: "/productos_info.html" } },
  "cat_aditivos":     { label: "Aditivos",            href: "/cat_aditivos.html",       parent: { label: "Productos", href: "/productos_info.html" } },
  "cat_decoracion":   { label: "Decoración",          href: "/cat_decoracion.html",     parent: { label: "Productos", href: "/productos_info.html" } },
  "atlas":            { label: "Atlas",               href: "/atlas.html",              parent: null },
  "guia":             { label: "Guía",                href: "/guia.html",               parent: null },
  "acerca_de":        { label: "Acerca de",           href: "/acerca_de.html",          parent: null },
  "atencion_cliente": { label: "Atención al cliente", href: "/atencion_cliente.html",   parent: null },
  "contacto":         { label: "Contacto",            href: "/contacto.html",           parent: null },
};

// Al cargar: guarda la página de origen en sessionStorage y aplica filtro por URL
document.addEventListener("DOMContentLoaded", () => {

  const ref = document.referrer;
  if (ref && !ref.includes("tienda.html")) {
    const encontrado = Object.entries(PAGINAS_ORIGEN).find(([key]) =>
      ref.includes(key)
    );
    if (encontrado) {
      sessionStorage.setItem("tienda-origen", JSON.stringify(encontrado[1]));
    } else {
      sessionStorage.removeItem("tienda-origen");
    }
  }

  // Aplicar filtro si viene con ?categoria= en la URL
  const params = new URLSearchParams(window.location.search);
  const categoriaParam = params.get("categoria");

  filtrarCategoria(categoriaParam || "todos");
  actualizarContadorCarrito();
});

// Botones de filtro
document.querySelectorAll(".filtro-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    filtrarCategoria(btn.dataset.categoria);
  });
});

// =============================================
// FILTRO DE CATEGORÍA
// =============================================
function filtrarCategoria(categoria) {
  categoriaActual = categoria;
  paginaActual = 1;

  // Marcar botón activo
  document.querySelectorAll(".filtro-btn").forEach((b) => b.classList.remove("active"));
  const btnActivo = document.querySelector(`.filtro-btn[data-categoria="${categoria}"]`);
  if (btnActivo) btnActivo.classList.add("active");

  // Actualizar título de la sección
  const titulos = {
    todos: "TIENDA",
    acuarios: "ACUARIOS Y PECERAS",
    equipos: "EQUIPO PARA ACUARIO",
    plantas: "PLANTAS Y DECORACIONES",
  };
  const tituloEl = document.getElementById("tienda-titulo");
  if (tituloEl) tituloEl.textContent = titulos[categoria] || "TIENDA";

  renderPagina(1);
}

// =============================================
// BREADCRUMB DINÁMICO
// =============================================
function actualizarBreadcrumb() {
  const contenedor = document.getElementById("breadcrumb");
  if (!contenedor) return;

  const origen = JSON.parse(sessionStorage.getItem("tienda-origen") || "null");
  const camino = [];

  camino.push({ label: "Inicio", href: "/index.html" });

  // Si vino desde una categoría o página interna, agrega los pasos intermedios
  if (origen && origen.href !== "/index.html") {
    if (origen.parent) {
      camino.push({ label: origen.parent.label, href: origen.parent.href });
    }
    camino.push({ label: origen.label, href: origen.href });
  }

  // Último paso: Tienda (sin enlace, es la página actual)
  camino.push({ label: "Tienda" });

  contenedor.innerHTML = camino
    .map((item, i) => {
      const esUltimo = i === camino.length - 1;
      if (esUltimo) {
        return `<span class="bc-current">${item.label}</span>`;
      }
      return `<a href="${item.href}">${item.label}</a><span class="sep">›</span>`;
    })
    .join("");
}

// =============================================
// PAGINACIÓN
// =============================================
function renderPagina(pagina) {
  paginaActual = pagina;

  const todasLasCards = Array.from(document.querySelectorAll(".producto-card"));
  const filtradas = todasLasCards.filter(
    (card) => categoriaActual === "todos" || card.dataset.categoria === categoriaActual
  );

  const inicio = (pagina - 1) * POR_PAGINA;
  const fin = inicio + POR_PAGINA;

  // Mostrar solo las cards de la página actual
  todasLasCards.forEach((card) => (card.style.display = "none"));
  filtradas.slice(inicio, fin).forEach((card) => {
    card.style.display = "block";
    card.style.animation = "fadeIn 0.3s ease";
  });

  renderPaginacion(filtradas.length);
  actualizarBreadcrumb();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPaginacion(total) {
  const totalPaginas = Math.ceil(total / POR_PAGINA);
  const contenedor = document.getElementById("paginacion");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  if (totalPaginas <= 1) return;

  // Botón anterior
  const prev = document.createElement("button");
  prev.innerHTML = "&#8249;";
  prev.className = "pag-btn" + (paginaActual === 1 ? " disabled" : "");
  prev.disabled = paginaActual === 1;
  prev.setAttribute("aria-label", "Página anterior");
  prev.addEventListener("click", () => renderPagina(paginaActual - 1));
  contenedor.appendChild(prev);

  // Números de página
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "pag-btn" + (i === paginaActual ? " active" : "");
    btn.setAttribute("aria-label", `Página ${i}`);
    btn.addEventListener("click", () => renderPagina(i));
    contenedor.appendChild(btn);
  }

  // Botón siguiente
  const next = document.createElement("button");
  next.innerHTML = "&#8250;";
  next.className = "pag-btn" + (paginaActual === totalPaginas ? " disabled" : "");
  next.disabled = paginaActual === totalPaginas;
  next.setAttribute("aria-label", "Página siguiente");
  next.addEventListener("click", () => renderPagina(paginaActual + 1));
  contenedor.appendChild(next);
}

// =============================================
// CANTIDAD
// =============================================
function cambiarCantidad(btn, delta) {
  const cantidadEl = btn.parentElement.querySelector(".cantidad");
  let valor = parseInt(cantidadEl.textContent) + delta;
  if (valor < 1) valor = 1;
  cantidadEl.textContent = valor;
}

// =============================================
// CARRITO (localStorage)
// =============================================
function agregarAlCarrito(btn, nombre, precio) {
  const card = btn.closest(".producto-card");
  const cantidad = parseInt(card.querySelector(".cantidad").textContent);

  // Capturar imagen de la card
  const imgEl = card.querySelector(".producto-img img");
  const imagen = imgEl ? imgEl.src : "";

  // Leer carrito actual
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Sumar al existente o agregar nuevo item
  const existente = carrito.find((item) => item.nombre === nombre);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad, imagen });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();

  // Feedback visual en el botón
  btn.textContent = "¡Agregado!";
  btn.style.background = "#28a745";
  setTimeout(() => {
    btn.textContent = "Agregar al carrito";
    btn.style.background = "";
  }, 1500);
}
