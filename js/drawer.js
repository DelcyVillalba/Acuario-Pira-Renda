// =============================================
// CONTADOR CARRITO (en todas las páginas)
// =============================================
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document
    .querySelectorAll("#cart-count")
    .forEach((el) => (el.textContent = total));
}
actualizarContadorCarrito();

// =============================================
// DRAWER DEL CARRITO (modal lateral)
// =============================================
function abrirDrawerCarrito(e) {
  if (e) e.preventDefault();

  // Crear drawer si no existe
  if (!document.getElementById("carritoDrawer")) {
    crearDrawerHTML();
  }

  renderDrawer();

  document.getElementById("carritoDrawer").classList.add("open");
  document.getElementById("carritoOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarDrawerCarrito() {
  const drawer = document.getElementById("carritoDrawer");
  const overlay = document.getElementById("carritoOverlay");
  if (drawer) drawer.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function crearDrawerHTML() {
  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "carritoOverlay";
  overlay.className = "carrito-overlay";
  overlay.onclick = cerrarDrawerCarrito;
  document.body.appendChild(overlay);

  // Drawer
  const drawer = document.createElement("div");
  drawer.id = "carritoDrawer";
  drawer.className = "carrito-drawer";
  drawer.innerHTML = `
        <div class="drawer-header">
            <h2>Carrito <span id="drawerCount">(0 items)</span></h2>
            <button class="drawer-close" onclick="cerrarDrawerCarrito()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="drawer-items" id="drawerItems"></div>
        <div class="drawer-footer">
            <div class="drawer-promo">
                <i class="fa-solid fa-tag"></i>
                <span>Ingresar código de promoción</span>
            </div>
            <div class="drawer-total">
                <span>Total estimado</span>
                <strong id="drawerTotal">$0.00</strong>
            </div>
            <button class="drawer-btn-finalizar" onclick="finalizarCompra()">Finalizar compra</button>
            <a href="/carrito.html" class="drawer-btn-vercarrito" onclick="cerrarDrawerCarrito()">Ver carrito</a>
        </div>
    `;
  document.body.appendChild(drawer);
}

function renderDrawer() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const itemsEl = document.getElementById("drawerItems");
  const countEl = document.getElementById("drawerCount");
  const totalEl = document.getElementById("drawerTotal");

  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);
  countEl.textContent = `(${totalItems} ${totalItems === 1 ? "item" : "items"})`;

  if (carrito.length === 0) {
    itemsEl.innerHTML = `
            <div class="drawer-vacio">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Tu carrito está vacío.</p>
            </div>`;
    totalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;
  itemsEl.innerHTML = "";

  carrito.forEach((item, index) => {
    subtotal += item.precio * item.cantidad;
    const div = document.createElement("div");
    div.className = "drawer-item";
    div.innerHTML = `
            <div class="drawer-item-img">
                ${
                  item.imagen
                    ? `<img src="${item.imagen}" alt="${item.nombre}">`
                    : `<i class="fa-solid fa-fish"></i>`
                }
            </div>
            <div class="drawer-item-info">
                <p class="drawer-item-nombre">${item.nombre}</p>
                <p class="drawer-item-precio">$${item.precio.toFixed(2)}</p>
                <div class="drawer-item-cant">
                    <button onclick="cambiarCantDrawer(${index}, -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantDrawer(${index}, 1)">+</button>
                </div>
            </div>
            <div class="drawer-item-right">
                <button class="drawer-item-delete" onclick="eliminarDrawer(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <p class="drawer-item-total">$${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
        `;
    itemsEl.appendChild(div);
  });

  totalEl.textContent = `$${subtotal.toFixed(2)}`;
}

function cambiarCantDrawer(index, delta) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito[index].cantidad += delta;
  if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderDrawer();
}

function eliminarDrawer(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderDrawer();
}

function finalizarCompra() {
  cerrarDrawerCarrito();
  setTimeout(() => {
    alert(
      "🚧 Pasarela de pago en construcción.\n¡Gracias por tu interés! Pronto podrás completar tu compra.",
    );
  }, 200);
}

// Interceptar clicks en .cart-link para abrir drawer en lugar de navegar
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cart-link").forEach((link) => {
    // Solo en páginas que no son carrito.html
    if (!window.location.pathname.includes("carrito.html")) {
      link.addEventListener("click", abrirDrawerCarrito);
    }
  });
});