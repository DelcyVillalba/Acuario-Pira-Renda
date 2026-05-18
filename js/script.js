// =============================================
// VIDEO HERO INDEX
// =============================================
const video = document.getElementById("video");
if (video) {
  video.play().catch(() => {
    console.log("Autoplay bloqueado, esperando interacción.");
  });
}

// =============================================
// MENÚ HAMBURGUESA
// =============================================
const menuBtn = document.getElementById("mobile-menu");
const navContainer = document.querySelector(".nav-container");

if (menuBtn && navContainer) {
  const menuIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    if (navContainer.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    } else {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });

  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("active");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    });
  });
}

// =============================================
// WIDGET DE CHAT FLOTANTE
// =============================================
function toggleChat() {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;
  chatBox.classList.toggle("open");
}

function enviarMensaje(event) {
  // Si se llama desde onkeydown, solo actuar en Enter
  if (event && event.type === "keydown" && event.key !== "Enter") return;

  const input = document.getElementById("chatInput");
  if (!input || !input.value.trim()) return;

  const area = document.querySelector(".chat-bubble-area");
  if (!area) return;

  // Mensaje del usuario
  const msgUser = document.createElement("div");
  msgUser.className = "chat-msg user";
  msgUser.textContent = input.value.trim();
  area.appendChild(msgUser);

  input.value = "";
  area.scrollTop = area.scrollHeight;

  // Respuesta automática después de 1s
  setTimeout(() => {
    const msgBot = document.createElement("div");
    msgBot.className = "chat-msg bot";
    msgBot.textContent =
      "Gracias por tu mensaje. Te responderemos a la brevedad 🐠";
    area.appendChild(msgBot);
    area.scrollTop = area.scrollHeight;
  }, 1000);
}

// =============================================
// DROPDOWN NAVBAR — con JS para evitar que se cierre en el gap
// =============================================
document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
  let closeTimer = null;

  const open = () => {
    clearTimeout(closeTimer);
    dropdown.classList.add("open");
  };

  const scheduleClose = () => {
    closeTimer = setTimeout(() => {
      dropdown.classList.remove("open");
    }, 150); // pequeño delay para cruzar el gap
  };

  dropdown.addEventListener("mouseenter", open);
  dropdown.addEventListener("mouseleave", scheduleClose);

  // Click para móvil
  dropdown.querySelector(".dropdown-toggle").addEventListener("click", (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      dropdown.classList.toggle("open");
    }
  });

  // Cerrar al hacer click en un enlace del menú
  dropdown.querySelectorAll(".dropdown-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      dropdown.classList.remove("open");
    });
  });
});

// Cerrar dropdown al hacer click fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-dropdown")) {
    document
      .querySelectorAll(".nav-dropdown")
      .forEach((d) => d.classList.remove("open"));
  }
});