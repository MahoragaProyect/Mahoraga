// ===================================== 
// INTERVIEW CHAT SYSTEM
// ===================================== 

let currentTechonology = null;

function initInterviewMode() {
  const interviewBtn = document.querySelector(".interview-btn");
  const chatWorld = document.getElementById("chatWorld");
  const roadmapWorld = document.getElementById("roadmapWorld");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatMessages = document.getElementById("chatMessages");

  if (!interviewBtn || !chatWorld || !roadmapWorld) return;

  // Abrir modo interview
  interviewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openInterviewMode();
  });

  // Cerrar modo interview
  closeChatBtn.addEventListener("click", () => {
    closeInterviewMode();
  });

  // Enviar mensaje con botón
  chatSendBtn.addEventListener("click", () => {
    sendMessage();
  });

  // Enviar mensaje con Enter
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function openInterviewMode() {
    // Cerrar el detail panel
    const detailPanel = document.querySelector(".detail-panel");
    if (detailPanel) {
      detailPanel.classList.remove("active");
    }

    // Mostrar y animar el chat
    roadmapWorld.style.display = "none";
    chatWorld.style.display = "flex";
    chatWorld.classList.remove("closing");
    chatWorld.classList.add("entering");
    
    chatMessages.innerHTML = ""; // Limpiar mensajes previos
    
    // Mensaje inicial del bot
    addBotMessage(
      "Hello! I'm ready to help you practice. Let's start with a question about the selected topic."
    );
    
    chatInput.focus();
  }

  function closeInterviewMode() {
    chatWorld.classList.add("closing");
    
    // Esperar a que termine la animación
    setTimeout(() => {
      roadmapWorld.style.display = "block";
      chatWorld.style.display = "none";
      chatWorld.classList.remove("closing", "entering");
    }, 300);
  }

  function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;

    // Agregar mensaje del usuario
    addUserMessage(message);
    chatInput.value = "";

    // Simular respuesta del bot después de un pequeño delay
    setTimeout(() => {
      // Por ahora, respuestas genéricas
      const responses = [
        "That's a great answer! Let me ask you another question...",
        "Interesting perspective! Can you elaborate more on that?",
        "Good thinking! What about edge cases?",
        "Correct! Now, let's try something more challenging.",
        "I see. Let me provide some additional context and continue.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addBotMessage(randomResponse);
    }, 500);
  }

  function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message user";
    messageDiv.innerHTML = `<div class="chat-bubble">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addBotMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message bot";
    messageDiv.innerHTML = `<div class="chat-bubble">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Inicializar cuando el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  initInterviewMode();
});
