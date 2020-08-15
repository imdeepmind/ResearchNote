import React from "react";
import DraftEditor from "draft-js-plugins-editor";
import { Typography } from "antd";

const { Title, Text } = Typography;

const EditorComponent = (props) => {
  const {editorState, handleChange, unsavedData} = props;
  // show loader if editorState is null
  if (!editorState) {
    return (
      <Title
        level={3}
        type="secondary"
        style={{
          width: "100%",
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </Title>
    );
  }

  return (
    <div style={{ margin: "50px 150px" }}>
      <DraftEditor
        spellCheck={true}
        onChange={handleChange}
        editorState={editorState}
      />

      <div style={{ position: "absolute", top: 10, right: 30 }}>
        <Text>{unsavedData ? "Syncing" : "Synced"}</Text>
      </div>
    </div>
  );
}

export default EditorComponent;