let datosEnvio   = {};
let metodoPago   = 'tarjeta';
let carritoItems = [];
let numeroPedido = '';
let pasoActual   = 1;
const IVA = 0.21;

document.addEventListener('DOMContentLoaded', () => {
    carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carritoItems.length === 0) {
        window.location.href = 'carrito.html';
        return;
    }
    renderResumenLateral();
    actualizarContadorCarrito();
    iniciarFormulario();
    iniciarMetodosPago();
    iniciarTarjetaVisual();
});

function calcularTotales() {
    const subtotal = carritoItems.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const iva      = subtotal * IVA;
    const total    = subtotal + iva;
    return { subtotal, iva, total };
}

function renderResumenLateral() {
    const container = document.getElementById('resumenItems');
    container.innerHTML = carritoItems.map(item => `
        <div class="resumen-item">
            <div class="resumen-item-img">
                ${item.imagen
                    ? `<img src="${item.imagen}" alt="${item.nombre}" onerror="this.parentElement.innerHTML='<i class=\\'fa-solid fa-fish\\'></i>'">`
                    : `<i class="fa-solid fa-fish"></i>`}
            </div>
            <div class="resumen-item-info">
                <p>${item.nombre}</p>
                <small>Cant: ${item.cantidad}</small>
            </div>
            <span class="resumen-item-precio">$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
    `).join('');

    const { subtotal, iva, total } = calcularTotales();
    document.getElementById('resSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('resIva').textContent      = `$${iva.toFixed(2)}`;
    document.getElementById('resTotal').textContent    = `$${total.toFixed(2)}`;
}

function irPaso(n) {
    document.getElementById(`paso${pasoActual}`).classList.remove('active');
    actualizarStepper(n);
    pasoActual = n;
    document.getElementById(`paso${pasoActual}`).classList.add('active');
    document.getElementById('checkoutResumen').style.display = n === 3 ? 'none' : '';
    document.querySelector('.checkout-layout').classList.toggle('layout-confirmacion', n === 3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function actualizarStepper(dest) {
    for (let i = 1; i <= 3; i++) {
        const dot = document.getElementById(`sdot${i}`);
        dot.classList.remove('active', 'done');
        if (i < dest)  dot.classList.add('done');
        if (i === dest) dot.classList.add('active');
    }
    for (let i = 1; i <= 2; i++) {
        document.getElementById(`sline${i}`).classList.toggle('done', i < dest);
    }
}

function iniciarFormulario() {
    document.getElementById('formEnvio').addEventListener('submit', (e) => {
        e.preventDefault();

        let valido = true;
        ['nombre', 'email', 'provincia', 'direccion', 'cp'].forEach(id => {
            const el = document.getElementById(id);
            if (!el.value.trim()) {
                el.classList.add('field-error');
                valido = false;
            } else {
                el.classList.remove('field-error');
            }
        });

        if (!valido) return;

        const email = document.getElementById('email').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email').classList.add('field-error');
            return;
        }

        datosEnvio = {
            nombre:    document.getElementById('nombre').value.trim(),
            email,
            telefono:  document.getElementById('telefono').value.trim(),
            provincia: document.getElementById('provincia').value,
            direccion: document.getElementById('direccion').value.trim(),
            cp:        document.getElementById('cp').value.trim(),
            notas:     document.getElementById('notas').value.trim(),
        };

        irPaso(2);
    });

    ['nombre', 'email', 'provincia', 'direccion', 'cp'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            document.getElementById(id).classList.remove('field-error');
        });
    });
}

function iniciarMetodosPago() {
    document.querySelectorAll('.metodo-card').forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        card.addEventListener('click', () => {
            document.querySelectorAll('.metodo-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            radio.checked = true;
            metodoPago = radio.value;

            document.getElementById('panelTarjeta').style.display  = metodoPago === 'tarjeta'       ? '' : 'none';
            document.getElementById('panelMercado').style.display  = metodoPago === 'mercadopago'   ? '' : 'none';
            document.getElementById('panelTransfer').style.display = metodoPago === 'transferencia' ? '' : 'none';
        });
    });
}

