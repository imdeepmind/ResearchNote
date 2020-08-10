import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";

const CreateNote = (props) => {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const { state, onSubmit } = props;
  const toggle = () => setOpen((open) => !open);

  useEffect(() => {
    setOpen(state);
  }, [state]);

  const handleSubmit = async () => {
    if (onSubmit) {
      const result = await onSubmit({
        title,
      });

      console.log(result);
    }

    toggle();
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
        onCancel={toggle}
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
