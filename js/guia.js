// =============================================
// GUÍA — FAQ acordeón y pestañas
// =============================================
function toggleFaq(btn) {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

document.querySelectorAll('.faq-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.faq-list').forEach(l => l.classList.add('hidden'));
        tab.classList.add('active');
        document.getElementById('faq' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1)).classList.remove('hidden');
    });
});
