import React, { useState, useEffect } from "react";

import {
  createNote,
  getAllNotes as getAllNotesAPI,
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
