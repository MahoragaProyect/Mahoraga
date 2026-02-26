let currentAnswer = "";

export const setAnswer = (value) => {
  currentAnswer = value;
};

export const getAnswer = () => {
  return currentAnswer;
};

export const buildAnswerPayload = (userId, questionId) => {
  return {
    userId,
    questionId,
    answerText: currentAnswer,
    createdAt: new Date().toISOString()
  };
};

// Esto es para cuando hagan el evento de entrar a una entrevista.

/* import { setAnswer, buildAnswerPayload } from "../state/answerState.js";
import { sendAnswer } from "../services/answerService.js";

const textarea = document.querySelector("#answerInput");
const button = document.querySelector("#sendAnswer");

textarea.addEventListener("input", (e) => {
  setAnswer(e.target.value);
});

button.addEventListener("click", async () => {
  const payload = buildAnswerPayload(1, 5); // ejemplo userId y questionId
  const result = await sendAnswer(payload);
  console.log(result);
});

//Validacion para que sea posible enviar la respuesta por voz, pero no se puede enviar vacía.
if (!currentAnswer.trim()) {
  alert("La respuesta no puede estar vacía");
  return;
}
startSpeechRecognition((text) => {
  setAnswer(text);
}); */