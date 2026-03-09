import { pythonMap } from "../data/maps/pythonMap.js";
import { htmlMap } from "../data/maps/htmlMap.js";
import { cssMap } from "../data/maps/cssMap.js";
import { javascriptMap } from "../data/maps/javaScriptMap.js";
import { sqlMap } from "../data/maps/sqlMap.js";
import { gameState } from "../state/gameState.js";
import { openDetailPanel, syncTechnologyProgress } from "./viewManager.js";

export function getCurrentMap() {
  switch (gameState.currentTechnology) {
    case "python":
      return pythonMap;
    case "html":
      return htmlMap;
    case "css":
      return cssMap;
    case "javascript":
      return javascriptMap;
    case "sql":
      return sqlMap;
    default:
      return [];
  }
}

export function renderRoadmap() {
  const layer = document.querySelector(".nodes-layer");
  const svg = document.querySelector(".connections");
  const world = document.querySelector(".roadmap-world");

  if (!layer || !svg || !world) {
    return;
  }

  layer.innerHTML = "";
  svg.innerHTML = "";

  const currentMap = getCurrentMap();

  if (!currentMap.length) {
    syncTechnologyProgress(0);
    return;
  }

  const maxX = Math.max(...currentMap.map((node) => node.x)) + 260;
  const maxY = Math.max(...currentMap.map((node) => node.y)) + 240;
  const techProgress = gameState.progress[gameState.currentTechnology] || [];

  world.style.width = `${maxX}px`;
  world.style.height = `${Math.max(maxY, window.innerHeight)}px`;
  layer.style.width = `${maxX}px`;
  layer.style.height = `${maxY}px`;
  svg.setAttribute("width", `${maxX}`);
  svg.setAttribute("height", `${maxY}`);

  currentMap.forEach((nodeData) => {
    const node = document.createElement("button");
    node.type = "button";
    node.classList.add("node");
    node.style.left = `${nodeData.x}px`;
    node.style.top = `${nodeData.y}px`;
    node.textContent = nodeData.title;
    node.style.borderColor = getNodeColor(nodeData.difficulty);

    const isCompleted = techProgress.includes(nodeData.id);
    const isAvailable =
      !nodeData.requires || techProgress.includes(nodeData.requires);

    if (isCompleted) {
      node.classList.add("completed");
    } else if (isAvailable) {
      node.classList.add("available");
    } else {
      node.classList.add("locked");
      node.disabled = true;
    }

    node.addEventListener("click", () => {
      openDetailPanel(nodeData, currentMap);
    });

    layer.appendChild(node);
    drawConnection(svg, nodeData, currentMap, techProgress);
  });

  syncTechnologyProgress(Math.round((techProgress.length / currentMap.length) * 100));
}

function drawConnection(svg, nodeData, currentMap, techProgress) {
  if (!nodeData.requires) {
    return;
  }

  const previousNode = currentMap.find((node) => node.id === nodeData.requires);

  if (!previousNode) {
    return;
  }

  const offset = 45;
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", `${previousNode.x + offset}`);
  line.setAttribute("y1", `${previousNode.y + offset}`);
  line.setAttribute("x2", `${nodeData.x + offset}`);
  line.setAttribute("y2", `${nodeData.y + offset}`);
  line.setAttribute("stroke-width", "3");
  line.setAttribute("stroke", techProgress.includes(previousNode.id) ? "#2ecc71" : "#444");

  svg.appendChild(line);

function getCurrentMap() {
    switch (gameState.currentTechnology) {
        case "python":
            return pythonMap;
        case "html":
            return htmlMap;
        case "css":
            return cssMap;
        case "javascript":
            return javascriptMap;
        case "sql":
            return sqlMap;
        default:
            return [];
    }
}

export function renderRoadmap() {

    const layer = document.querySelector(".nodes-layer");
    const svg = document.querySelector(".connections");

    layer.innerHTML = "";
    svg.innerHTML = "";

    const currentMap = getCurrentMap();
    console.log("Mapa Actual:", gameState.currentTechnology);

    if (!currentMap.length) return;

    const maxX = Math.max(...currentMap.map(n => n.x)) + 200;
    const maxY = Math.max(...currentMap.map(n => n.y)) + 200;

    layer.style.width = maxX + "px";
    layer.style.height = maxY + "px";

    svg.setAttribute("width", maxX);
    svg.setAttribute("height", maxY);

    currentMap.forEach(nodeData => {

        const node = document.createElement("div");
        node.classList.add("node");

        node.style.left = nodeData.x + "px";
        node.style.top = nodeData.y + "px";
        node.textContent = nodeData.title;

        node.style.borderColor = getNodeColor(nodeData.difficulty);

        const techProgress =
          gameState.progress[gameState.currentTechnology];

        const completed = techProgress.includes(nodeData.id);

        if (!nodeData.requires) {
            node.classList.add("available");
        } 
        else if (techProgress.includes(nodeData.requires)) {
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

        drawConnection(svg, nodeData, currentMap, techProgress);

    });
}

function drawConnection(svg, nodeData, currentMap, techProgress) {

    if (!nodeData.requires) return;

    const prev = currentMap.find(n => n.id === nodeData.requires);
    if (!prev) return;

    const offset = 45;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", prev.x + offset);
    line.setAttribute("y1", prev.y + offset);
    line.setAttribute("x2", nodeData.x + offset);
    line.setAttribute("y2", nodeData.y + offset);

    line.setAttribute("stroke-width", "3");

    if (techProgress.includes(prev.id)) {
        line.setAttribute("stroke", "#2ecc71");
    } else {
        line.setAttribute("stroke", "#444");
    }

    svg.appendChild(line);
}

function getNodeColor(difficulty) {
  switch (difficulty) {
    case "basic":
      return "#4CAF50";
    case "intermediate":
      return "#FFC107";
    case "advanced":
      return "#F44336";
    default:
      return "#999999";
  }
}
