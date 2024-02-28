import React from "react";
import { Nav } from "react-bootstrap";
import "./style.css";
import { MaterialSymbol } from "react-material-symbols";
import { sendToLogs } from "./utils/api";

export const SendButton = ({
  isSendButtonEnabled,
  handleSubmit,
  message,
  disabled,
}) => {
  return (
    <div className="box">
      <Nav.Link
        disabled={disabled}
        className="send-button"
        style={{
          backgroundColor: "#596e5c",
          opacity: isSendButtonEnabled ? 1 : 0.2,
          pointerEvents: isSendButtonEnabled ? "auto" : "none",
        }}
        onClick={() => {
          sendToLogs(`User sent message to chat: "${message}"`);
          handleSubmit(message);
        }}
      >
        <MaterialSymbol icon="send" size={40} color="white" />
      </Nav.Link>
    </div>
  );
};
