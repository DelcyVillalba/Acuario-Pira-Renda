// =============================================
// DATOS DE PECES
// =============================================
const infoPeces = {
    // Dulce
    basurero:  { nombre: 'Basurero - Corydora Aeneus',                 agua: 'Dulce',  temp: '22-26°C', ph: '6.0-7.5', tamaño: '7 cm',  desc: 'Pez de fondo muy tranquilo, ideal para limpiar restos de comida del sustrato. Vive en grupos de mínimo 6 individuos.' },
    borrachito:{ nombre: 'Borrachito - Hemigrammus rhodostomus',       agua: 'Dulce',  temp: '24-28°C', ph: '5.5-7.0', tamaño: '4.5 cm',desc: 'Tetra de nariz roja, muy apreciado por su colorido. Requiere agua blanda y ligeramente ácida.' },
    xipho:     { nombre: 'Xipho - Xiphophorus helleri',                agua: 'Dulce',  temp: '22-28°C', ph: '7.0-8.0', tamaño: '10 cm', desc: 'Espada vivíparo, muy resistente y colorido. Fácil de reproducir en cautividad.' },
    gurami:    { nombre: 'Gurami Perla - Trichogaster leerii',         agua: 'Dulce',  temp: '24-28°C', ph: '6.5-8.0', tamaño: '12 cm', desc: 'Pez laberíntico de aspecto elegante. Pacífico y compatible con la mayoría de especies.' },
    ancistrus: { nombre: 'Ancistrus',                                   agua: 'Dulce',  temp: '23-27°C', ph: '6.0-7.5', tamaño: '13 cm', desc: 'Excelente limpiador de algas. Se adhiere al vidrio y decoraciones. Nocturno y pacífico.' },
    pleco:     { nombre: 'Pleco - Hypostomus plecostomus',             agua: 'Dulce',  temp: '22-28°C', ph: '6.5-7.5', tamaño: '50 cm', desc: 'El limpiador clásico. Crece mucho, necesita acuarios grandes. Come algas y vegetales.' },
    guppy:     { nombre: 'Guppy - Poecilia reticulata',                agua: 'Dulce',  temp: '22-28°C', ph: '6.8-7.8', tamaño: '5 cm',  desc: 'Uno de los peces más populares. Colorido, resistente y de fácil reproducción. Perfecto para principiantes.' },
    platy:     { nombre: 'Platy - Xiphophorus maculatus',              agua: 'Dulce',  temp: '18-28°C', ph: '7.0-8.3', tamaño: '6 cm',  desc: 'Vivíparo muy duro y adaptable. Existe en cientos de variedades de color.' },
    neon:      { nombre: 'Neón - Paracheirodon innesi',                 agua: 'Dulce',  temp: '20-26°C', ph: '5.0-7.0', tamaño: '4 cm',  desc: 'Icónico pez de acuario con franja neón azul y roja. Vive en cardúmenes grandes.' },
    escalar:   { nombre: 'Escalar - Pterophyllum scalare',             agua: 'Dulce',  temp: '24-30°C', ph: '6.0-7.5', tamaño: '15 cm', desc: 'El ángel del acuario. Elegante y carismático. Puede comerse peces muy pequeños.' },
    // Salada
    payaso:    { nombre: 'Pez Payaso - Amphiprion ocellaris',          agua: 'Salada', temp: '24-27°C', ph: '8.1-8.4', tamaño: '11 cm', desc: 'Famoso por Nemo. Vive en simbiosis con las anémonas. Agua salada con arrecife de coral.' },
    cirujano:  { nombre: 'Cirujano Paleta - Paracanthurus hepatus',    agua: 'Salada', temp: '24-27°C', ph: '8.1-8.4', tamaño: '31 cm', desc: 'Famoso por Dory. Pez muy activo y nadador. Necesita acuarios grandes con mucho espacio.' },
    tang:      { nombre: 'Tang Amarillo - Zebrasoma flavescens',       agua: 'Salada', temp: '24-28°C', ph: '8.1-8.4', tamaño: '20 cm', desc: 'Pez de arrecife muy popular por su color amarillo intenso. Come algas constantemente.' },
    siganus:   { nombre: 'Siganus Magnificus',                          agua: 'Salada',   temp: '24-27°C', ph: '8.1-8.4', tamaño: '24 cm', desc: 'Pez conejo magnífico con colores llamativos. Aletas con espinas venenosas, manejar con cuidado.' },
    leon:      { nombre: 'Pez León - Pterois volitans',                agua: 'Salada',   temp: '22-27°C', ph: '8.1-8.4', tamaño: '35 cm', desc: 'Pez de arrecife con aletas venenosas en forma de abanico. Depredador nocturno, muy llamativo. Solo para acuaristas experimentados.' },
    mandarin:  { nombre: 'Pez Mandarín - Synchiropus splendidus',      agua: 'Salada',   temp: '24-27°C', ph: '8.1-8.4', tamaño: '7 cm',  desc: 'Uno de los peces más coloridos del mundo. Se alimenta principalmente de copépodos vivos. Requiere acuario maduro con mucho vivo.' },
    angel_emp: { nombre: 'Ángel Emperatriz - Pomacanthus imperator',   agua: 'Salada',   temp: '24-27°C', ph: '8.1-8.4', tamaño: '40 cm', desc: 'Uno de los peces ángel más hermosos. Los juveniles tienen colores totalmente distintos a los adultos. Necesita acuarios muy grandes.' },
    chromis:   { nombre: 'Chromis Azul - Chromis viridis',             agua: 'Salada',   temp: '24-27°C', ph: '8.1-8.4', tamaño: '8 cm',  desc: 'Pez de cardumen muy activo y pacífico. Ideal para acuarios de arrecife. Su color verde azulado es muy atractivo bajo luz LED.' },
    gramma:    { nombre: 'Gramma Real - Gramma loreto',                agua: 'Salada',   temp: '23-27°C', ph: '8.1-8.4', tamaño: '8 cm',  desc: 'Pequeño pez con llamativa combinación de violeta y amarillo. Territorial con sus propios congéneres. Fácil de mantener.' },
    // Tropical
    betta:     { nombre: 'Betta - Betta splendens',                    agua: 'Tropical', temp: '24-30°C', ph: '6.0-8.0', tamaño: '7 cm',  desc: 'Conocido como pez luchador siamés. Sus aletas largas y colores vibrantes lo hacen único. Los machos deben mantenerse solos.' },
    disco:     { nombre: 'Disco - Symphysodon discus',                  agua: 'Tropical', temp: '28-32°C', ph: '5.5-7.0', tamaño: '20 cm', desc: 'El rey del acuario tropical. Requiere agua muy limpia y cálida. Muy sensible a cambios de parámetros. Para acuaristas avanzados.' },
    ramirezi:  { nombre: 'Ramirezi - Mikrogeophagus ramirezi',          agua: 'Tropical', temp: '26-30°C', ph: '5.0-7.0', tamaño: '7 cm',  desc: 'Cíclido enano de Venezuela. Colores azules y rojos espectaculares. Forma parejas estables y cuida sus huevos.' },
    cardenal:  { nombre: 'Tetra Cardenal - Paracheirodon axelrodi',    agua: 'Tropical', temp: '24-28°C', ph: '4.5-7.0', tamaño: '5 cm',  desc: 'Tetra con franja azul y rojo completo. Más llamativo que el Neón. Vive en grandes cardúmenes y prefiere agua blanda y ácida.' },
    oscar:     { nombre: 'Óscar - Astronotus ocellatus',               agua: 'Tropical', temp: '23-28°C', ph: '6.0-8.0', tamaño: '35 cm', desc: 'Gran cíclido sudamericano muy inteligente. Reconoce a su dueño y puede aprender trucos. Necesita acuario grande, mínimo 300 litros.' },
    arowana:      { nombre: 'Arowana - Osteoglossum bicirrhosum',           agua: 'Tropical', temp: '24-30°C', ph: '6.0-7.0', tamaño: '90 cm', desc: 'El dragón del acuario. Pez prehistórico de superficie, salta fuera del agua. Solo para acuarios muy grandes con tapa segura.' },
    apisto:       { nombre: 'Apistograma - Apistogramma cacatuoides',       agua: 'Tropical', temp: '24-29°C', ph: '5.5-7.0', tamaño: '8 cm',  desc: 'Cíclido enano con aletas dorsales en cresta de cacatúa. El macho es muy colorido, con amarillos y naranjas brillantes. Fácil de reproducir.' },
    congo:        { nombre: 'Tetra Congo - Phenacogrammus interruptus',     agua: 'Tropical', temp: '23-27°C', ph: '6.0-7.5', tamaño: '8 cm',  desc: 'Tetra africano con escamas iridiscentes azules, verdes y rojas. Los machos tienen aletas con filamentos. Impresionante en cardumen.' },
    gurami_enano: { nombre: 'Gurami Enano - Trichogaster lalius',           agua: 'Tropical', temp: '24-28°C', ph: '6.0-7.5', tamaño: '5 cm',  desc: 'Pez laberíntico muy colorido con rayas rojas y azules. Tranquilo y perfecto para acuarios comunitarios con plantas.' },
    serpae:       { nombre: 'Tetra Serpae - Hyphessobrycon eques',          agua: 'Tropical', temp: '22-27°C', ph: '5.5-7.5', tamaño: '4.5 cm',desc: 'Tetra de intenso color rojo con mancha negra en el hombro. Vive en cardúmenes, activo y resistente. Ideal para principiantes.' },
    geofago:      { nombre: 'Geófago - Geophagus brasiliensis',             agua: 'Tropical', temp: '20-28°C', ph: '6.0-8.0', tamaño: '28 cm', desc: 'Cíclido sudamericano que tamiza el sustrato buscando alimento. Coloración verde perlada muy llamativa. Tolera aguas más frescas.' },
    altum:        { nombre: 'Altum - Pterophyllum altum',                   agua: 'Tropical', temp: '28-32°C', ph: '4.5-6.5', tamaño: '25 cm', desc: 'El escalar más alto del mundo, originarrio del Orinoco. Requiere acuarios muy altos y agua muy blanda y ácida. Espectacular.' },
    arcoiris:     { nombre: 'Arcoiris - Melanotaenia boesemani',            agua: 'Tropical', temp: '24-28°C', ph: '7.0-8.0', tamaño: '11 cm', desc: 'Pez arcoiris con mitad delantera azul grisácea y mitad trasera amarillo-naranja. Activo nadador que luce mejor en cardumen.' },
    severo:       { nombre: 'Severo - Heros severus',                       agua: 'Tropical', temp: '24-29°C', ph: '5.5-7.0', tamaño: '20 cm', desc: 'Cíclido sudamericano de cuerpo alto con patrones verdes y amarillos. Forma parejas estables y cuida sus crías con dedicación.' },
    cory_panda:   { nombre: 'Corydora Panda - Corydoras panda',             agua: 'Tropical', temp: '22-26°C', ph: '6.0-7.5', tamaño: '4.5 cm', desc: 'Corydora de manchas negras sobre blanco como un oso panda. Vive en grupos, limpia el fondo y es completamente pacífico.' },
    // Caracoles
    mystery:    { nombre: 'Mystery Snail - Pomacea bridgesii',              agua: 'Dulce',    temp: '18-28°C', ph: '7.0-8.0', tamaño: '5 cm',   desc: 'Caracol muy popular por sus colores variados (amarillo, azul, marfil). Pacífico, limpia algas y restos. Compatible con la mayoría de peces.' },
    nerite:     { nombre: 'Nerite - Neritina natalensis',                   agua: 'Dulce/Salada', temp: '22-26°C', ph: '7.0-8.5', tamaño: '2.5 cm', desc: 'El mejor limpiador de algas del acuario. Tolera tanto agua dulce como salada. No se reproduce en agua dulce, ideal para controlar su población.' },
    ramshorn:   { nombre: 'Ramshorn - Planorbarius corneus',                agua: 'Dulce',    temp: '18-28°C', ph: '6.5-8.0', tamaño: '3 cm',   desc: 'Caracol con concha en espiral plana. Se reproduce fácilmente y sirve de alimento para peces como el Assassin Snail o el pez globo.' },
    manzana:    { nombre: 'Caracol Manzana - Pomacea canaliculata',         agua: 'Dulce',    temp: '18-28°C', ph: '6.5-8.0', tamaño: '8 cm',   desc: 'Gran caracol de concha dorada o marrón. Come plantas, por lo que no es recomendable en acuarios plantados. Activo y fácil de cuidar.' },
    assassin:   { nombre: 'Assassin Snail - Clea helena',                   agua: 'Dulce',    temp: '24-28°C', ph: '7.0-8.0', tamaño: '2.5 cm', desc: 'El asesino de caracoles. Se alimenta de otros caracoles plaga como el ramshorn y el Malaysian Trumpet. Concha rayada amarilla y marrón.' },
    // Axolotes
    axo_wild:   { nombre: 'Axolote Wild Type - Ambystoma mexicanum',        agua: 'Dulce Fría', temp: '14-18°C', ph: '7.0-8.0', tamaño: '25-30 cm', desc: '⚠️ Agua fría. Coloración natural oscura con manchas. Anfibio neotónico en peligro crítico de extinción. No debe compartir acuario con peces.' },
    axo_leuc:   { nombre: 'Axolote Leucístico - Ambystoma mexicanum',       agua: 'Dulce Fría', temp: '14-18°C', ph: '7.0-8.0', tamaño: '25-30 cm', desc: '⚠️ Agua fría. Cuerpo blanco con branquias rosadas. Es el más común en acuariofilia. Necesita un acuario amplio sin corriente fuerte.' },
    axo_albino: { nombre: 'Axolote Albino - Ambystoma mexicanum',           agua: 'Dulce Fría', temp: '14-18°C', ph: '7.0-8.0', tamaño: '25-30 cm', desc: '⚠️ Agua fría. Completamente blanco con ojos rojos. Muy sensible a la luz directa. Requiere zonas de sombra y agua bien oxigenada.' },
    axo_melan:  { nombre: 'Axolote Melanoid - Ambystoma mexicanum',         agua: 'Dulce Fría', temp: '14-18°C', ph: '7.0-8.0', tamaño: '25-30 cm', desc: '⚠️ Agua fría. Todo negro sin iridiscencia. Producen más melanina que el wild type. Son más difíciles de conseguir y muy llamativos.' },
    axo_dorado: { nombre: 'Axolote Dorado - Ambystoma mexicanum',           agua: 'Dulce Fría', temp: '14-18°C', ph: '7.0-8.0', tamaño: '25-30 cm', desc: '⚠️ Agua fría. Albino con pigmento amarillo dorado en la piel. Branquias naranjas muy vistosas. Una de las variedades más buscadas.' },
};

