import React, { useState, useEffect } from "react";

import {
  createNote,
  getAllNotes as getAllNotesAPI,
  getNote as getNoteAPI,
  editNote,
} from "../../apis/notes.api";

import { NotesProvider } from "../../context/NotesContext";
import Widget from "./Widget";

const Notes = (props) => {
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
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
      openNote: async ({key}) => {
        props.history.push(`/notes/${key}`);
      },
      getNote: async (id) => {
        const result = await getNoteAPI(id);
        return result;
      },
      editNote: async (id, data) => {
        const result = await editNote(id, data);
        return result;
      }
    }
  };

  useEffect(() => {
    notes.funcs.getAllNotes();
  }, []);

  return (
    <NotesProvider value={notes}>
      <Widget profile={{
        name: "Abhishek"
      }} />
    </NotesProvider>
  );
};

export default Notes;
