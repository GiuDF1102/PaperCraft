import { Button, Col, Container, Row } from "react-bootstrap";
import { MessagePaperCraft, NormalText, Statistics, Text } from "./Message";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { PaperCraftLoadingDialog } from "./ChatView";
import TextareaAutosize from "react-textarea-autosize";
import { sendToLogs } from "./utils/api.js";
import { MaterialSymbol } from "react-material-symbols";
import { ArrowReturnLeft, CheckLg, XLg } from "react-bootstrap-icons";

Document.propTypes = {
  title: PropTypes.string,
  suggestion: PropTypes.string,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      segment: PropTypes.string,
      corrections: PropTypes.shape({
        type: PropTypes.oneOf(["Clarity", "Grammar", "Tone"]),
        score: PropTypes.number,
        attempts: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string,
            settings: PropTypes.shape({
              style: PropTypes.number,
              length: PropTypes.number,
              creativity: PropTypes.number,
            }),
          }),
        ),
        appliedCorrection: PropTypes.number,
      }),
    }),
  ),
  handleApply: PropTypes.func,
  addCorrection: PropTypes.func,
  removeCorrection: PropTypes.func,
  selectedSection: PropTypes.number,
  modify: PropTypes.bool,
  text: PropTypes.string,
};
function Document({
  title,
  suggestion,
  segments,
  handleApply,
  addCorrection,
  removeCorrection,
  selectedSection,
  handleDocumentModification,
  modify,
  setModify,
  prompt,
  loading,
  settings,
  setSettings,
  blinkTone,
  blinkGrammar,
  blinkClarity,
  undo,
  restoreSection,
}) {
  const [chatSize, setChatSize] = useState({});
  const elementRef = useRef(null);
  const [text, setText] = useState("");
  const [checkDiscard, setCheckDiscard] = useState(false);
  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    if (elementRef.current) {
      setChatSize({
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight,
        x: elementRef.current.offsetLeft,
        y: elementRef.current.offsetTop,
      });
    }
  }, []);
  const clarity = segments
    .filter(
      (segment) =>
        segment.corrections !== undefined &&
        segment.corrections.appliedCorrection === undefined &&
        segment.corrections.type === "Clarity",
    )
    .map((segment) => segment.corrections.score)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 5);
  const grammar = segments
    .filter(
      (segment) =>
        segment.corrections !== undefined &&
        segment.corrections.appliedCorrection === undefined &&
        segment.corrections.type === "Grammar",
    )
    .map((segment) => segment.corrections.score)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 5);
  const tone = segments
    .filter(
      (segment) =>
        segment.corrections !== undefined &&
        segment.corrections.appliedCorrection === undefined &&
        segment.corrections.type === "Tone",
    )
    .map((segment) => segment.corrections.score)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 5);

  return !modify ? (
    <Container className="document d-flex flex-column" ref={elementRef}>
      <Row className="justify-content-between" style={{ marginTop: 10 }}>
        <Col>
          <h2>{title}</h2>
        </Col>
        <Col className="position-relative">
          <div className="position-absolute top-50 end-0 translate-middle-y">
            {undo && (
              <Button
                disabled={loading}
                className="apply-change-button"
                onClick={() => restoreSection()}
              >
                <MaterialSymbol icon="undo" />
                {" Restore previous Section"}
              </Button>
            )}{" "}
            <Button
              disabled={loading}
              className="apply-change-button"
              onClick={() => {
                const prompt = segments
                  .map((segment) => {
                    if (segment.corrections?.appliedCorrection >= 0) {
                      return segment.corrections.attempts[
                        segment.corrections.appliedCorrection
                      ].text;
                    } else return segment.segment;
                  })
                  .join(" ");
                setModify(true);
                setText(prompt);
                sendToLogs("User clicked on Modify button (document)");
              }}
            >
              <MaterialSymbol icon="edit" />
              {" Edit Section"}
            </Button>
          </div>
        </Col>
      </Row>
      <Statistics
        tone={tone}
        grammar={grammar}
        clarity={clarity}
        blinkTone={blinkTone}
        blinkClarity={blinkClarity}
        blinkGrammar={blinkGrammar}
      ></Statistics>
      {/* TODO: duplicated code*/}
      <Row
        className="chat-message d-flex justify-content-start"
        style={{ overflowY: (!loading && scroll) ? "scroll" : "hidden", marginBottom: 10 }}
      >
        <Col style={{ flexGrow: 29 }}>
          {segments.map((segment, key) => {
            if (segment.corrections) {
              return (
                <Text
                  key={key}
                  segment={segment}
                  chatSize={chatSize}
                  addCorrection={addCorrection}
                  removeCorrection={removeCorrection}
                  handleApply={handleApply}
                  promptIndex={selectedSection}
                  segmentIndex={key}
                  setScroll={setScroll}
                  settings={settings}
                  setSettings={setSettings}
                ></Text>
              );
            } else {
              return <NormalText key={key} text={segment.segment}></NormalText>;
            }
          })}
        </Col>
      </Row>
      {!loading && (
        <MessagePaperCraft bottom={true} text={suggestion}></MessagePaperCraft>
      )}
      {/* TODO: end of duplicated code*/}
      {loading && <PaperCraftLoadingDialog />}
    </Container>
  ) : (
    <Container
      className="document d-flex flex-column"
      style={{ position: "relative" }}
    >
      <Row className="justify-content-between" style={{ marginTop: 10 }}>
        <Col>
          <h2>{title}</h2>
        </Col>
      </Row>
      <Row style={{ paddingLeft: 10 }}>
        <TextareaAutosize
          disabled={checkDiscard}
          defaultValue={text}
          onChange={(event) => setText(event.target.value)}
        />
      </Row>
      <Row xs="auto" style={{ marginTop: 10, paddingLeft: 0 }}>
        <Col>
          <Button
            disabled={checkDiscard}
            className="apply-change-button"
            onClick={() => {
              sendToLogs("User clicked button Apply (before PopUp)");
              setModify(false);
              handleDocumentModification(text);
            }}
          >
            <CheckLg />
            {" Apply"}
          </Button>
          <Button
            disabled={checkDiscard}
            style={{ marginLeft: 10 }}
            className="apply-change-button-danger"
            onClick={() => {
              sendToLogs("User clicked button Discard (before PopUp)");
              setCheckDiscard(true);
            }}
          >
            <XLg />
            {" Discard"}
          </Button>
        </Col>
      </Row>
      {loading && <PaperCraftLoadingDialog />}
      {checkDiscard && (
        <CheckDiscardDialog
          setModify={setModify}
          setCheckDiscard={setCheckDiscard}
        />
      )}
    </Container>
  );
}

