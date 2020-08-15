import React from "react";
import DraftEditor from "draft-js-plugins-editor";
import { Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { deleteDialog } from "../../Dialogs";

const { Title, Text } = Typography;

const EditorComponent = (props) => {
  const {editorState, handleChange, unsavedData, deleteNote, id} = props;
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
      <div style={{ position: "absolute", bottom: 10, right: 30 }}>
        <Button
          size="large"
          icon={<DeleteOutlined />}
          onClick={() =>
            deleteDialog(
              "Do you want to delete this note?",
              "There is no way to reverse the action",
              async () => deleteNote(id)
            )
          }
        />
      </div>
    </div>
  );
}

export default EditorComponent;