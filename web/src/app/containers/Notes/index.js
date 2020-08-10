import React, { useState, useEffect } from "react";
import { Layout } from "antd";

import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import CreateNote from "../../components/CreateNote";

import {
  createNote,
  getAllNotes as getAllNotesAPI,
} from "../../apis/notes.api";

import { NotesProvider } from "../../context/NotesContext";

const Notes = (props) => {
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [lastId, setLastId] = useState(null);
  const limit = 100;

  const notes = {
    state: {
      createNoteModal,
      allNotes
    },
    funcs: {
      toggleNotesModal: () => setCreateNoteModal((open) => !open),
      getAllNotes: async () => {
        const result = await getAllNotesAPI(limit, null);
        // setLastId(result.data[result.data.length - 1]._id.$oid);
        setAllNotes(result.data);
      },
      createNewNote: async (data) => {
        const result = await createNote(data);
        await notes.funcs.getAllNotes();
        return result;
      },
      openNote: async (id) => {
        props.history.push(`/notes/${id}`);
      },
    }
  };

  const deleteAcc = () => {
    console.log("Delete Account");
  };

  const logout = () => {
    console.log("Logout Account");
  };

  useEffect(() => {
    notes.funcs.getAllNotes();
  }, []);

  return (
    <>
      <NotesProvider value={notes}>
        <Layout>
          <Layout>
            <Sidebar
              profile={{
                name: "Abhishek Chatterjee",
                logout,
                deleteAcc,
              }}
            />
            <Layout>
              <Editor />
            </Layout>
          </Layout>
        </Layout>
        <CreateNote />
      </NotesProvider>
    </>
  );
};

export default Notes;
