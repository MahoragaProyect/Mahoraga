import { activateTechnology } from "./ui/dashboardRenderer.js";
import { renderRoadmap } from "./ui/roadmapRenderer.js";
import { gameState } from "./state/gameState.js";

document.addEventListener("DOMContentLoaded", () => {

    const pythonBtn = document.querySelector(".tech-btn.python");

    pythonBtn.addEventListener("click", () => {
        activateTechnology("python");
        renderRoadmap();

        console.log("Tecnologia actual: ", gameState.currentTechnology);
    });

});
