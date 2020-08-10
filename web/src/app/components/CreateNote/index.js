import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";

const CreateNote = (props) => {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const { state, closeModal, onSubmit } = props;

  useEffect(() => {
    setOpen(state);
  }, [state]);

  const handleSubmit = async () => {
    if (onSubmit) {
      const result = await onSubmit({
        title,
      });
    }
    modalClose();
  };

  const modalClose = () => {
    setOpen((open) => false);
    closeModal && closeModal();
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
              { required: true, message: "Please input name for the report" },
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
