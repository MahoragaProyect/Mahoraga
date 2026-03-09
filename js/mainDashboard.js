import { activateTechnology } from "./ui/dashboardRenderer.js";
import { requireLoggedInUser } from "./services/sessionService.js";
import { initThemeManager } from "./ui/themeManager.js";
import { renderRoadmap } from "./ui/roadmapRenderer.js";
import { initDashboardViewManager, resetDetailPanel } from "./ui/viewManager.js";
import { gameState } from "./state/gameState.js";
import { initPhotoProfile } from "./data/profile/modalProfile.js";
import { initDashboardIdentity } from "./ui/userIdentity.js";

function initRoadmapDrag() {
  const container = document.querySelector(".roadmap-container");

  if (!container) {
    return;
  }

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let scrollTop = 0;

  container.addEventListener("mousedown", (event) => {
    isDragging = true;
    container.classList.add("active");
    startX = event.pageX - container.offsetLeft;
    startY = event.pageY - container.offsetTop;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
  });

  ["mouseleave", "mouseup"].forEach((eventName) => {
    container.addEventListener(eventName, () => {
      isDragging = false;
      container.classList.remove("active");
    });
  });

  container.addEventListener("mousemove", (event) => {
    if (!isDragging) {
      return;
    }

    event.preventDefault();

    const currentX = event.pageX - container.offsetLeft;
    const currentY = event.pageY - container.offsetTop;
    const walkX = currentX - startX;
    const walkY = currentY - startY;

    container.scrollLeft = scrollLeft - walkX;
    container.scrollTop = scrollTop - walkY;
  });
}

function initTechnologySelector() {
  const technologyButtons = document.querySelectorAll(".tech-btn");

  technologyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const technology = button.dataset.tech;

      if (!technology) {
        return;
      }

      activateTechnology(technology);
      resetDetailPanel();
      renderRoadmap();

      console.log("Tecnologia actual:", gameState.currentTechnology);
    });
  });

  const initialTechnology =
    document.querySelector(".tech-btn.python")?.dataset.tech ||
    technologyButtons[0]?.dataset.tech;

  if (initialTechnology) {
    activateTechnology(initialTechnology);
    renderRoadmap();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const user = requireLoggedInUser("../index.html");

  if (!user) {
    return;
  }

  initRoadmapDrag();
  initDashboardIdentity();
  initPhotoProfile();
  initDashboardViewManager();
  initThemeManager();
  initTechnologySelector();
});
import { renderRoadmap } from "./ui/roadmapRenderer.js";
import { gameState } from "./state/gameState.js";
import { initPhotoProfile } from "./data/profile/modalProfile.js";

const container = document.querySelector(".roadmap-container");

let isDragging = false;
let startX, startY;
let scrollLeft, scrollTop;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  container.classList.add("active");

  startX = e.pageX - container.offsetLeft;
  startY = e.pageY - container.offsetTop;

  scrollLeft = container.scrollLeft;
  scrollTop = container.scrollTop;
});

container.addEventListener("mouseleave", () =>  {
  isDragging = false;
});

container.addEventListener("mouseup", () => {
  isDragging = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  e.preventDefault();

  const x = e.pageX - container.offsetLeft;
  const y = e.pageY - container.offsettop;

  const walkX = (x - startX);
  const walkY = (y - startY);

  container.scrollLeft = scrollLeft - walkX;
  container.scrollTop = scrollTop - walkY;

});

document.addEventListener("DOMContentLoaded", () => {

    // Inicializar módulo de foto de perfil
    initPhotoProfile();

    const pythonBtn = document.querySelector(".tech-btn.python");

    if (pythonBtn) {
        pythonBtn.addEventListener("click", () => {
            activateTechnology("python");
            renderRoadmap();

            console.log("Tecnologia actual: ", gameState.currentTechnology);
        });
    }

});

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.querySelector(".modalProfile");
  const openBtn = document.querySelector(".user-section");
  const closeBtn = document.querySelector(".exitLogo");

  if (!modal || !openBtn) return;

  // Crear fondo oscuro
  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");
  document.body.appendChild(backdrop);

  function openModal() {
    modal.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Abrir modal al hacer click en el botón
  openBtn.addEventListener("click", openModal);

  // Cerrar con la X
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Cerrar al hacer click fuera
  backdrop.addEventListener("click", closeModal);

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

});
