import "./style.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import { MaterialSymbol } from "react-material-symbols";
import { MessageUser, IconPaperCraft } from "./Message.jsx";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { sendToLogs } from "./utils/api.js";
import { CaretRight } from "react-bootstrap-icons";

export const ChatView = ({
  setTutorialPhase,
  tutorialPhase,
  prompts,
  loading,
  handleApply,
  removeCorrection,
  addCorrection,
  disabled,
  settings,
  setSettings,
}) => {
  const [chatSize, setChatSize] = useState({});
  const containerRef = useRef(null);
  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      setChatSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        x: containerRef.current.offsetLeft,
        y: containerRef.current.offsetTop,
      });
    }
  }, []);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [prompts[prompts.length - 1]]);

  const chat = prompts.map((prompt, id) => {
    const clarity = prompt.segments
      .filter(
        (segment) =>
          segment.corrections !== undefined &&
          segment.corrections.appliedCorrection === undefined &&
          segment.corrections.type === "Clarity",
      )
      .map((segment) => segment.corrections.score)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 5);
    const grammar = prompt.segments
      .filter(
        (segment) =>
          segment.corrections !== undefined &&
          segment.corrections.appliedCorrection === undefined &&
          segment.corrections.type === "Grammar",
      )
      .map((segment) => segment.corrections.score)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 5);
    const tone = prompt.segments
      .filter(
        (segment) =>
          segment.corrections !== undefined &&
          segment.corrections.appliedCorrection === undefined &&
          segment.corrections.type === "Tone",
      )
      .map((segment) => segment.corrections.score)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 5);
    return (
      <MessageUser
        key={id}
        prompt={prompt.prompt}
        segments={prompt.segments}
        answer={prompt.answer}
        tone={tone}
        grammar={grammar}
        clarity={clarity}
        chatSize={chatSize}
        handleApply={handleApply}
        removeCorrection={removeCorrection}
        addCorrection={addCorrection}
        promptIndex={id}
        setScroll={setScroll}
        settings={settings}
        setSettings={setSettings}
        blinkTone={prompt.blink === "Tone"}
        blinkGrammar={prompt.blink === "Grammar"}
        blinkClarity={prompt.blink === "Clarity"}
      />
    );
  });
  return (
    <>
      {tutorialPhase ? (
        <Row className="chat d-flex align-items-center" ref={containerRef}>
          <ChatHelper setTutorialPhase={setTutorialPhase} />
        </Row>
      ) : (
        <Row
          ref={containerRef}
          style={{
            flexDirection: "column-reverse",
            overflow: (!scroll || loading) && "hidden",
          }}
          className="chat d-flex flex-column justify-content-start"
        >
          <Col>
            {chat.length > 0 ? (
              chat
            ) : (
              <p className="start-tip">
                This is a new <b>Chat</b>. If you want to upload a{" "}
                <b>Document</b>, use the &quot;New&quot; button.{" "}
              </p>
            )}
          </Col>
          {loading && <PaperCraftLoadingDialog />}
        </Row>
      )}
    </>
  );
};

ChatView.propTypes = {
  setTutorialPhase: PropTypes.func,
  tutorialPhase: PropTypes.bool,
  loading: PropTypes.bool,
  prompts: PropTypes.arrayOf(PropTypes.object),
  handleApply: PropTypes.func,
  addCorrection: PropTypes.func,
  removeCorrection: PropTypes.func,
};

const ChatHelper = ({ setTutorialPhase }) => {
  return (
    <Container className="helper">
      <ChatHelperTitle />
      <ChatHelperText />
      <ChatHelperButtonGroup setTutorialPhase={setTutorialPhase} />
    </Container>
  );
};

ChatHelper.propTypes = {
  setTutorialPhase: PropTypes.func,
};

const ChatHelperText = () => {
  return (
    <div className="text-justify">
      <div className="text-block">
        PaperCraft is an advanced text-editing helper powered by AI designed to
        assist researchers by improving text quality and style. It enhances the
        tone, gives editing suggestions.
      </div>
      <div className="text-block">
        <span className="bold-text">Start chatting</span> with PaperCraft in the
        text-box below. Be careful to provide PaperCraft{" "}
        <span className="bold-text">proper</span> context of the current part of
        the paper you are working on to make sure it understands your{" "}
        <span className="bold-text">needs</span>.
      </div>
      <div className="text-block">
        <span className="bold-text">Or Upload your document</span> by pressing
        on
        <span className="italic-text">New Paper</span>
        in the sidebar to take advantage of our document upload feature for a
        comprehensive analysis and enhancement of your text.
      </div>
      <div className="text-block">
        You can find more information in the info-point
        <MaterialSymbol
          icon="info"
          size={20}
          color="black"
          className="i-context"
        />
        on the top right.
      </div>
    </div>
  );
};

const ChatHelperTitle = () => {
  return (
    <div className="text-center titlepapercraft">
      Welcome to PaperCraft
      <div className="text-center subtitle">
        Fast edits and tone tuning for your academic paper.
      </div>
    </div>
  );
};

const ChatHelperButtonGroup = ({ setTutorialPhase }) => {
  return (
    <Row className="justify-content-end">
      <Col className="col-md-auto pe-0">
        <Button
          variant="secondary"
          className="me-2 apply-change-button"
          onClick={() => {
            sendToLogs("User clicked button Start chatting");
            setTutorialPhase(false);
          }}
        >
          {"Start "}
          <CaretRight />
        </Button>
      </Col>
    </Row>
  );
};

ChatHelperButtonGroup.propTypes = {
  setTutorialPhase: PropTypes.func,
};

function PaperCraftLoadingDialog() {
  return (
    <Container className={"papercraft-loading-dialog"}>
      <Row>
        <Col>
          <IconPaperCraft animated={true} width={60} height={60} />
        </Col>
        <Col style={{ flexGrow: 29 }} className="d-flex align-items-center">
          <span>PaperCraft is thinking...</span>
        </Col>
      </Row>
    </Container>
  );
}

export { PaperCraftLoadingDialog };
