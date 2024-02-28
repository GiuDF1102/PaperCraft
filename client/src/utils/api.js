"use strict";
//let address = "https://b6e2-130-192-232-227.ngrok-free.app"; //"http://localhost:3000";
let address = "http://localhost:3000";

const headers = new Headers();
headers.append("Content-type", "application/json");
headers.append("ngrok-skip-browser-warning", "11111");
async function requestEvaluation(prompt) {
  const response = await fetch(`${address}/api/evaluations`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      prompt: prompt,
    }),
  });
  return await response.json();
}

async function requestDocumentEvaluation(fileName) {
  const response = await fetch(`${address}/api/evaluations/document`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      fileName: fileName,
    }),
  });
  return await response.json();
}

/**
 * Picks a new suggestion from the database
 * @param {String} prompt
 * @param {String} segment
 * @param {number} num - the next correction number
 * @returns {Promise<String>} suggestion
 */
async function requestSuggestion(prompt, segment, style, length, creativity) {
  const response = await fetch(`${address}/api/evaluations/segment`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      prompt: prompt,
      segment: segment,
      style: style,
      length: length,
      creativity: creativity,
    }),
  });
  console.log(response);
  return await response.json();
}

async function getChats() {
  const chats = await fetch(`${address}/api/chats`, {
    method: "GET",
    headers: headers,
  });
  return await chats.json();
}

async function setChatsApi(chats) {
  await fetch(`${address}/api/chats`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      chats: chats,
    }),
  });
}

async function sendToLogs(message) {
  console.log(message);
  await fetch(`${address}/logs`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      message: message,
    }),
  });
}

async function getTutorialPhase() {
  const response = await fetch(`${address}/api/tutorialPhase`, {
    method: "GET",
    headers: headers,
  })
  return await response.json();
}

async function setTutorialPhaseAPI() {
  await fetch(`${address}/api/tutorialPhase`, {
    method: "POST",
    headers: headers,
  })
}

export {
  requestEvaluation,
  requestSuggestion,
  getChats,
  setChatsApi,
  requestDocumentEvaluation,
  sendToLogs,
  getTutorialPhase,
  setTutorialPhaseAPI
};
