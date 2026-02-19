import { gameState } from "../state/gameState.js";

export function activateTechnology(techClass) {

    //Guardar en el estado 

    gameState.currentTechnology = techClass;

    // Cambiar el estado vusial

    document.querySelectorAll(".tech-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const selected = document.querySelector(`.tech-btn.${techClass}`);
    if (selected) {
        selected.classList.add("active");
    }
}
