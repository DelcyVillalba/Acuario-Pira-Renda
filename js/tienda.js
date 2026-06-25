// =============================================
// TIENDA — Filtros + Paginación
// =============================================

// Estado global
const POR_PAGINA = 10;
let paginaActual = 1;
let categoriaActual = "todos";
let busquedaActual = "";
let ordenOriginalTienda = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Mapa de páginas conocidas para construir el breadcrumb dinámico
const PAGINAS_ORIGEN = {
  "index":            { label: "Inicio",              href: "index.html",              parent: null },
  "productos_info":   { label: "Productos",           href: "productos_info.html",     parent: null },
  "cat_acuarios":     { label: "Acuarios y Peceras",  href: "cat_acuarios.html",       parent: { label: "Productos", href: "productos_info.html" } },
  "cat_bombas":       { label: "Bombas",              href: "cat_bombas.html",         parent: { label: "Productos", href: "productos_info.html" } },
  "cat_filtros":      { label: "Filtros",             href: "cat_filtros.html",        parent: { label: "Productos", href: "productos_info.html" } },
  "cat_skimmers":     { label: "Skimmers",            href: "cat_skimmers.html",       parent: { label: "Productos", href: "productos_info.html" } },
  "cat_aditivos":     { label: "Aditivos",            href: "cat_aditivos.html",       parent: { label: "Productos", href: "productos_info.html" } },
  "cat_decoracion":   { label: "Decoración",          href: "cat_decoracion.html",     parent: { label: "Productos", href: "productos_info.html" } },
  "atlas":            { label: "Atlas",               href: "atlas.html",              parent: null },
  "guia":             { label: "Guía",                href: "guia.html",               parent: null },
  "acerca_de":        { label: "Acerca de",           href: "acerca_de.html",          parent: null },
  "atencion_cliente": { label: "Atención al cliente", href: "atencion_cliente.html",   parent: null },
  "contacto":         { label: "Contacto",            href: "contacto.html",           parent: null },
};

// =============================================
// CARGA DE PRODUCTOS DESDE JSON
// =============================================
async function cargarProductos() {
  const grid    = document.getElementById("productosGrid");
  const loading = document.getElementById("cargandoProductos");

  try {
    const res = await fetch(`data/productos.json?v=${Date.now()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const productos = await res.json();

    // Eliminar mensaje de carga
    if (loading) loading.remove();

    // Generar cards
    productos.forEach((p) => {

      const art = document.createElement("article");
      art.className = "producto-card";
      art.dataset.categoria = p.categoria;
      art.dataset.nombre = p.nombre.toLowerCase();
      art.innerHTML = `
        <div class="producto-img">
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy"
               onerror="this.src='assets/img/pescado.png'">
        </div>
        <div>
          <p class="producto-nombre">${p.nombre}</p>
          <p class="producto-precio">$${Number(p.precio).toFixed(2)}</p>
          <div class="producto-cantidad">
            <button type="button" class="cant-btn" aria-label="Reducir cantidad" onclick="cambiarCantidad(this,-1)">−</button>
            <span class="cantidad">1</span>
            <button type="button" class="cant-btn" aria-label="Aumentar cantidad" onclick="cambiarCantidad(this,1)">+</button>
          </div>
          <button type="button" class="btn-carrito"
            onclick="agregarAlCarrito(this,'${p.nombre.replace(/'/g,"\\'")}',${p.precio})">
            Agregar al carrito
          </button>
        </div>`;
      grid.appendChild(art);
    });

    // Guardar orden original (por categoría A-Z del JSON)
    ordenOriginalTienda = Array.from(grid.querySelectorAll(".producto-card"));

  } catch (err) {
    if (loading) loading.textContent = "Error al cargar productos. Recargá la página.";
    console.error("cargarProductos:", err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {

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

  // Cargar productos desde JSON y luego aplicar filtro
  await cargarProductos();

  // Buscador
  const inputBuscar = document.getElementById("buscadorTienda");
  if (inputBuscar) {
    inputBuscar.addEventListener("input", () => {
      busquedaActual = inputBuscar.value.trim().toLowerCase();
      paginaActual = 1;
      renderPagina(1);
    });
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

  // Reordenar DOM: Todos → random, categoría específica → orden original
  const grid = document.getElementById("productosGrid");
  if (grid && ordenOriginalTienda.length) {
    const orden = categoria === "todos"
      ? shuffle(ordenOriginalTienda)
      : [...ordenOriginalTienda];
    orden.forEach(card => grid.appendChild(card));
  }

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
// BREADCRUMB
// =============================================
function actualizarBreadcrumb() {
  const contenedor = document.getElementById("breadcrumb");
  if (!contenedor) return;

  const origen = JSON.parse(sessionStorage.getItem("tienda-origen") || "null");
  const camino = [];

  camino.push({ label: "Inicio", href: "index.html" });

  if (origen && origen.href !== "index.html") {
    if (origen.parent) {
      camino.push({ label: origen.parent.label, href: origen.parent.href });
    }
    camino.push({ label: origen.label, href: origen.href });
  }

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
  const filtradas = todasLasCards.filter((card) => {
    const pasaCategoria = categoriaActual === "todos" || card.dataset.categoria === categoriaActual;
    const pasaBusqueda = !busquedaActual || (card.dataset.nombre || "").includes(busquedaActual);
    return pasaCategoria && pasaBusqueda;
  });

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
// CARRITO (en localStorage)
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
