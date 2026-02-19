import { pythonMap } from "../data/maps/pythonMap.js";
import { htmlMap } from "../data/maps/htmlMap.js";
import { cssMap } from "../data/maps/cssMap.js";
import { javascriptMap } from "../data/maps/javaScriptMap.js";
import { gameState } from "../state/gameState.js";

function getCurrentMap() {

    console.log("Mapa actual", gameState.currentTechnology);
    switch (gameState.currentTechnology) {
        case "python":
            return pythonMap;
        case "html":
            return htmlMap;
        case "css":
            return cssMap;
        case "javascript":
            return javascriptMap;
        default:
            return [];
    }
}

export function renderRoadmap() {

    const layer = document.querySelector(".nodes-layer");
    const svg = document.querySelector(".connections");

    layer.innerHTML = "";
    svg.innerHTML = "";

    pythonMap.forEach(nodeData => {

        const node = document.createElement("div");
        node.classList.add("node");

        node.style.left = nodeData.x + "px";
        node.style.top = nodeData.y + "px";

        node.textContent = nodeData.title;

        const completed = gameState.completedNodes.includes(nodeData.id);

        if (!nodeData.requires) {
            node.classList.add("available");
        } 
        else if (gameState.completedNodes.includes(nodeData.requires)) {
            node.classList.add("available");
        } 
        else {
            node.classList.add("locked");
        }

        if (completed) {
            node.classList.remove("available");
            node.classList.add("completed");
        }

        node.addEventListener("click", () => {

            if (node.classList.contains("locked")) return;

            console.log("Nodo seleccionado:", nodeData.id);
        });

        layer.appendChild(node);

        drawConnection(svg, nodeData);

    });

}

function drawConnection(svg, nodeData) {

    if (!nodeData.requires) return;

    const prev = pythonMap.find(n => n.id === nodeData.requires);

    const offset = 45;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", prev.x + offset);
    line.setAttribute("y1", prev.y + offset);
    line.setAttribute("x2", nodeData.x + offset);
    line.setAttribute("y2", nodeData.y + offset);

    line.setAttribute("stroke-width", "3");

    /* ========= AQUI VA LO NUEVO ========= */

    if (gameState.completedNodes.includes(prev.id)) {
        line.setAttribute("stroke", "#2ecc71");
    } else {
        line.setAttribute("stroke", "#444");
    }

    /* ===================================== */

    svg.appendChild(line);
}