// =============================================
// PAGINACIÓN + FILTRO
// =============================================
const POR_PAGINA = 8;
let paginaActual = 1;
let tipoActual = 'todos';

const todasLasCards = Array.from(document.querySelectorAll('.pez-card'));

function cardsVisibles() {
    return todasLasCards.filter(c =>
        tipoActual === 'todos' || c.dataset.tipo === tipoActual
    );
}

function renderPagina() {
    const visibles = cardsVisibles();
    const totalPaginas = Math.ceil(visibles.length / POR_PAGINA);
    const inicio = (paginaActual - 1) * POR_PAGINA;
    const fin = inicio + POR_PAGINA;

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
        renderPagina();
    });
});

function resetFiltro() {
    document.querySelectorAll('.btn-outline[data-tipo]').forEach(c => c.classList.remove('active'));
    document.querySelector('.btn-outline[data-tipo="todos"]').classList.add('active');
    tipoActual = 'todos';
    paginaActual = 1;
    renderPagina();
}

// =============================================
// MODAL
// =============================================
function mostrarInfo(e, id) {
    e.preventDefault();
    const p = infoPeces[id];
    if (!p) return;
    document.getElementById('modalContenido').innerHTML = `
        <h2>${p.nombre}</h2>
        <div class="modal-tags">
            <span class="tag tag-${p.agua.toLowerCase().replace(/[^a-z]/g,'-')}">${
                p.agua === 'Dulce'        ? '💧 Agua Dulce' :
                p.agua === 'Salada'       ? '🌊 Agua Salada' :
                p.agua === 'Tropical'     ? '🌴 Tropical' :
                p.agua === 'Dulce Fría'   ? '❄️ Agua Dulce Fría' :
                p.agua === 'Dulce/Salada' ? '💧🌊 Dulce / Salada' :
                p.agua
            }</span>
        </div>
        <ul class="modal-datos">
            <li><strong>Temperatura:</strong> ${p.temp}</li>
            <li><strong>pH:</strong> ${p.ph}</li>
            <li><strong>Tamaño adulto:</strong> ${p.tamaño}</li>
        </ul>
        <p>${p.desc}</p>
    `;
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// Inicio
renderPagina();
