import React, { useState, useEffect, useContext } from "react";
import { Modal, Input, Button, Form } from "antd";
import { Helmet } from "react-helmet";

import NotesContext from "../../context/NotesContext";

import SearchTable from "./SearchTable";

const SearchAllNotes = () => {
  const notes = useContext(NotesContext);

  const { searchModal } = notes["state"];
  const { searchNotes, searchNotesModal, openNote } = notes["funcs"];

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allNotes, setAllNotes] = useState([]);

  const handleSearch = async ({ query }) => {
    setLoading(true);
    if (searchNotes) {
      const result = await searchNotes(query);
      setAllNotes(result.data || []);
    }
    setLoading(false);
  };

  const modalClose = () => {
    setOpen((open) => false);
    searchNotesModal && searchNotesModal();
  };

  useEffect(() => {
    setOpen(searchModal);
  }, [searchModal]);

  const handleOpenNote = (id) => {
    console.log(id);
    modalClose();
    openNote({ key: id });
  };

  return (
    <>
      <Modal
        width={700}
        title="Search Notes"
        visible={open}
        onCancel={modalClose}
        footer={[
          <Button key="back" onClick={modalClose}>
            Cancel
          </Button>,
        ]}
      >
        <Helmet>
          <title>{"Search Notes | Research Notes"}</title>
        </Helmet>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Form name="search_notes" onFinish={handleSearch} layout="inline">
            <Form.Item
              name="query"
              rules={[
                {
                  required: true,
                  message: "Please provide a search query to search",
                },
              ]}
            >
              <Input allowClear={true} type="search" placeholder="Search..." />
            </Form.Item>
            <Form.Item label="" colon={false}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
        <SearchTable
          data={allNotes}
          true={true}
          handleOpenNote={handleOpenNote}
        />
      </Modal>
    </>
  );
};

export default SearchAllNotes;
