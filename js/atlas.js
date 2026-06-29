// =============================================
// ATLAS DE PECES
// =============================================

// ── Estado ──
const POR_PAGINA = 8;
let paginaActual = 1;
let tipoActual     = 'todos';
let busquedaActual = '';
let todasLasCards  = [];
let ordenOriginal  = [];
let especiesData   = {};

// =============================================
// CARGA DESDE JSON
// =============================================
async function cargarEspecies() {
    const grid    = document.getElementById('atlasGrid');
    const loading = document.getElementById('cargandoEspecies');

    try {
        const res = await fetch(`data/especies.json?v=${Date.now()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const especies = await res.json();

        if (loading) loading.remove();

        // Construir el índice para el modal
        especies.forEach(e => { especiesData[e.id] = e; });

        // Generar cards
        especies.forEach(e => {
            const art = document.createElement('article');
            art.className = 'pez-card';
            art.dataset.tipo = e.tipo;
            art.dataset.nombre = e.nombre.toLowerCase();
            art.innerHTML = `
                <div class="pez-img">
                    <img src="${e.imagen}" alt="${e.nombre}" loading="lazy"
                         onerror="this.src='assets/img/pescado.png'">
                </div>
                <h3>${e.nombre}</h3>
                <a href="#" class="btn-outline" onclick="mostrarInfo(event,'${e.id}')">Mas Info.</a>`;
            grid.appendChild(art);
        });

        // Ahora que el DOM tiene las cards, inicializar
        todasLasCards = Array.from(document.querySelectorAll('.pez-card'));
        ordenOriginal = [...todasLasCards];
        todasLasCards = shuffle(todasLasCards); // random al cargar en modo Todos

        const inputBuscar = document.getElementById('buscadorAtlas');
        if (inputBuscar) {
            inputBuscar.addEventListener('input', () => {
                busquedaActual = inputBuscar.value.trim().toLowerCase();
                paginaActual = 1;
                renderPagina();
            });
        }

        renderPagina();

    } catch (err) {
        if (loading) loading.textContent = 'Error al cargar especies. Recargá la página.';
        console.error('cargarEspecies:', err);
    }
}

// =============================================
// PAGINACIÓN + FILTRO
// =============================================
function cardsVisibles() {
    return todasLasCards.filter(c => {
        const pasaTipo = tipoActual === 'todos' || c.dataset.tipo === tipoActual;
        const pasaBusqueda = !busquedaActual || (c.dataset.nombre || '').includes(busquedaActual);
        return pasaTipo && pasaBusqueda;
    });
}

function renderPagina() {
    const visibles     = cardsVisibles();
    const totalPaginas = Math.ceil(visibles.length / POR_PAGINA);
    const inicio = (paginaActual - 1) * POR_PAGINA;
    const fin    = inicio + POR_PAGINA;

    todasLasCards.forEach(c => c.style.display = 'none');
    visibles.slice(inicio, fin).forEach(c => c.style.display = 'flex');

    renderControles(totalPaginas);
}

function renderControles(totalPaginas) {
    const contenedor = document.getElementById('atlasPaginacion');
    if (!contenedor) return;

    let html = `<button class="pag-btn ${paginaActual === 1 ? 'disabled' : ''}" onclick="irPagina(${paginaActual - 1})">&#8249;</button>`;

    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button class="pag-btn ${i === paginaActual ? 'active' : ''}" onclick="irPagina(${i})">${i}</button>`;
    }

    html += `<button class="pag-btn ${paginaActual === totalPaginas ? 'disabled' : ''}" onclick="irPagina(${paginaActual + 1})">&#8250;</button>`;

    contenedor.innerHTML = html;
}

function irPagina(n) {
    paginaActual = n;
    renderPagina();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
// FILTRO
// =============================================
document.querySelectorAll('.btn-outline[data-tipo]').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.btn-outline[data-tipo]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        tipoActual = chip.dataset.tipo;
        paginaActual = 1;
        todasLasCards = tipoActual === 'todos'
            ? shuffle(ordenOriginal)
            : [...ordenOriginal];
        renderPagina();
    });
});

function resetFiltro() {
    document.querySelectorAll('.btn-outline[data-tipo]').forEach(c => c.classList.remove('active'));
    document.querySelector('.btn-outline[data-tipo="todos"]').classList.add('active');
    tipoActual = 'todos';
    paginaActual = 1;
    todasLasCards = shuffle(ordenOriginal);
    renderPagina();
}

// =============================================
// MODAL
// =============================================
function mostrarInfo(e, id) {
    e.preventDefault();
    const p = especiesData[id];
    if (!p) return;

    const etiquetaAgua =
        p.agua === 'Dulce'        ? '💧 Agua Dulce'       :
        p.agua === 'Salada'       ? '🌊 Agua Salada'      :
        p.agua === 'Tropical'     ? '🌴 Tropical'         :
        p.agua === 'Dulce Fría'   ? '❄️ Agua Dulce Fría'  :
        p.agua === 'Dulce/Salada' ? '💧🌊 Dulce / Salada' :
        p.agua;

    document.getElementById('modalContenido').innerHTML = `
        <h2>${p.nombre}</h2>
        <div class="modal-tags">
            <span class="tag tag-${(p.agua || '').toLowerCase().replace(/[^a-z]/g,'-')}">${etiquetaAgua}</span>
        </div>
        <ul class="modal-datos">
            <li><strong>Temperatura:</strong> ${p.temp  || '—'}</li>
            <li><strong>pH:</strong>          ${p.ph    || '—'}</li>
            <li><strong>Tamaño adulto:</strong> ${p.tamaño || '—'}</li>
        </ul>
        <p>${p.desc || ''}</p>
    `;
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// ── Inicio ──
document.addEventListener('DOMContentLoaded', cargarEspecies);
