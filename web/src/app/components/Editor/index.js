import React, { useContext, useState, useEffect } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import { Button, Typography } from "antd";
import { DeleteOutlined, MenuOutlined } from "@ant-design/icons";

import EditorPad from "./Editor";
import NotesContext from "../../context/NotesContext";
import { deleteDialog } from "../Dialogs";

const { Text, Title } = Typography;

const Editor = (props) => {
  const notes = useContext(NotesContext);

  const id = props.match.params.id;
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const { getNote, editNote, deleteNote } = notes["funcs"];

  const editNoteDebounced = AwesomeDebouncePromise(editNote, 5000);

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
    if (saving || loading) return;
    if (!content.title) return;

    setSaving(true);
    const data = {
      title: content.title,
      content: raw,
    };

    await editNoteDebounced(id, data);
    setSaving(false);
  };

  if (loading) {
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
    <>
      <EditorPad initialValue={content.content} onChange={handleChange} />
      <div style={{ position: "absolute", top: 10, right: 30 }}>
        <Text>{saving ? "Syncing" : "Synced"}</Text>
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
    </>
  );
};

export default Editor;
