// =============================================
// CARRITO
// =============================================

// Renderizar carrito desde localStorage
function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemsEl = document.getElementById('carritoItems');
    const vacioEl = document.getElementById('carritoVacio');
    const layoutEl = document.querySelector('.carrito-layout');

    if (carrito.length === 0) {
        layoutEl.style.display = 'none';
        vacioEl.style.display = 'flex';
        return;
    }

    itemsEl.innerHTML = '';
    let subtotal = 0;

    carrito.forEach((item, index) => {
        subtotal += item.precio * item.cantidad;
        itemsEl.innerHTML += `
            <div class="carrito-item">
                <div class="carrito-item-img">
                    ${item.imagen
                        ? `<img src="${item.imagen}" alt="${item.nombre}">`
                        : `<i class="fa-solid fa-fish"></i>`
                    }
                </div>
                <div class="item-info">
                    <p class="item-nombre">${item.nombre}</p>
                    <p class="item-precio-unit">$${item.precio.toFixed(2)} c/u</p>
                </div>
                <div class="item-controles">
                    <button class="cant-btn" onclick="cambiarCantidadCarrito(${index}, -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button class="cant-btn" onclick="cambiarCantidadCarrito(${index}, 1)">+</button>
                </div>
                <p class="item-total">$${(item.precio * item.cantidad).toFixed(2)}</p>
                <button class="btn-eliminar" onclick="eliminarItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
    actualizarContadorCarrito();
}

// =============================================
// MODIFICAR Y ELIMINAR ITEMS
// =============================================
function cambiarCantidadCarrito(index, delta) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

function eliminarItem(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

// =============================================
// FINALIZAR COMPRA
// =============================================
document.getElementById('btnFinalizar').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

renderCarrito();
