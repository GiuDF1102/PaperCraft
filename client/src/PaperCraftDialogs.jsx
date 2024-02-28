import {
  Row,
  Col,
  Container,
  Button,
  Spinner,
  Collapse,
  Stack,
  ButtonGroup,
} from "react-bootstrap";
import { IconPaperCraft } from "./Message";
import { MaterialSymbol } from "react-material-symbols";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { SettingsView } from "./SettingsView";
import { sendToLogs } from "./utils/api.js";
import { CheckLg, Lightbulb } from "react-bootstrap-icons";

PaperCraftLoadingText.propTypes = {
  type: PropTypes.string,
  placement: PropTypes.string,
  setPopoverSize: PropTypes.func,
};
function PaperCraftLoadingText({ placement, type, setPopoverSize }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setPopoverSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, [containerRef]);

  return (
    <Container
      className={
        placement === "bottomStart"
          ? "papercraft-loading-text-bottomstart"
          : "papercraft-loading-text-bottomend"
      }
      ref={containerRef}
    >
      <Row>
        <span className="title-dialog">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </Row>
      <Row>
        <Col>
          <Row>
            <IconPaperCraft animated={true} width={40} height={40} />
          </Row>
        </Col>
        <Col className="d-flex align-items-center papercraft-is-thinking-dialog">
          <Row>
            <span style={{ fontSize: 14 }}>PaperCraft is thinking...</span>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

PaperCraftSuggestionText.propTypes = {
  segment: PropTypes.object,
  placement: PropTypes.string,
  applySuggestion: PropTypes.func,
  removeSuggestion: PropTypes.func,
  promptIndex: PropTypes.number,
  segmentIndex: PropTypes.number,
};

function PaperCraftSuggestionText({
  segment,
  placement,
  applySuggestion,
  removeCorrection,
  promptIndex,
  segmentIndex,
  addCorrection,
  closePop,
  settings,
  setSettings,
}) {
  const [selectedAttempt, setSelectedAttempt] = useState(0);
  const [loadingNewCorrection, setLoadingNewCorrection] = useState(false);
  const [open, setOpen] = useState(false);

  const textSettings = numToText(settings);
  return (
    <Container
      className={
        placement === "bottomStart"
          ? "papercraft-loading-text-bottomstart"
          : "papercraft-loading-text-bottomend"
      }
    >
      <Row>
        <span className="title-dialog">{segment.corrections.type}</span>
      </Row>
      <Row>
        <Col>
          <Row>
            <IconPaperCraft width={40} height={40} />
          </Row>
        </Col>
        <Col className="d-flex align-items-center papercraft-is-thinking-dialog">
          <Row>
            <span className="text-dialog">
              {segment.corrections.suggestion}
            </span>
          </Row>
        </Col>
      </Row>
      {segment.corrections.attempts && (
        <>
          <Row style={{ paddingTop: 10 }}>
            <Col>
              <span className="bold-text">Corrections:</span>
            </Col>
            {segment.corrections.attempts.length !== 1 && (
              <Col className="d-flex justify-content-end arrow-version-text">
                <MaterialSymbol
                  icon="arrow_back_ios"
                  size={11}
                  color="black"
                  className="arrow-button-version"
                  onClick={() => {
                    sendToLogs(
                      "User clicked on button arrow back (previous correction)",
                    );
                    setOpen(false);
                    setSelectedAttempt((attempt) =>
                      attempt - 1 > 0 ? attempt - 1 : 0,
                    );
                  }}
                />
                <span>
                  {selectedAttempt + 1} / {segment.corrections.attempts.length}{" "}
                </span>
                <MaterialSymbol
                  icon="arrow_forward_ios"
                  size={11}
                  color="black"
                  className="arrow-button-version"
                  onClick={() => {
                    sendToLogs(
                      "User clicked on button arrow forward (next correction)",
                    );
                    setOpen(false);
                    setSelectedAttempt((attempt) =>
                      attempt + 1 < segment.corrections.attempts.length - 1
                        ? attempt + 1
                        : segment.corrections.attempts.length - 1,
                    );
                  }}
                />
              </Col>
            )}
          </Row>
          <Row style={{ margin: 0 }}>
            <span
              className="text-dialog"
              style={{
                borderRadius: 5,
                borderColor: "#a2b7a5",
                backgroundColor: "#afc8ad",
                borderWidth: 1,
                borderStyle: "solid",
                padding: "0px 4px 0px 4px",
              }}
            >
              {segment.corrections.attempts[selectedAttempt].text}
            </span>
          </Row>
          <Row>
            <SettingsView
              settings={segment.corrections.attempts[selectedAttempt].settings}
            />
          </Row>
        </>
      )}
      <Stack direction="horizontal" gap={2} style={{ paddingTop: 5 }}>
        <Col className="d-flex justify-content-start">
          <span title={!(segment.corrections.attempts && segment.corrections.appliedCorrection !== selectedAttempt) && "This correction is already applied"}>
          {segment.corrections.attempts && segment.corrections.attempts.length > 0 && <Button
            disabled={!(segment.corrections.attempts && segment.corrections.appliedCorrection !== selectedAttempt)}
            className="btn-sm grammar-suggestion-button button-papercraft"
            onClick={() => {
              closePop();
              sendToLogs("User clicked on Apply this correction");
              setTimeout(() => {
                applySuggestion(promptIndex, segmentIndex, selectedAttempt);
              }, 200);
            }}
          >
          <CheckLg />
            {" Apply this correction"}
          </Button>}

          </span>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="btn-sm grammar-suggestion-button"
            aria-controls="settings-collapsed"
            aria-expanded={open}
            style={{ paddingRight: 4 }}
            onClick={async () => {
              setOpen((old) => !old);
              await sendToLogs("User clicked on Generate new correction...");
            }}
          >
            <Lightbulb />{" "}
            {"Generate new correction"}
            <MaterialSymbol
              icon="expand_more"
              style={{
                transform: open ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 0.2s",
                backgroundColor: "transparent",
                paddingRight: "0px",
                paddingLeft: "0px",
                borderWidth: "0px",
              }}
              color="white"
            />
          </Button>
        </Col>
        {/*
        <Col style={{ flexGrow: 5, paddingLeft: 0 }}>
          <span className="dialog-tip">
            Don’t like the suggestions? Check your settings
            <MaterialSymbol
              icon="settings"
              size={20}
              color="black"
              className="i-context"
            />
            to adjust.
          </span>
        </Col>
      */}
      </Stack>
      <Collapse in={open}>
        <div id="settings-collapsed" style={{ marginRight: -10 }}>
          <Stack
            direction="horizontal"
            style={{ paddingTop: 10, fontSize: 16, gap: 10, marginRight: 20 }}
          >
            <Col style={{ textAlign: "center" }}>
              <span>Style</span>
              <ButtonGroup size="sm">
                <Button
                  className="settings-button"
                  disabled={settings.style === 0}
                  onClick={async () => {
                    setSettings((oldSettings) => {
                      return {
                        ...oldSettings,
                        style:
                          oldSettings.style > 0
                            ? oldSettings.style - 1
                            : oldSettings.style,
                      };
                    });
                    await sendToLogs(
                      `User changed Style to ${numToText(settings).style}`,
                    );
                  }}
                >
                  -
                </Button>
                <Button
                  className="settings-button-center"
                  style={{ width: 80 }}
                >
                  {textSettings.style}
                </Button>
                <Button
                  className="settings-button"
                  disabled={settings.style === 2}
                  onClick={async () => {
                    setSettings((oldSettings) => {
                      return {
                        ...oldSettings,
                        style:
                          oldSettings.style < 2
                            ? oldSettings.style + 1
                            : oldSettings.style,
                      };
                    });
                    await sendToLogs(
                      `User changed Style to ${numToText(settings).style}`,
                    );
                  }}
                >
                  +
                </Button>
              </ButtonGroup>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <span>Length</span>
              <ButtonGroup size="sm">
                <Button
                  className="settings-button"
                  disabled={settings.length === 0}
                  onClick={async () => {
                    setSettings((oldSettings) => {
                      return {
                        ...oldSettings,
                        length:
                          oldSettings.length > 0
                            ? oldSettings.length - 1
                            : oldSettings.length,
                      };
                    });
                    await sendToLogs(
                      `User changed Length to ${numToText(settings).length}`,
                    );
                  }}
                >
                  -
                </Button>
                <Button
                  className="settings-button-center"
                  style={{ width: 80 }}
                >
                  {textSettings.length}
                </Button>
                <Button
                  className="settings-button"
                  disabled={settings.length === 2}
                  onClick={async () => {
                    setSettings((oldSettings) => {
                      return {
                        ...oldSettings,
                        length:
                          oldSettings.length < 2
                            ? oldSettings.length + 1
                            : oldSettings.length,
                      };
                    });
                    await sendToLogs(
                      `User changed Length to ${numToText(settings).length}`,
                    );
                  }}
                >
                  +
                </Button>
              </ButtonGroup>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <span>Creativity</span>
              <ButtonGroup size="sm">
                <Button
                  className="settings-button"
                  disabled={settings.creativity === 0}
                  onClick={async () => {
                    setSettings((oldSettings) => {
                      return {
                        ...oldSettings,
                        creativity:
                          oldSettings.creativity > 0
                            ? oldSettings.creativity - 1
                            : oldSettings.creativity,
                      };
                    });
                    await sendToLogs(
                      `User changed Creativity to ${numToText(settings).creativity}`,
                    );
                  }}
                >
                  -
                </Button>
                <Button
                  className="settings-button-center"
                  style={{ width: 95 }}
                >
                  {textSettings.creativity}
                </Button>
                <Button
                  className="settings-button"
                  disabled={settings.creativity === 2}
                  onClick={async () => {
                    setSettings((oldSettings) => {
                      return {
                        ...oldSettings,
                        creativity:
                          oldSettings.creativity < 2
                            ? oldSettings.creativity + 1
                            : oldSettings.creativity,
                      };
                    });
                    await sendToLogs(
                      `User changed Creativity to ${numToText(settings).creativity}`,
                    );
                  }}
                >
                  +
                </Button>
              </ButtonGroup>
            </Col>
            <Col style={{ alignSelf: "end" }}>
              <Button
                className="grammar-suggestion-button"
                size="sm"
                style={{ borderWidth: 1, borderColor: "#6d8871" }}
                onClick={async () => {
                  setLoadingNewCorrection(true);
                  await addCorrection(promptIndex, segmentIndex);
                  setLoadingNewCorrection(false);
                  setSelectedAttempt(segment.corrections.attempts.length - 1);
                }}
              >
                {loadingNewCorrection ? (
                  <Spinner
                    size="sm"
                    animation="border"
                    variant="light"
                  ></Spinner>
                ) : (
                  "Generate"
                )}
              </Button>
            </Col>
          </Stack>
        </div>
      </Collapse>
      {segment.corrections.appliedCorrection !== undefined && (
        <>
          <Row style={{ paddingTop: 10 }}>
            <span className="bold-text">Original text:</span>
          </Row>
          <Row style={{margin: 0}}>
            <span className="text-dialog" style={{borderRadius: 5, backgroundColor: "#cfbe81", borderStyle: "solid", borderWidth: 1, padding: "0px 4px", borderColor: "#c0ab39"}}>{segment.segment}</span>
          </Row>
          <Row style={{paddingTop: 4}}>
            <Col></Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="btn-sm grammar-suggestion-button"
                onClick={() => {
                  closePop();
                  // Simulating an asynchronous operation with setTimeout
                  setTimeout(() => {
                    removeCorrection(promptIndex, segmentIndex);
                  }, 200);
                }}
              >
                <MaterialSymbol icon="undo"/>
                {" Restore"}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

function PaperCraftUndoGrammar({ original }) {
  return (
    <Container className="papercraft-loading-text">
      <Row>
        <span className="title-dialog">Grammar</span>
      </Row>
      <Row>
        <Col style={{ flexGrow: 2 }} className="d-flex align-items-center">
          <span className="dialog-tip">Click here to undo:</span>
        </Col>
        <Col
          className="d-flex justify-content-start"
          style={{ paddingLeft: 0 }}
        >
          <Button className="btn-sm grammar-suggestion-button">
            {original}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

function PaperCraftVersionTone({ version, numVersions }) {
  return (
    <Container className="papercraft-loading-text">
      <Row>
        <Col style={{ paddingRight: 0 }}>
          <span className="title-dialog">Tone</span>
        </Col>
        <Col style={{ flexGrow: 19 }}>
          {version == 1 ? (
            <span className="original-version"> - Original Version </span>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row className="d-flex align-items-center" style={{ paddingTop: 10 }}>
        <Col className="arrow-version-text">
          <MaterialSymbol
            icon="arrow_back_ios"
            size={11}
            color="black"
            className="arrow-button-version"
          />
          <span>
            {version} / {numVersions}{" "}
          </span>
          <MaterialSymbol
            icon="arrow_forward_ios"
            size={11}
            color="black"
            className="arrow-button-version"
          />
        </Col>
        <Col>
          <Button className="btn-sm grammar-suggestion-button">
            Regenerate
          </Button>
        </Col>
        <Col style={{ paddingLeft: 0 }}>
          <Button className="btn-sm undo-button">Undo</Button>
        </Col>
      </Row>
    </Container>
  );
}

function InfoPointStatistics() {
  return (
    <Container className="papercraft-info-point">
      <Row>
        <span className="title-dialog">Info</span>
      </Row>
      <Row>
        <Col
          className="d-flex align-items-center"
          style={{ lineHeight: 1.5, fontSize: 14, color: "black" }}
        >
          <div className="text-justify">
            <div className="text-block">
              <span className="bold-text">Tone</span>: Assesses the formality
              and appropriateness of the writing style for academic
              communication.
              <ul>
                <li>
                  A <span className="bold-text">High</span> score reflects a
                  formal and appropriate style for academia.
                </li>
                <li>
                  A <span className="bold-text">Low</span> score suggests a tone
                  unsuitable for academic discourse.
                </li>
              </ul>
            </div>
            <div className="text-block">
              <span className="bold-text">Grammar</span>: Evaluates the
              grammatical accuracy and precision in the text.
              <ul>
                <li>
                  A <span className="bold-text">High</span> score indicates a
                  high level of accuracy and precision.
                </li>
                <li>
                  A <span className="bold-text">Low</span> score implies notable
                  errors or imprecision.
                </li>
              </ul>
            </div>
            <div className="text-block">
              <span className="bold-text">Clarity</span>: Assesses the formality
              and appropriateness of the writing style for academic
              communication.
              <ul>
                <li>
                  A <span className="bold-text">High</span> score suggests clear
                  and accessible language and structure.
                </li>
                <li>
                  A <span className="bold-text">Low</span> score indicates a
                  difficulty in understanding due to complex language or
                  structure.
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function numToText(settings) {
  let text_style, text_length, text_creativity;
  switch (settings.style) {
    case 0:
      text_style = "Accessible";
      break;
    case 1:
      text_style = "Standard";
      break;
    case 2:
      text_style = "Formal";
      break;
    default:
      break;
  }
  switch (settings.length) {
    case 0:
      text_length = "Short";
      break;
    case 1:
      text_length = "Medium";
      break;
    case 2:
      text_length = "Long";
      break;
    default:
      break;
  }
  switch (settings.creativity) {
    case 0:
      text_creativity = "Conventional";
      break;
    case 1:
      text_creativity = "Neutral";
      break;
    case 2:
      text_creativity = "Innovative";
      break;
    default:
      break;
  }
  return {
    style: text_style,
    length: text_length,
    creativity: text_creativity,
  };
}

export {
  PaperCraftLoadingText,
  PaperCraftSuggestionText,
  PaperCraftUndoGrammar,
  PaperCraftVersionTone,
  InfoPointStatistics,
};
