// =============================================
// VALIDACIÓN FORMULARIO DE CONTACTO
// =============================================

const form = document.getElementById("contactForm");
if (form) {

  // Solo permitir números, +, -, espacios en teléfono
  const telInput = document.getElementById("telefono");
  if (telInput) {
    telInput.addEventListener("keydown", (e) => {
      const allowed = ["Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End"];
      if (allowed.includes(e.key)) return;
      if (!/^[\d\s\+\-]$/.test(e.key)) e.preventDefault();
    });
    telInput.addEventListener("input", () => {
      telInput.value = telInput.value.replace(/[^\d\s\+\-]/g, "");
    });
  }

  // Mostrar error bajo un campo
  function setError(input, msg) {
    clearError(input);
    input.classList.add("campo-error");
    const err = document.createElement("span");
    err.className = "campo-error-msg";
    err.textContent = msg;
    input.parentNode.appendChild(err);
  }

  function clearError(input) {
    input.classList.remove("campo-error");
    const prev = input.parentNode.querySelector(".campo-error-msg");
    if (prev) prev.remove();
  }

  form.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", () => clearError(el));
  });

  // Validar al enviar
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    const nombre  = document.getElementById("nombre");
    const email   = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const mensaje = document.getElementById("mensaje");

    // Nombre
    if (!nombre.value.trim()) {
      setError(nombre, "El nombre es obligatorio.");
      valido = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      setError(email, "El email es obligatorio.");
      valido = false;
    } else if (!emailRegex.test(email.value.trim())) {
      setError(email, "Ingresá un email válido (ej: nombre@dominio.com).");
      valido = false;
    }

    if (telefono.value.trim() && telefono.value.replace(/[\s\+\-]/g, "").length < 6) {
      setError(telefono, "El teléfono parece muy corto.");
      valido = false;
    }

    // Mensaje
    if (!mensaje.value.trim()) {
      setError(mensaje, "El mensaje es obligatorio.");
      valido = false;
    } else if (mensaje.value.trim().length < 10) {
      setError(mensaje, "El mensaje debe tener al menos 10 caracteres.");
      valido = false;
    }

    if (!valido) return;

    // Enviar a Formspree
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          form.reset();
          const ok = document.getElementById("formSuccess");
          if (ok) { ok.style.display = "block"; setTimeout(() => ok.style.display = "none", 5000); }
        } else {
          alert("Hubo un error al enviar. Por favor intentá de nuevo.");
        }
      })
      .catch(() => alert("Sin conexión. Revisá tu internet e intentá de nuevo."));
  });
}
