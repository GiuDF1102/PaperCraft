import { Col, Container, Collapse, Form } from "react-bootstrap";
import { MaterialSymbol } from "react-material-symbols";
import { useState } from "react";
import PropTypes from "prop-types";
import { sendToLogs } from "./utils/api";

Sidebar.propTypes = {
  disabled: PropTypes.bool,
  paperElements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.oneOf(["chat", "document"]),
      sections: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
        }),
      ),
      prompts: PropTypes.arrayOf(
        PropTypes.shape({
          prompt: PropTypes.string,
          answer: PropTypes.string,
          segments: PropTypes.array,
        }),
      ),
    }),
  ),
  selectedPaper: PropTypes.number,
  sectionElements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
  setSelectedPaper: PropTypes.func,
  selectedSection: PropTypes.number,
  setSelectedSection: PropTypes.func,
};

function Sidebar({
  disabled,
  paperElements,
  selectedPaper,
  setSelectedPaper,
  selectedSection,
  setSelectedSection,
  handleFileUpload,
}) {
  const [openPapers, setOpenPapers] = useState(true);
  const [openChats, setOpenChats] = useState(true);
  const [newButton, setNewButton] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setNewButton(!disabled)}
        onMouseLeave={() => setNewButton(false)}
      >
        <NewPaperButton
          setNewPaper={setNewButton}
          newPaper={newButton}
          disabled={disabled}
        />
        <Collapse
          in={newButton}
          onEntered={() => sendToLogs("User hovered on New collapse")}
        >
          <div>
            <div className="inner-collapse-sidebar">
              <label htmlFor="file-upload" className="new-paper-button-select">
                <MaterialSymbol
                  icon="article"
                  className="text-center"
                  size={25}
                  style={{ marginRight: "5px", backgroundColor: "#afc8ad" }}
                />
                <span className="text-center">Upload Document</span>
              </label>
              <Form.Control
                id="file-upload"
                type="file"
                className="d-none"
                onChange={(event) => {
                  sendToLogs("User succesfully uploaded a document");
                  handleFileUpload(event.target.files[0].name);
                }}
              />
              <div className="vr" />
              <div
                className="new-paper-button-select"
                onClick={() => {
                  sendToLogs("User clicked on New Chat");
                  setSelectedPaper(-1);
                }}
              >
                <div className="text-center">
                  <MaterialSymbol
                    icon="chat"
                    size={25}
                    style={{ marginRight: "5px", backgroundColor: "#afc8ad" }}
                    onClick={() => setSelectedPaper(-1)}
                  />
                </div>
                <div className="text-center">
                  <span>New Chat</span>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
      <OpenPapersButton
        isOpenList={openChats}
        setIsOpenList={setOpenChats}
        disabled={disabled}
        name="Chats"
      />
      <Collapse in={openChats}>
        <div id="collapse-papers">
          <Col style={{ display: openChats ? "block" : "none" }}>
            {paperElements
              .map((paper, index) => {
                return (
                  <PaperElement
                    key={index}
                    title={paper.title}
                    isDocument={paper.type === "document"}
                    selectedPaper={selectedPaper}
                    position={index}
                    setSelectedPaper={setSelectedPaper}
                    paperElements={paperElements}
                    setSelectedSection={setSelectedSection}
                    disabled={disabled}
                    selectedSection={selectedSection}
                  />
                );
              })
              .filter((paperElement) => !paperElement.props.isDocument)}
          </Col>
        </div>
      </Collapse>
      <OpenPapersButton
        isOpenList={openPapers}
        setIsOpenList={setOpenPapers}
        disabled={disabled}
        name="Documents"
      />
      <Collapse in={openPapers}>
        <div id="collapse-papers">
          <Col style={{ display: openPapers ? "block" : "none" }}>
            {paperElements
              .map((paper, index) => {
                return (
                  <PaperElement
                    key={index}
                    title={paper.title}
                    isDocument={paper.type === "document"}
                    selectedPaper={selectedPaper}
                    position={index}
                    setSelectedPaper={setSelectedPaper}
                    paperElements={paperElements}
                    setSelectedSection={setSelectedSection}
                    disabled={disabled}
                    sectionElements={paperElements[index].prompts}
                    selectedSection={selectedSection}
                  />
                );
              })
              .filter((paperElement) => paperElement.props.isDocument)}
          </Col>
        </div>
      </Collapse>
      {/* paperElements[selectedPaper]?.type === "document" ? (
        <OpenPapersButton
          isOpenList={openSections}
          setIsOpenList={setOpenSections}
          disabled={disabled}
          name="Sections"
        />
      ) : (
        <></>
      )*/}
    </>
  );
}

