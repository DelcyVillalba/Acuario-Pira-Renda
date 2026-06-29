// =============================================
// VIDEO HERO INDEX
// =============================================
const video = document.getElementById("video");
if (video) {
  video.play().catch(() => {});
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

  document.addEventListener("click", (e) => {
    if (navContainer.classList.contains("active") &&
        !navContainer.contains(e.target) &&
        !menuBtn.contains(e.target)) {
      navContainer.classList.remove("active");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
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
// DROPDOWN NAVBAR
// =============================================
document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = dropdown.classList.contains("open");
    // Cerrar cualquier otro dropdown abierto
    document.querySelectorAll(".nav-dropdown.open").forEach((d) => d.classList.remove("open"));
    if (!isOpen) dropdown.classList.add("open");
  });

  // Cerrar al navegar a un ítem del menú
  dropdown.querySelectorAll(".dropdown-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      dropdown.classList.remove("open");
    });
  });
});

// Cerrar al hacer click fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-dropdown")) {
    document.querySelectorAll(".nav-dropdown").forEach((d) => d.classList.remove("open"));
  }
});