function CheckApplyDialog({
  setModify,
  setCheckApply,
  handleDocumentModification,
  text,
}) {
  return (
    <Container className="papercraft-confirm-dialog">
      <Row>
        Are you sure you want to apply your changes?{" "}
        <b style={{ paddingLeft: 0 }}> The previous version will be lost. </b>
      </Row>
      <Row xs="auto" style={{ marginTop: 18, paddingLeft: 0 }}>
        <Col style={{ paddingLeft: 0 }}>
          <Button
            className="apply-change-button-danger btn-sm"
            onClick={() => {
              setCheckApply(false);
              setModify(false);
              sendToLogs("User clicked button Apply (popup)");
              handleDocumentModification(text);
            }}
          >
            Apply
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            className="apply-change-button btn-sm"
            onClick={() => {
              sendToLogs("User clicked button Go back (apply popup)");
              setCheckApply(false);
            }}
          >
            Go back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

function CheckDiscardDialog({ setModify, setCheckDiscard }) {
  return (
    <Container className="papercraft-confirm-dialog">
      <Row>
        Are you sure you want to discard your changes?{" "}
        <b style={{ paddingLeft: 0 }}> All your changes will be lost. </b>
      </Row>
      <Row xs="auto" style={{ marginTop: 18, paddingLeft: 0 }}>
        <Col style={{ paddingLeft: 0 }}>
          <Button
            className="apply-change-button-danger btn-sm"
            onClick={() => {
              sendToLogs("User clicked button Discard (popup)");
              setModify(false);
              setCheckDiscard(false);
            }}
          >
          <XLg />
            {" Discard"}
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            className="btn-sm apply-change-button"
            onClick={() => {
              sendToLogs("User clicked button Go back (discard popUp)");
              setCheckDiscard(false);
            }}
          >
            <ArrowReturnLeft />
            {" Go back"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export { Document };