NewPaperButton.propTypes = {
  setNewPaper: PropTypes.func,
  newPaper: PropTypes.bool,
  disabled: PropTypes.bool,
};
function NewPaperButton({ setNewPaper, newPaper, disabled }) {
  return (
    <Container
      className="d-flex justify-content-between new-paper-button"
      style={{
        borderBottomLeftRadius: newPaper ? "0px" : "4px",
        borderBottomRightRadius: newPaper ? "0px" : "4px",
      }}
      // onClick={disabled ? () => {} : () => { setNewPaper(!newPaper) }}
      aria-controls="collapse-menu"
      aria-expanded={newPaper}
    >
      <span style={{ color: `${disabled ? "#7a7a7a" : "#000000"}` }}>New</span>
      <span>
        <MaterialSymbol
          icon="edit_square"
          size={20}
          style={{
            color: `${disabled ? "#7a7a7a" : "#000000"}`,
          }}
          color="black"
        />
      </span>
    </Container>
  );
}

OpenPapersButton.propTypes = {
  name: PropTypes.string,
  isOpenList: PropTypes.bool,
  setIsOpenList: PropTypes.func,
  disabled: PropTypes.bool,
};
function OpenPapersButton({
  name,
  isOpenList: openPapers,
  setIsOpenList: setOpenPapers,
  disabled,
}) {
  return (
    <Container
      className="d-flex justify-content-between"
      style={{
        paddingBottom: "5px",
        backgroundColor: "transparent",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: "10px",
        cursor: disabled ? "default" : "pointer",
        userSelect: "none",
      }}
      onClick={
        disabled
          ? () => {}
          : () => {
              setOpenPapers(!openPapers);
            }
      }
    >
      <span
        style={{
          color: `${disabled ? "#7a7a7a" : "#000000"}`,
          textDecoration: "underline",
          fontSize: "18px",
        }}
      >
        {name}
      </span>
      <MaterialSymbol
        icon="expand_more"
        size={25}
        style={{
          color: `${disabled ? "#7a7a7a" : "#000000"}`,
          transform: openPapers ? "rotate(0deg)" : "rotate(-90deg)",
          transition: "transform 0.2s",
          backgroundColor: "transparent",
          paddingRight: "0px",
          paddingLeft: "0px",
          borderWidth: "0px",
        }}
        color="black"
        disabled={disabled}
      />
    </Container>
  );
}

PaperElement.propTypes = {
  title: PropTypes.string,
  position: PropTypes.number,
  isDocument: PropTypes.bool,
  selectedPaper: PropTypes.number,
  setSelectedPaper: PropTypes.func,
  setIsOpenSections: PropTypes.func,
};
function PaperElement({
  title,
  position,
  isDocument,
  selectedPaper,
  setSelectedPaper,
  setSelectedSection,
  disabled,
  paperElements,
  sectionElements,
  selectedSection
}) {
  let classN = "";
  if (disabled) {
    if (selectedPaper === position) {
      classN = "paper-element-sidebar-disabled selected-disabled";
    } else {
      classN = "paper-element-sidebar-disabled";
    }
  } else {
    if (selectedPaper === position) {
      classN = "paper-element-sidebar selected";
    } else {
      classN = "paper-element-sidebar";
    }
  }
  return (
    <>
    <Container
      className={`${classN} d-flex align-content-center`}
      onClick={() => {
        if (!disabled) {
          if (position !== selectedPaper) {
            setSelectedSection(0)
          }
          setSelectedPaper(position);
        }
      }}
      title={title}
    >
      <MaterialSymbol
        icon={isDocument ? "article" : "chat"}
        size={25}
        style={{ marginRight: "5px" }}
      />
      <div className="paper-element-text">{title}</div>
    </Container>
      <Collapse in={selectedPaper === position}>
        <div id="collapse-papers">
          <Col style={{ display: selectedPaper === position ? "block" : "none", marginLeft: 20 }}>
            {paperElements[selectedPaper]?.type === "document" &&
              sectionElements?.map((section, index) => {
                return (
                  <SectionElement
                    key={index}
                    title={section.title}
                    section={index}
                    paper={position}
                    setSelectedPaper={setSelectedPaper}
                    selected={selectedPaper === position && selectedSection === index}
                    setSelectedSection={setSelectedSection}
                    disabled={disabled}
                  />
                );
              })}
          </Col>
        </div>
      </Collapse>
    </>
  );
}

SectionElement.propTypes = {
  title: PropTypes.string,
  section: PropTypes.number,
  selectedSection: PropTypes.number,
  setSelectedSection: PropTypes.func,
};
function SectionElement({
  title,
  section,
  paper,
  setSelectedPaper,
  selected,
  setSelectedSection,
  disabled,
}) {
  let classN = "";
  if (disabled) {
    if (selected) {
      classN = "paper-element-sidebar-disabled selected-disabled";
    } else {
      classN = "paper-element-sidebar-disabled";
    }
  } else {
    if (selected) {
      classN = "paper-element-sidebar selected";
    } else {
      classN = "paper-element-sidebar";
    }
  }
  return (
    <Container
      className={`${classN} d-flex align-content-center`}
      onClick={() => {
        if (!disabled) {
          setSelectedSection(section);
          setSelectedPaper(paper);
        }
      }}
      title={title}
    >
      <MaterialSymbol icon={"segment"}
                      size={25}
                      style={{ marginRight: "5px" }}
      />
      <div className="paper-element-text">{title}</div>
    </Container>
  );
}

export { Sidebar };
