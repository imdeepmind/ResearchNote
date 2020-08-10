import React, { useContext, useState, useEffect } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import EditorPad from "./Editor";
import NotesContext from "../../context/NotesContext";

const Editor = (props) => {
  const notes = useContext(NotesContext);

  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);

  const { getNote, editNote } = notes["funcs"];

  const editNoteDebounced = AwesomeDebouncePromise(editNote, 500);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const id = props.match.params.id;
      const result = await getNote(id);

      setContent(result.data);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleChange = async (raw) => {
    const data = {
      title: content.title,
      content: raw
    }

    const id = props.match.params.id;

    const result = await editNoteDebounced(id, data);

    console.log(result);
  };

  console.log(content.content)

  if (loading) {
    return <h1>Loading...</h1>
  }

  return <EditorPad initialValue={content.content} onChange={handleChange} />;
};

export default Editor;
