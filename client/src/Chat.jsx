import { Container } from "react-bootstrap";
import ChatInput from "./ChatInput";
import { ChatView } from "./ChatView";
import PropTypes from "prop-types";

Chat.propTypes = {
  loading: PropTypes.bool,
  handleApply: PropTypes.func,
  removeCorrection: PropTypes.func,
  addCorrection: PropTypes.func,
  handlePromptSubmission: PropTypes.func,
  setTutorialPhase: PropTypes.func,
  tutorialPhase: PropTypes.bool,
  selectedPaper: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    prompts: PropTypes.arrayOf(
      PropTypes.shape({
        prompt: PropTypes.string,
      }),
    ),
  }),
};

function Chat({
  setTutorialPhase,
  tutorialPhase,
  selectedPaper,
  loading,
  handleApply,
  removeCorrection,
  addCorrection,
  handlePromptSubmission,
  settings,
  setSettings,
}) {
  return (
    <>
      <Container className="d-flex flex-column h-100">
        <ChatView
          setTutorialPhase={setTutorialPhase}
          tutorialPhase={tutorialPhase}
          prompts={selectedPaper.prompts || []}
          loading={loading}
          handleApply={handleApply}
          removeCorrection={removeCorrection}
          addCorrection={addCorrection}
          disabled={tutorialPhase || loading}
          settings={settings}
          setSettings={setSettings}
        />
        <ChatInput
          disabled={tutorialPhase || loading}
          addPrompt={handlePromptSubmission}
        />
      </Container>
    </>
  );
}

export {
  Chat 
};
