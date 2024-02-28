import { Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { PaperCraftSuggestionText } from "./PaperCraftDialogs";
import { Popover, Whisper } from "rsuite";
import React, { useState, useEffect, forwardRef } from "react";
import { AnimatedIconPaperCraft } from "./assets/IconPaperCraftAnimated";

const SuggestionPopover = forwardRef((props, ref) => {
  const newProps = { ...props };
  delete newProps.segmentIndex;
  delete newProps.promptIndex;
  delete newProps.removeCorrection;
  delete newProps.handleApply;
  delete newProps.addCorrection;
  delete newProps.closePop;
  delete newProps.setSettings;
  return (
    <Popover
      ref={ref}
      {...newProps}
      arrow={false}
      style={{
        backgroundColor: "transparent",
        boxShadow: "none",
        padding: 0,
        marginTop: 14,
        marginLeft: props.placement === "bottomStart" ? 0 : 10,
        marginRight: props.placement === "bottomStart" ? 10 : 0,
      }}
    >
      <PaperCraftSuggestionText
        placement={props.placement}
        applySuggestion={props.handleApply}
        removeCorrection={props.removeCorrection}
        promptIndex={props.promptIndex}
        segmentIndex={props.segmentIndex}
        segment={props.segment}
        addCorrection={props.addCorrection}
        closePop={props.closePop}
        settings={props.settings}
        setSettings={props.setSettings}
      />
    </Popover>
  );
});

SuggestionPopover.displayName = "SuggestionPopover";
SuggestionPopover.propTypes = {
  placement: PropTypes.string,
  handleApply: PropTypes.func,
  removeCorrection: PropTypes.func,
  promptIndex: PropTypes.number,
  segmentIndex: PropTypes.number,
  segment: PropTypes.object,
  addCorrection: PropTypes.func,
  closePop: PropTypes.func,
};

WhisperWrapper.propTypes = {
  wordNum: PropTypes.number,
  placement: PropTypes.string,
  handleApply: PropTypes.func,
  removeCorrection: PropTypes.func,
  addCorrection: PropTypes.func,
  promptIndex: PropTypes.number,
  segmentIndex: PropTypes.number,
  segment: PropTypes.object,
  splitted_text: PropTypes.arrayOf(PropTypes.string),
  word: PropTypes.string,
  setMouseClickPosition: PropTypes.func,
};

function WhisperWrapper({
  wordNum,
  placement,
  handleApply,
  removeCorrection,
  promptIndex,
  segmentIndex,
  segment,
  addCorrection,
  splitted_text,
  word,
  setMouseClickPosition,
  setScroll,
  settings,
  setSettings,
}) {
  const triggerRef = React.useRef();
  const closePop = () => {
    triggerRef.current.close();
  };
  return (
    <Whisper
      trigger="click"
      enterable
      onEnter={() => setScroll(false)}
      onExit={() => setScroll(true)}
      placement={placement}
      controlId={`control-id-${placement}`}
      ref={triggerRef}
      speaker={
        <SuggestionPopover
          placement={placement}
          handleApply={handleApply}
          removeCorrection={removeCorrection}
          promptIndex={promptIndex}
          segmentIndex={segmentIndex}
          segment={segment}
          addCorrection={addCorrection}
          closePop={closePop}
          settings={settings}
          setSettings={setSettings}
        />
      }
      onClick={(e) => setMouseClickPosition({ x: e.clientX, y: e.clientY })}
    >
      <span>{wordNum === splitted_text.length - 1 ? word : word + " "}</span>
    </Whisper>
  );
}

Text.propTypes = {
  segment: PropTypes.object,
  chatSize: PropTypes.object,
  handleApply: PropTypes.func,
  removeCorrection: PropTypes.func,
  promptIndex: PropTypes.number,
  segmentIndex: PropTypes.number,
  addCorrection: PropTypes.func,
};

function Text({
  segment,
  chatSize,
  handleApply,
  promptIndex,
  segmentIndex,
  removeCorrection,
  addCorrection,
  setScroll,
  settings,
  setSettings,
}) {
  const [placement, setPlacement] = useState("bottomStart");
  const [mouseClickPosition, setMouseClickPosition] = useState({});

  useEffect(() => {
    let distance = mouseClickPosition.x - chatSize.x;
    if (distance + 500 > chatSize.width) {
      setPlacement("bottomEnd");
    } else {
      setPlacement("bottomStart");
    }
  }, [chatSize.width, chatSize.x, mouseClickPosition.x]);

  const text =
    segment.corrections.appliedCorrection === undefined
      ? segment.segment
      : segment.corrections.attempts[segment.corrections.appliedCorrection]
          .text;
  let splitted_text = text.split(" ");

  return (
    <span
      className={
        segment.corrections.appliedCorrection === undefined
          ? "bad-text"
          : "corrected-text"
      }
    >
      {splitted_text.map((element, key) => {
        return (
          <WhisperWrapper
            key={key}
            wordNum={key}
            placement={placement}
            handleApply={handleApply}
            removeCorrection={removeCorrection}
            promptIndex={promptIndex}
            segmentIndex={segmentIndex}
            segment={segment}
            addCorrection={addCorrection}
            splitted_text={splitted_text}
            setMouseClickPosition={setMouseClickPosition}
            word={element}
            setScroll={setScroll}
            settings={settings}
            setSettings={setSettings}
          ></WhisperWrapper>
        );
      })}
    </span>
  );
}

function MessageUser({
  segments,
  answer,
  tone,
  grammar,
  clarity,
  chatSize,
  handleApply,
  removeCorrection,
  promptIndex,
  addCorrection,
  setScroll,
  settings,
  setSettings,
  blinkTone,
  blinkGrammar,
  blinkClarity,
}) {
  return (
    <Row className="chat-message d-flex justify-content-start">
      <IconUser />
      <Col style={{ flexGrow: 29 }}>
        {(answer && segments.length > 1) && (
          <Statistics
            tone={tone}
            grammar={grammar}
            clarity={clarity}
            blinkClarity={blinkClarity}
            blinkGrammar={blinkGrammar}
            blinkTone={blinkTone}
          />
        )}
        {segments.map((segment, key) => {
          if (segment.corrections) {
            return (
              <Text
                key={key}
                segment={segment}
                chatSize={chatSize}
                handleApply={handleApply}
                promptIndex={promptIndex}
                segmentIndex={key}
                removeCorrection={removeCorrection}
                addCorrection={addCorrection}
                setScroll={setScroll}
                settings={settings}
                setSettings={setSettings}
              ></Text>
            );
          } else {
            return <NormalText key={key} text={segment.segment} />;
          }
        })}
      </Col>
      {answer && <MessagePaperCraft bottom={false} text={answer} />}
    </Row>
  );
}
MessageUser.propTypes = {
  prompt: PropTypes.string,
  segments: PropTypes.array.isRequired,
  answer: PropTypes.string,
  tone: PropTypes.number,
  grammar: PropTypes.number,
  clarity: PropTypes.number,
  chatSize: PropTypes.object,
  handleApply: PropTypes.func,
  removeCorrection: PropTypes.func,
  addCorrection: PropTypes.func,
  promptIndex: PropTypes.number,
};

function IconUser() {
  return (
    <Col>
      <Image src={"src/assets/user_circle_icon.png"} className="icon-user" />
    </Col>
  );
}

Statistics.propTypes = {
  tone: PropTypes.number,
  grammar: PropTypes.number,
  clarity: PropTypes.number,
  blinkTone: PropTypes.bool,
  blinkGrammar: PropTypes.bool,
  blinkClarity: PropTypes.bool,
  isUpdate: PropTypes.bool,
};
function Statistics({
  tone,
  grammar,
  clarity,
  blinkTone,
  blinkGrammar,
  blinkClarity,
}) {
  function scoreToText(score) {
    let text;
    switch (score) {
      case 0:
        text = "Very Poor";
        break;
      case 1:
        text = "Poor";
        break;
      case 2:
        text = "Fair";
        break;
      case 3:
        text = "Good";
        break;
      case 4:
        text = "Very Good";
        break;
      case 5:
        text = "Excellent";
        break;
    }
    return text;
  }
  return (
    <Row className="text-user">
      <Col className="statistics">
        <span style={{ fontStyle: "italic" }}>Current Version - </span>
        <span>
          <span className={blinkTone ? "blink" : ""}>
            Tone: {scoreToText(tone)}
          </span>
          ,{" "}
          <span className={blinkGrammar ? "blink" : ""}>
            Grammar: {scoreToText(grammar)}
          </span>
          ,{" "}
          <span className={blinkClarity ? "blink" : ""}>
            Clarity: {scoreToText(clarity)}
          </span>{" "}
        </span>
        {/* <Whisper
          placement="bottomStart"
          trigger="click"
          speaker={
            <Popover
              arrow={false}
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                padding: 0,
              }}
            >
              <InfoPointStatistics />
            </Popover>
          }
        >
          <MaterialSymbol
            style={{ bottom: -4, position: "relative", backgroundColor: "transparent" }}
            icon="info"
            size={18}
            color="#ADADAD"
            onMouseEnter={() => setInfo(true)}
            onMouseLeave={() => setInfo(false)}
          />
        </Whisper> */}
      </Col>
    </Row>
  );
}

NormalText.propTypes = {
  text: PropTypes.string,
};
function NormalText({ text }) {
  return <span className="normal-text">{text}</span>;
}

function MessagePaperCraft({ text, bottom }) {
  return (
    <Row
      className={`${bottom ? "document-message alignBottom mt-auto" : "chat-message"}`}
    >
      <IconPaperCraft animated={false} width={52} height={52} />
      <TextPaperCraft text={text} />
    </Row>
  );
}
MessagePaperCraft.propTypes = {
  text: PropTypes.string,
};

IconPaperCraft.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  animated: PropTypes.bool,
};
function IconPaperCraft({ width, height, animated }) {
  return (
    <Col>
      <AnimatedIconPaperCraft
        animated={animated}
        width={width}
        height={height}
      />
    </Col>
  );
}

TextPaperCraft.propTypes = {
  text: PropTypes.string,
};
function TextPaperCraft({ text }) {
  return (
    <Col className="justify-items-start papercraft-content-col">
      <Row className="papercraft-content">{text}</Row>
    </Col>
  );
}

export {
  MessageUser,
  MessagePaperCraft,
  IconPaperCraft,
  Statistics,
  IconUser,
  Text,
  NormalText,
};
