let isPanelInitialized = false;

function getDetailElements() {
  return {
    panel: document.querySelector(".detail-panel"),
    title: document.querySelector(".detail-title"),
    topicsList: document.querySelector(".topics-list"),
    closeBtn: document.querySelector(".close-panel"),
    progressText: document.querySelector(".technology-progress-percent"),
    progressFill: document.querySelector(".technology-progress-fill")
  };
}

export function initDetailPanel() {
  if (isPanelInitialized) return;

  const { panel, closeBtn } = getDetailElements();
  if (!panel || !closeBtn) return;

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
  });

  isPanelInitialized = true;
}

export function openLevelDetail({ nodeData, totalNodes, completedNodes }) {
  const { panel, title, topicsList, progressText, progressFill } =
    getDetailElements();

  if (!panel || !title || !topicsList || !progressText || !progressFill) return;

  const progress =
    totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

  title.textContent = nodeData.title;
  progressText.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;

  const topics =
    Array.isArray(nodeData.topics) && nodeData.topics.length
      ? nodeData.topics
      : [
          `Core concepts for ${nodeData.title}.`,
          "Common practical exercises.",
          "Frequent interview questions and edge cases."
        ];

  topicsList.innerHTML = "";
  topics.forEach((topic) => {
    const li = document.createElement("li");
    li.textContent = topic;
    topicsList.appendChild(li);
  });

  panel.classList.add("active");
}
