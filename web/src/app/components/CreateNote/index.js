import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, Input } from "antd";

import NotesContext from "../../context/NotesContext";

const CreateNote = () => {
  const notes = useContext(NotesContext);

  const { createNoteModal } = notes["state"];
  const { toggleNotesModal, createNewNote } = notes["funcs"];

  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(createNoteModal);
  }, [createNoteModal]);

  const handleSubmit = async () => {
    setLoading(true);
    if (createNewNote) {
      const result = await createNewNote({
        title,
      });
    }
    modalClose();
    setLoading(false);
  };

  const modalClose = () => {
    setOpen((open) => false);
    toggleNotesModal && toggleNotesModal();
  };

  const onFieldChange = (value) => {
    const fieldValue = value && value[0] && value[0].value;
    fieldValue && setTitle(fieldValue);
  };

  return (
    <>
      <Modal
        title="Create a new note"
        visible={open}
        onOk={handleSubmit}
        onCancel={modalClose}
        okText={"Create"}
        confirmLoading={loading}
      >
        <Form
          name="create_note"
          onFinish={handleSubmit}
          onFieldsChange={onFieldChange}
        >
          <Form.Item
            label="Note Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name for the report",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNote;
