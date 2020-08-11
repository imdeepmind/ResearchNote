import React, { useContext, useState, useEffect } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import { Button, Typography } from "antd";
import { DeleteOutlined, MenuOutlined } from "@ant-design/icons";

import EditorPad from "./Editor";
import NotesContext from "../../context/NotesContext";

const { Text } = Typography;

const Editor = (props) => {
  const notes = useContext(NotesContext);

  const id = props.match.params.id;
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { getNote, editNote, deleteNote } = notes["funcs"];

  const editNoteDebounced = AwesomeDebouncePromise(editNote, 3000);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await getNote(id);

      setContent(result.data);
      setLoading(false);
    };

    loadData();
  }, [id]);

  const handleChange = async (raw) => {
    setSaving(true);
    const data = {
      title: content.title,
      content: raw,
    };

    const result = await editNoteDebounced(id, data);
    setSaving(false);
  };

  const noteDelete = async () => {
    setDeleteLoading(true);
    if (deleteNote) {
      const id = props.match.params.id;
      await deleteNote(id);
    }
    setDeleteLoading(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <EditorPad initialValue={content.content} onChange={handleChange} />
      <div style={{ position: "absolute", top: 10, right: 30 }}>
        <Text>{saving ? "Syncing" : "Synced"}</Text>
      </div>
      <div style={{ position: "absolute", bottom: 10, right: 30 }}>
        <Button
          size="large"
          icon={<DeleteOutlined />}
          loading={deleteLoading}
          onClick={noteDelete}
        />
      </div>
    </>
  );
};

export default Editor;
