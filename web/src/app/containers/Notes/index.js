import React, { useState, useEffect } from "react";
import { Layout } from "antd";

import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import CreateNote from "../../components/CreateNote";

import { createNote, getAllNotes } from "../../apis/notes.api";

const App = () => {
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [limit, setLimit] = useState(100);
  const [lastId, setLastId] = useState(null);

  const openNewNoteModal = () => {
    setCreateNoteModal(true);
  };

  const closeNewNoteModal = () => {
    console.log("asd")
    setCreateNoteModal(false);
  };

  const deleteAcc = () => {
    console.log("Delete Account");
  };

  const logout = () => {
    console.log("Logout Account");
  };

  const newNote = async (data) => {
    const result = await createNote(data);
    await getNotes();
    return result;
  };

  const openNote = ({ key }) => {
    console.log("Opening page ", key);
  };

  const getNotes = async () => {
    const result = await getAllNotes(limit, lastId);
    setLastId(result.data[result.data.length - 1]._id.$oid);
    setNotes(result.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Layout>
        <Layout>
          <Sidebar
            profile={{
              name: "Abhishek Chatterjee",
              logout,
              deleteAcc,
            }}
            notes={{
              newNote: openNewNoteModal,
              allNotes: notes,
              openNote,
            }}
          />
          <Layout>
            <Editor />
          </Layout>
        </Layout>
      </Layout>
      <CreateNote
        state={createNoteModal}
        onSubmit={newNote}
        closeModal={closeNewNoteModal}
      />
    </>
  );
};

export default App;
