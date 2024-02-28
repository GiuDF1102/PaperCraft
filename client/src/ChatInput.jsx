import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { SendButton } from "./SendButton";
import PropTypes from "prop-types";

ChatInput.propTypes = {
  disabled: PropTypes.bool,
  addPrompt: PropTypes.func,
};
function ChatInput({ disabled, addPrompt }) {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Prevent the default behavior of Enter key press
      event.preventDefault();
      submit(text);
    }
  };

  const submit = function (message) {
    addPrompt(message);
    setText("");
  };

  return (
    <>
      <Row className="chat-input">
        <Col style={{ flexGrow: 29, paddingLeft: 0 }}>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Write here the text you want to improve or ask for help..."
            style={{
              resize: "none",
              backgroundColor: `${disabled ? "#f0f0f0" : "#FFFFFF"}`,
              borderColor: `${disabled ? "#c1c1c1" : "#000000"}`,
              color: `${disabled ? "#b9b4b4" : "#000000"}`,
            }}
            className="h-100"
            value={text}
            disabled={disabled}
            onChange={handleTextChange}
            onKeyDown={handleEnterPress}
          />
        </Col>
        <Col className="d-flex align-items-center" style={{ paddingRight: 0 }}>
          <SendButton
            disabled={disabled}
            isSendButtonEnabled={text.trim().length > 0}
            handleSubmit={submit}
            message={text}
          />
        </Col>
      </Row>
    </>
  );
}

export default ChatInput;
