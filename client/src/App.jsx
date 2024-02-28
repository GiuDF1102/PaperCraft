import { useEffect, useState } from "react";
import NavbarPaperCraft from "./NavbarPaperCraft.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "react-material-symbols/rounded";
import { Container, Row, Col } from "react-bootstrap";
import { Chat } from "./Chat.jsx";
import { Sidebar } from "./SidebarPaperCraft.jsx";
import "rsuite/dist/rsuite.min.css";
import {
  getChats,
  getTutorialPhase,
  requestDocumentEvaluation,
  requestEvaluation,
  requestSuggestion,
  setChatsApi,
  setTutorialPhaseAPI,
} from "./utils/api.js";
import { Document } from "./Document.jsx";
import { MaterialSymbol } from "react-material-symbols";

const App = () => {
  const [tutorialPhase, setTutorialPhase] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState(-1);
  const [selectedSection, setSelectedSection] = useState(-1);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modify, setModify] = useState(false);
  const [settings, setSettings] = useState({
    style: 1,
    length: 1,
    creativity: 1,
  });

  useEffect(() => {
    getChats().then((chats) => {
      chats.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
      setChats(chats);
    });
    getTutorialPhase().then((tutorialPhase) => {
      setTutorialPhase(tutorialPhase);
    })
  }, []);

  const handleTutorialReading = async function (value) {
    setTutorialPhase(value);
    await setTutorialPhaseAPI();
  }

  const handleFileUpload = async function (fileName) {
    let newChats = [...chats];
    setLoading(true);
    const response = await requestDocumentEvaluation(fileName);
    newChats = [response, ...newChats];
    newChats.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
    setChats(newChats);
    const documentIndexes = newChats
      .map((chat, index) => {
        return {
          ...chat,
          index: index,
        };
      })
      .filter((chat) => chat.type === "document")
      .map((chat) => chat.index);
    setSelectedPaper(documentIndexes[0]);
    setSelectedSection(0);
    setLoading(false);
    await setChatsApi(newChats);
  };

  const handlePromptSubmission = async function (prompt) {
    let newChats = [...chats];
    if (selectedPaper < 0) {
      // new chat
      newChats = [
        {
          type: "chat",
          title: "New Chat",
          prompts: [
            {
              prompt: prompt,
              segments: [
                {
                  segment: prompt,
                },
              ],
            },
          ],
        },
        ...newChats,
      ];
      setSelectedPaper(0);
      newChats.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
      setChats(newChats);
      setLoading(true);
      const response = await requestEvaluation(prompt);
      const prompts = newChats[0].prompts;
      prompts[prompts.length - 1] = response;
      newChats[0].title = response.title;
      newChats.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
      setChats(newChats);
      setLoading(false);
      await setChatsApi(newChats);
    } else {
      // old chat
      newChats[selectedPaper].prompts.push({
        prompt: prompt,
        segments: [
          {
            segment: prompt,
          },
        ],
      });
      newChats.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
      setChats(newChats);
      setLoading(true);
      const response = await requestEvaluation(prompt);
      const prompts = newChats[selectedPaper].prompts;
      prompts[prompts.length - 1] = response;
      newChats.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
      setChats(newChats);
      setLoading(false);
      await setChatsApi(newChats);
    }
  };

  const handleApply = async function (
    promptIndex,
    segmentIndex,
    attemptNumber,
  ) {
    const saveSelectedPaper = selectedPaper;
    const chatsCopy = [...chats];
    if (
      chatsCopy[selectedPaper].prompts[promptIndex].segments[segmentIndex]
        .corrections.appliedCorrection === undefined
    ) {
      chatsCopy[selectedPaper].prompts[promptIndex].blink =
        chatsCopy[selectedPaper].prompts[promptIndex].segments[
          segmentIndex
        ].corrections.type;
    }
    chatsCopy[selectedPaper].prompts[promptIndex].segments[
      segmentIndex
    ].corrections.appliedCorrection = attemptNumber;
    chatsCopy.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
    setChats(chatsCopy);
    const chatsAPI = JSON.parse(JSON.stringify(chatsCopy));
    chatsAPI[selectedPaper].prompts[promptIndex].blink = "";
    await setChatsApi(chatsAPI);
    setTimeout(() => {
      setChats((oldChats) => {
        oldChats[saveSelectedPaper].prompts[promptIndex].blink = ""; // remove blink
        return [...oldChats];
      });
    }, 3000);
  };

  const removeCorrection = async function (promptIndex, segmentIndex) {
    const saveSelectedPaper = selectedPaper;
    const chatsCopy = [...chats];
    if (
      chatsCopy[selectedPaper].prompts[promptIndex].segments[segmentIndex]
        .corrections.appliedCorrection !== undefined
    ) {
      chatsCopy[selectedPaper].prompts[promptIndex].blink =
        chatsCopy[selectedPaper].prompts[promptIndex].segments[
          segmentIndex
        ].corrections.type;
    }
    chatsCopy[selectedPaper].prompts[promptIndex].segments[
      segmentIndex
    ].corrections.appliedCorrection = undefined;
    chatsCopy.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
    setChats(chatsCopy);
    const chatsAPI = JSON.parse(JSON.stringify(chatsCopy));
    chatsAPI[selectedPaper].prompts[promptIndex].blink = "";
    await setChatsApi(chatsAPI);
    setTimeout(() => {
      setChats((oldChats) => {
        oldChats[saveSelectedPaper].prompts[promptIndex].blink = ""; // remove blink
        return [...oldChats];
      });
    }, 3000);
  };

  const addCorrection = async function (promptIndex, segmentIndex) {
    const response = await requestSuggestion(
      chats[selectedPaper].prompts[promptIndex].prompt,
      chats[selectedPaper].prompts[promptIndex].segments[segmentIndex].segment,
      settings.style,
      settings.length,
      settings.creativity,
    );
    const chatsCopy = [...chats];
    const corrections =
      chatsCopy[selectedPaper].prompts[promptIndex].segments[segmentIndex]
        .corrections;
    if (corrections.attempts === undefined) {
      corrections.attempts = [];
    }
    chatsCopy[selectedPaper].prompts[promptIndex].segments[
      segmentIndex
    ].corrections.attempts.push({
      text: response,
      settings: {
        style: settings.style,
        length: settings.length,
        creativity: settings.creativity,
      },
    });
    chatsCopy.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
    setChats(chatsCopy);
    await setChatsApi(chatsCopy);
  };

  const restoreSection = async function () {
    let newChats = [...chats];
    let newPrompt = {
      ...newChats[selectedPaper].prompts[selectedSection],
      segments: newChats[selectedPaper].prompts[selectedSection].prevSegments,
    };
    delete newPrompt.prevSegments;
    newChats[selectedPaper].prompts[selectedSection] = newPrompt;
    setChats(newChats);
    await setChatsApi(newChats);
  };

  const handleDocumentModification = async function (prompt) {
    const prevSegments = chats[selectedPaper].prompts[selectedSection].segments;
    let newChats = [...chats];
    let title = newChats[selectedPaper].prompts[selectedSection].title;
    newChats[selectedPaper].prompts[selectedSection] = {
      title: title,
      prompt: prompt,
      segments: [
        {
          segment: prompt,
        },
      ],
    };
    newChats.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
    setChats(newChats);
    setLoading(true);
    const response = await requestEvaluation(prompt);
    newChats[selectedPaper].prompts[selectedSection] = response;
    newChats[selectedPaper].prompts[selectedSection].title = title;
    newChats[selectedPaper].prompts[selectedSection].prevSegments =
      prevSegments;

    newChats.sort((chat1, chat2) => chat1.type.localeCompare(chat2.type));
    setChats(newChats);
    setLoading(false);
    await setChatsApi(newChats);
  };

  return (
    <Container fluid className="main d-flex flex-column">
      <NavbarPaperCraft settings={settings} setSettings={setSettings} />
      <Row className="app-row">
        <Col className="sidebar" md={2}>
          <Sidebar
            disabled={tutorialPhase || loading || modify} // TODO: the disabled prop should disable ALL the components of the sidebar
            paperElements={chats}
            selectedPaper={selectedPaper}
            setSelectedPaper={setSelectedPaper}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            handleFileUpload={handleFileUpload}
          />
        </Col>
        <Col style={{ height: "100%", position: "relative" }} md={10}>
          {(selectedPaper < 0 || chats[selectedPaper].type === "chat") && (
            <Chat
              loading={loading}
              handleApply={handleApply}
              addCorrection={addCorrection}
              removeCorrection={removeCorrection}
              handlePromptSubmission={handlePromptSubmission}
              selectedPaper={chats[selectedPaper] || {}}
              tutorialPhase={tutorialPhase}
              setTutorialPhase={handleTutorialReading}
              settings={settings}
              setSettings={setSettings}
            />
          )}
          {selectedPaper >= 0 && chats[selectedPaper].type === "document" && (
            <Document
              title={chats[selectedPaper].prompts[selectedSection].title}
              segments={chats[selectedPaper].prompts[selectedSection].segments}
              suggestion={chats[selectedPaper].prompts[selectedSection].answer}
              prompt={chats[selectedPaper].prompts[selectedSection].prompt}
              handleApply={handleApply}
              addCorrection={addCorrection}
              removeCorrection={removeCorrection}
              selectedSection={selectedSection}
              handleDocumentModification={handleDocumentModification}
              modify={modify}
              setModify={setModify}
              loading={loading}
              settings={settings}
              setSettings={setSettings}
              blinkTone={
                chats[selectedPaper].prompts[selectedSection].blink === "Tone"
              }
              blinkGrammar={
                chats[selectedPaper].prompts[selectedSection].blink ===
                "Grammar"
              }
              blinkClarity={
                chats[selectedPaper].prompts[selectedSection].blink ===
                "Clarity"
              }
              undo={
                !!chats[selectedPaper].prompts[selectedSection].prevSegments
              }
              restoreSection={restoreSection}
            />
          )}
        </Col>
      </Row>
      <Row className="dialog-tip" style={{ paddingLeft: 0 }}>
        <span style={{ lineHeight: "1" }}>
          PaperCraft strives for accuracy, but can make mistakes. For more
          information and examples on Settings and Scores scales check the
          documentation on the top right{" "}
          <MaterialSymbol
            icon="info"
            size={16}
            color="black"
            style={{ position: "relative", top: "4px" }}
          />
        </span>
      </Row>
    </Container>
  );
};

export default App;
