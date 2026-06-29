// ── Credenciales (contraseña almacenada como hash SHA-256) ──
const CREDENCIALES = {
    usuario:      'admin',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
};

// Si ya está logueado, redirigir directo al admin
if (sessionStorage.getItem('prAdmin') === '1') {
    window.location.href = 'admin/index.html';
}

async function hashSHA256(texto) {
    const data       = new TextEncoder().encode(texto);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario  = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    const btn      = document.getElementById('btnLogin');
    const errorMsg = document.getElementById('errorMsg');

    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span> Verificando...';
    errorMsg.classList.remove('show');

    const hashIngresado = await hashSHA256(password);

    setTimeout(() => {
        if (usuario === CREDENCIALES.usuario && hashIngresado === CREDENCIALES.passwordHash) {
            sessionStorage.setItem('prAdmin', '1');
            window.location.href = 'admin/index.html';
        } else {
            errorMsg.classList.add('show');
            const card = document.querySelector('.login-card');
            card.classList.remove('shake');
            void card.offsetWidth;
            card.classList.add('shake');

            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Iniciar sesión';
        }
    }, 600);
});

function togglePass() {
    const input = document.getElementById('password');
    const icon  = document.getElementById('eyeIcon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-solid fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fa-solid fa-eye';
    }
}
