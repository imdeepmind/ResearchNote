import React, { useContext, useState, useEffect } from "react";
import { Typography } from "antd";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import DraftEditor from "draft-js-plugins-editor";

import NotesContext from "../../context/NotesContext";

const { Title, Text } = Typography;

let lastInterval = null;

const Editor = (props) => {
  // id of the page
  const id = props.match.params.id;

  // notes content
  const notes = useContext(NotesContext);

  const { getNote, editNote, deleteNote } = notes["funcs"];

  // state
  const [title, setTitle] = useState(null);
  const [editorState, setEditorState] = useState(null);
  const [unsavedData, setUnsavedData] = useState(false);

  // load the initial content
  useEffect(() => {
    const loadContent = async () => {
      const result = await getNote(id);

      if (result && result.data) {
        setTitle(result.data.title);

        if (result.data.content) {
          const data = convertFromRaw(JSON.parse(result.data.content));
          setEditorState(EditorState.createWithContent(data));
        } else {
          setEditorState(EditorState.createEmpty());
        }
      }
    };

    loadContent();
  }, [id]);

  useEffect(() => {
    const saveContent = async () => {
      if (unsavedData === false) return;
      if (editorState === null || title === null) return;

      const contentState = editorState.getCurrentContent();

      const rawObject = JSON.stringify(convertToRaw(contentState));

      const data = {
        title,
        content: rawObject,
      };

      await editNote(id, data);

      setUnsavedData(false);
    };
    if (lastInterval) clearInterval(lastInterval);

    lastInterval = setInterval(saveContent, 5000);
  }, [editorState, id, unsavedData]);

  const handleChange = async (editorState) => {
    setEditorState(editorState);
    setUnsavedData(true);
  };

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
};

export default Editor;
