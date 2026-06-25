// =============================================
// Panel de Administración
// =============================================

// ── Estado global ──
let productos = [];
let especies  = [];
let filtroCatActual  = 'todos';
let filtroTipoActual = 'todos';

// ── Arranco la app cuando carga el DOM ──
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFiltros();
    cargarProductos();
    cargarEspecies();
});

// =============================================
// TABS
// =============================================
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${tab}`).classList.add('active');
        });
    });
}

// =============================================
// CARGAR DATOS
// =============================================
async function cargarProductos() {
    try {
        const res = await fetch('../data/productos.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        productos = await res.json();
        renderTablaProductos();
    } catch (err) {
        toast(`Error al cargar productos: ${err.message}`, 'error');
    }
}

async function cargarEspecies() {
    try {
        const res = await fetch('../data/especies.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        especies = await res.json();
        renderTablaEspecies();
    } catch (err) {
        toast(`Error al cargar especies: ${err.message}`, 'error');
    }
}

// =============================================
// EXPORTAR JSON (descarga el archivo actualizado)
// =============================================
function descargarJSON(datos, nombreArchivo) {
    const json = JSON.stringify(datos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = nombreArchivo;
    a.click();
    URL.revokeObjectURL(url);
}

function exportarProductos() {
    descargarJSON(productos, 'productos.json');
    toast('Descargado. Reemplazá data/productos.json en el proyecto.', 'ok');
}

function exportarEspecies() {
    descargarJSON(especies, 'especies.json');
    toast('Descargado. Reemplazá data/especies.json en el proyecto.', 'ok');
}

// =============================================
// PRODUCTOS
// =============================================
function renderTablaProductos() {
    const tbody = document.getElementById('bodyProductos');
    const empty = document.getElementById('emptyProductos');
    document.getElementById('badgeProductos').textContent = productos.length;

    const lista = filtroCatActual === 'todos'
        ? productos
        : productos.filter(p => p.categoria === filtroCatActual);

    if (lista.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    tbody.innerHTML = lista.map(p => `
        <tr>
            <td><img class="thumb" src="${p.imagen}" alt="${p.nombre}" onerror="this.src='../assets/img/pescado.png'"></td>
            <td>${p.nombre}</td>
            <td>$${Number(p.precio).toFixed(2)}</td>
            <td><span class="cat-badge cat-${p.categoria}">${labelCategoria(p.categoria)}</span></td>
            <td>
                <button class="btn-icon" title="Editar" onclick="editarProducto(${p.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-icon btn-icon-danger" title="Eliminar" onclick="confirmarEliminar('producto', ${p.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function labelCategoria(cat) {
    return { acuarios: 'Acuarios', equipos: 'Equipos', plantas: 'Plantas' }[cat] || cat;
}

function abrirModalProducto() {
    document.getElementById('tituloModalProducto').textContent = 'Nuevo producto';
    document.getElementById('formProducto').reset();
    document.getElementById('pId').value = '';
    document.getElementById('pImgPreview').src = '../assets/img/pescado.png';
    document.getElementById('modalProducto').style.display = 'flex';
}

function editarProducto(id) {
    const p = productos.find(x => x.id === id);
    if (!p) return;
    document.getElementById('tituloModalProducto').textContent = 'Editar producto';
    document.getElementById('pId').value        = p.id;
    document.getElementById('pNombre').value    = p.nombre;
    document.getElementById('pPrecio').value    = p.precio;
    document.getElementById('pCategoria').value = p.categoria;
    document.getElementById('pImgUrl').value    = p.imagen;
    document.getElementById('pImgPreview').src  = p.imagen;
    document.getElementById('pImgFile').value   = '';
    document.getElementById('modalProducto').style.display = 'flex';
}

document.getElementById('formProducto').addEventListener('submit', (e) => {
    e.preventDefault();

    const id     = document.getElementById('pId').value;
    const imagen = document.getElementById('pImgUrl').value.trim()
                || document.getElementById('pImgPreview').src;

    const item = {
        id:        id ? Number(id) : Date.now(),
        nombre:    document.getElementById('pNombre').value.trim(),
        precio:    parseFloat(document.getElementById('pPrecio').value),
        categoria: document.getElementById('pCategoria').value,
        imagen,
    };

    if (id) {
        const idx = productos.findIndex(p => p.id === Number(id));
        if (idx !== -1) productos[idx] = item;
    } else {
        productos.push(item);
    }

    const ordenCat = { acuarios: 0, equipos: 1, plantas: 2 };
    productos.sort((a, b) => {
        const catDiff = (ordenCat[a.categoria] ?? 99) - (ordenCat[b.categoria] ?? 99);
        return catDiff !== 0 ? catDiff : a.nombre.localeCompare(b.nombre, 'es');
    });

    renderTablaProductos();
    cerrarModal('modalProducto');
    toast('Producto guardado. Exportá el JSON cuando termines de editar.', 'ok');
});

