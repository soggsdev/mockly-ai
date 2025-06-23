export async function fetchInterviewQuestions(config) {
  const res = await fetch("http://localhost:4000/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error("Failed to fetch questions");
  const data = await res.json();
  return data.questions;
}

export async function fetchFeedback(question, answer) {
  const res = await fetch("http://localhost:4000/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });
  if (!res.ok) throw new Error("Failed to fetch feedback");
  const data = await res.json();
  return data.feedback;
}

export async function fetchChatCompletion(messages) {
  const res = await fetch("http://localhost:4000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error("Failed to fetch chat completion");
  const data = await res.json();
  return data.result;
}
