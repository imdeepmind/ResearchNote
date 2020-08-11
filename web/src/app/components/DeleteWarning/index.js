import React, { useState, useEffect, useContext } from "react";
import { Modal, Typography } from "antd";

import UserContext from "../../context/UserContext";

const { Text } = Typography;

const DeleteWarning = () => {
  const user = useContext(UserContext);

  const { deleteWarningModal } = user["state"];
  const { deleteAccount, toggleDeleteWarningModal } = user["funcs"];

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (deleteAccount) {
      const result = await deleteAccount();
    }
    setLoading(false);
    modalClose();
  };

  const modalClose = () => {
    setOpen((open) => false);
    toggleDeleteWarningModal && toggleDeleteWarningModal();
  };

  useEffect(() => {
    setOpen(deleteWarningModal);
  });
  return (
    <>
      <Modal
        title="Delete Profile"
        visible={open}
        onOk={handleSubmit}
        onCancel={modalClose}
        okText={"Delete"}
        confirmLoading={loading}
      >
        <Text>
          This action will delete your account permanently and there is
          ABSOLUTELY no way to recover your account and data back.
        </Text>
      </Modal>
    </>
  );
};

export default DeleteWarning;