// =============================================
// ESPECIES
// =============================================
function renderTablaEspecies() {
    const tbody = document.getElementById('bodyEspecies');
    const empty = document.getElementById('emptyEspecies');
    document.getElementById('badgeEspecies').textContent = especies.length;

    const lista = filtroTipoActual === 'todos'
        ? especies
        : especies.filter(e => e.tipo === filtroTipoActual);

    if (lista.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    tbody.innerHTML = lista.map(e => `
        <tr>
            <td><img class="thumb" src="${e.imagen}" alt="${e.nombre}" onerror="this.src='../assets/img/pescado.png'"></td>
            <td>${e.nombre}</td>
            <td><span class="cat-badge cat-${e.tipo}">${labelTipo(e.tipo)}</span></td>
            <td style="font-size:.82rem;color:#4b5563">${e.agua || '—'} · ${e.temp || '—'} · pH ${e.ph || '—'}</td>
            <td>
                <button class="btn-icon" title="Editar" onclick="editarEspecie('${e.id}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-icon btn-icon-danger" title="Eliminar" onclick="confirmarEliminar('especie', '${e.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function labelTipo(tipo) {
    return {
        dulce: 'Agua Dulce', salada: 'Agua Salada',
        tropical: 'Tropical', caracol: 'Caracol', axolote: 'Axolote'
    }[tipo] || tipo;
}

function abrirModalEspecie() {
    document.getElementById('tituloModalEspecie').textContent = 'Nueva especie';
    document.getElementById('formEspecie').reset();
    document.getElementById('eIdOriginal').value = '';
    document.getElementById('eImgPreview').src = '../assets/img/pescado.png';
    document.getElementById('modalEspecie').style.display = 'flex';
}

function editarEspecie(id) {
    const e = especies.find(x => x.id === id);
    if (!e) return;
    document.getElementById('tituloModalEspecie').textContent = 'Editar especie';
    document.getElementById('eIdOriginal').value = e.id;
    document.getElementById('eId').value      = e.id;
    document.getElementById('eNombre').value  = e.nombre;
    document.getElementById('eTipo').value    = e.tipo;
    document.getElementById('eAgua').value    = e.agua    || '';
    document.getElementById('eTemp').value    = e.temp    || '';
    document.getElementById('ePh').value      = e.ph      || '';
    document.getElementById('eTamanio').value = e.tamaño  || '';
    document.getElementById('eDesc').value    = e.desc    || '';
    document.getElementById('eImgUrl').value  = e.imagen;
    document.getElementById('eImgPreview').src = e.imagen;
    document.getElementById('eImgFile').value = '';
    document.getElementById('modalEspecie').style.display = 'flex';
}

document.getElementById('formEspecie').addEventListener('submit', (e) => {
    e.preventDefault();

    const idOriginal = document.getElementById('eIdOriginal').value;
    const imagen     = document.getElementById('eImgUrl').value.trim()
                    || document.getElementById('eImgPreview').src;

    const item = {
        id:      document.getElementById('eId').value.trim().replace(/\s/g, '_'),
        nombre:  document.getElementById('eNombre').value.trim(),
        tipo:    document.getElementById('eTipo').value,
        imagen,
        agua:    document.getElementById('eAgua').value.trim(),
        temp:    document.getElementById('eTemp').value.trim(),
        ph:      document.getElementById('ePh').value.trim(),
        tamaño:  document.getElementById('eTamanio').value.trim(),
        desc:    document.getElementById('eDesc').value.trim(),
    };

    if (idOriginal) {
        const idx = especies.findIndex(x => x.id === idOriginal);
        if (idx !== -1) especies[idx] = item;
    } else {
        especies.push(item);
    }

    const ordenTipo = { dulce: 0, salada: 1, tropical: 2, caracol: 3, axolote: 4 };
    especies.sort((a, b) => {
        const tipoDiff = (ordenTipo[a.tipo] ?? 99) - (ordenTipo[b.tipo] ?? 99);
        return tipoDiff !== 0 ? tipoDiff : a.nombre.localeCompare(b.nombre, 'es');
    });

    renderTablaEspecies();
    cerrarModal('modalEspecie');
    toast('Especie guardada. Exportá el JSON cuando termines de editar.', 'ok');
});

// =============================================
// ELIMINAR (con confirmación)
// =============================================
function confirmarEliminar(tipo, id) {
    const msg = document.getElementById('confirmMsg');
    msg.textContent = tipo === 'producto'
        ? `¿Querés eliminar el producto "${productos.find(p => p.id === id)?.nombre}"?`
        : `¿Querés eliminar la especie "${especies.find(e => e.id === id)?.nombre}"?`;

    document.getElementById('modalConfirm').style.display = 'flex';
    document.getElementById('btnConfirmOk').onclick = () => {
        cerrarModal('modalConfirm');
        if (tipo === 'producto') {
            productos = productos.filter(p => p.id !== id);
            renderTablaProductos();
        } else {
            especies = especies.filter(e => e.id !== id);
            renderTablaEspecies();
        }
        toast('Elemento eliminado. Exportá el JSON cuando termines de editar.', 'ok');
    };
}

// =============================================
// FILTROS
// =============================================
function initFiltros() {
    document.querySelectorAll('#tab-productos .filtro-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#tab-productos .filtro-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroCatActual = btn.dataset.cat;
            renderTablaProductos();
        });
    });

    document.querySelectorAll('#tab-especies .filtro-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#tab-especies .filtro-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroTipoActual = btn.dataset.tipo;
            renderTablaEspecies();
        });
    });
}

// =============================================
// IMAGEN
// =============================================
function previewImagen(input, previewId) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { document.getElementById(previewId).src = e.target.result; };
    reader.readAsDataURL(file);
}

function actualizarPreviewUrl(inputId, previewId) {
    const url = document.getElementById(inputId).value;
    document.getElementById(previewId).src = url || '../assets/img/pescado.png';
}

// =============================================
// MODALES
// =============================================
function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}

function cerrarModalSiOverlay(event, id) {
    if (event.target === document.getElementById(id)) cerrarModal(id);
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        ['modalProducto', 'modalEspecie', 'modalConfirm'].forEach(id => {
            const el = document.getElementById(id);
            if (el && el.style.display !== 'none') cerrarModal(id);
        });
    }
});

// =============================================
// TOAST
// =============================================
let toastTimer;
function toast(msg, tipo = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className   = `toast show ${tipo}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.className = 'toast'; }, 3500);
}
