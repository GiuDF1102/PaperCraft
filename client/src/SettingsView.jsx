function SettingsView({ settings }) {
  let text_style, text_length, text_creativity;
  switch (settings?.style) {
    case 0:
      text_style = "accessible";
      break;
    case 1:
      text_style = "standard";
      break;
    case 2:
      text_style = "formal";
      break;
    default:
      break;
  }
  switch (settings?.length) {
    case 0:
      text_length = "short";
      break;
    case 1:
      text_length = "medium";
      break;
    case 2:
      text_length = "long";
      break;
    default:
      break;
  }
  switch (settings?.creativity) {
    case 0:
      text_creativity = "conventional";
      break;
    case 1:
      text_creativity = "neutral";
      break;
    case 2:
      text_creativity = "innovative";
      break;
    default:
      break;
  }
  return (
    settings && (
      <span style={{ fontSize: "13px", color: "rgb(114 104 107)" }}>
        Correction generated with <b>style</b>: {text_style}, <b>length</b>:{" "}
        {text_length}, <b>creativity</b>: {text_creativity}
      </span>
    )
  );
}

export { SettingsView };