function iniciarTarjetaVisual() {
    document.getElementById('tNumero').addEventListener('input', function () {
        let val = this.value.replace(/\D/g, '').slice(0, 16);
        this.value = val.replace(/(.{4})/g, '$1 ').trim();
        document.getElementById('tvNumero').textContent =
            val.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim();
    });

    document.getElementById('tTitular').addEventListener('input', function () {
        const val = this.value.toUpperCase().slice(0, 26);
        document.getElementById('tvTitular').textContent = val || 'NOMBRE APELLIDO';
    });

    document.getElementById('tVence').addEventListener('input', function () {
        let val = this.value.replace(/\D/g, '').slice(0, 4);
        if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
        this.value = val;
        document.getElementById('tvVence').textContent = val || 'MM/AA';
    });
}

function simularPago() {
    const btn = document.getElementById('btnPagar');
    btn.disabled = true;

    const overlay = document.createElement('div');
    overlay.className = 'procesando-overlay';
    overlay.innerHTML = `<div class="spinner"></div><p>Procesando pago...</p>`;
    document.body.appendChild(overlay);

    setTimeout(() => {
        document.body.removeChild(overlay);
        btn.disabled = false;

        numeroPedido = 'PR-' + Date.now().toString(36).toUpperCase().slice(-6);
        document.getElementById('numeroPedido').textContent = numeroPedido;

        renderConfirmacion();
        localStorage.removeItem('carrito');
        actualizarContadorCarrito();
        irPaso(3);
    }, 2200);
}

function renderConfirmacion() {
    const { subtotal, iva, total } = calcularTotales();

    const filas = carritoItems.map(item => `
        <div class="confirm-resumen-item">
            <span>${item.nombre} × ${item.cantidad}</span>
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
    `).join('');

    const totales = `
        <div class="confirm-resumen-item confirm-iva">
            <span>Subtotal (sin IVA)</span><span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="confirm-resumen-item confirm-iva">
            <span>IVA (21%)</span><span>$${iva.toFixed(2)}</span>
        </div>
        <div class="confirm-resumen-item confirm-total">
            <span>Total (c/ IVA)</span><span>$${total.toFixed(2)}</span>
        </div>
    `;

    document.getElementById('confirmResumen').innerHTML = filas + totales;
}

function descargarRecibo() {
    const { subtotal, iva, total } = calcularTotales();

    document.getElementById('rNroPedido').textContent = numeroPedido;
    document.getElementById('rFecha').textContent     = new Date().toLocaleDateString('es-AR', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
    document.getElementById('rNombre').textContent    = datosEnvio.nombre;
    document.getElementById('rEmail').textContent     = datosEnvio.email;
    document.getElementById('rTelefono').textContent  = datosEnvio.telefono || '—';
    document.getElementById('rProvincia').textContent = datosEnvio.provincia;
    document.getElementById('rDireccion').textContent = `${datosEnvio.direccion}, CP ${datosEnvio.cp}`;
    document.getElementById('rCp').textContent        = datosEnvio.cp;
    document.getElementById('rNotas').textContent     = datosEnvio.notas || '—';

    const metodoLabel = {
        tarjeta: 'Tarjeta de crédito / débito',
        mercadopago: 'MercadoPago',
        transferencia: 'Transferencia bancaria',
    };
    document.getElementById('rMetodo').textContent = metodoLabel[metodoPago] || metodoPago;

    document.getElementById('rItems').innerHTML = carritoItems.map(item => `
        <tr>
            <td>${item.nombre}</td>
            <td style="text-align:center">${item.cantidad}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
        </tr>
    `).join('');

    document.getElementById('rSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('rIva').textContent      = `$${iva.toFixed(2)}`;
    document.getElementById('rTotal').textContent    = `$${total.toFixed(2)}`;

    const tituloOriginal = document.title;
    document.title = `Comprobante-${numeroPedido}`;
    window.print();
    setTimeout(() => { document.title = tituloOriginal; }, 1000);
}
