// =============================================
// Utilidades compartidas por Tienda y Atlas
// =============================================

/**
 * Mezclamos el array de forma aleatoria.
 * @param {Array} arr
 * @returns {Array} 
 */
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
