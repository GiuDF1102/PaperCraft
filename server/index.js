"use strict";
import express, { json } from "express";
import session from "express-session";
import timeout from "./utils.js";
import { ai, chats, getTutorialPhase, setChats, setTutorialPhase } from "./db.js";
import fs from "fs";
import cors from "cors";
const app = express();
const port = 3000;

app.use(json());
app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "All right then, keep your secrets",
  }),
);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.post("/api/evaluations", timeout, (req, res) => {
  const prompt = ai.find((entry) => entry.prompt === req.body.prompt.trim());
  return res.status(200).json(prompt);
});

app.post("/api/evaluations/document", timeout, (req, res) => {
  const document = ai.find(
    (entry) =>
      entry.type === "document" && entry.fileName === req.body.fileName,
  );
  return res.status(200).json(document);
});

app.post("/api/evaluations/segment", (_req, res) => {
  let attempt;
  return res.status(200).json(attempt); // WIZARD OF OZ: PLACE THE BREAKPOINT AT THIS LINE
});

app.get("/api/chats", (_req, res) => {
  return res.status(200).json(chats);
});

app.post("/api/chats", (req, res) => {
  setChats(req.body.chats);
  return res.status(200).send("ok");
});

app.post("/api/tutorialPhase", (_req, res) => {
  setTutorialPhase(false);
  return res.status(200).json({});
})

app.get("/api/tutorialPhase", (_req, res) => {
  return res.status(200).json(getTutorialPhase());
})

const sessions = {};
//random session id
const sessionId =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
app.post("/logs", (req, res) => {
  // Ensure the session exists or create it
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      session: sessionId,
      messages: [],
    };
  }

  // Get the current session
  const session = sessions[sessionId];
  console.log(session);
  // Create the log entry
  const logEntry = {
    timestamp: new Date(),
    message: req.body.message,
  };

  // Append the log entry to the session's messages
  session.messages.push(logEntry);

  // Write the session to the file
  fs.writeFile(
    `logs_${sessionId}.json`,
    JSON.stringify(Object.values(sessions), null, 2),
    (err) => {
      if (err) {
        console.error("Error writing logs:", err);
        res.status(500).send("Error writing logs");
        return;
      }
      console.log(`Log appended to session ${sessionId}`);
      res.send(`Log appended successfully to session ${sessionId}`);
    },
  );
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
