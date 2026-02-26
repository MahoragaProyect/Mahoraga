export const sendAnswer = async (payload) => {
  try {
    const response = await fetch("http://localhost:3000/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (error) {
    console.error("Error enviando respuesta:", error);
  }
};