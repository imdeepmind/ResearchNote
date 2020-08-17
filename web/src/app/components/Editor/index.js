import React, { useContext, useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Helmet } from "react-helmet";

import NotesContext from "../../context/NotesContext";
import EditorComponent from "./components/Editor";

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
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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

    lastInterval = setInterval(saveContent, 1500);
  }, [editorState, id, unsavedData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = async (editorState) => {
    setEditorState(editorState);
    setUnsavedData(true);
  };

  return (
    <>
      <Helmet>
        <title>{(title ? title : "Loading Notes") + " | Research Notes"}</title>
      </Helmet>
      <EditorComponent
        editorState={editorState}
        handleChange={handleChange}
        unsavedData={unsavedData}
        deleteNote={deleteNote}
        id={id}
      />
    </>
  );
};

export default Editor;
