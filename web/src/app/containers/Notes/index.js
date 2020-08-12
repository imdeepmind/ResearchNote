import React, { useState, useEffect } from "react";

import {
  createNote,
  getAllNotes as getAllNotesAPI,
  getNote as getNoteAPI,
  editNote,
  searchNotes,
} from "../../apis/notes.api";

import { getProfile, deleteProfile } from "../../apis/auth.api";

import { NotesProvider } from "../../context/NotesContext";
import { UserProvider } from "../../context/UserContext";

import Widget from "./Widget";

const Notes = (props) => {
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [profile, setProfile] = useState({});
  const limit = 100;

  const notes = {
    state: {
      createNoteModal,
      searchModal,
      allNotes,
    },
    funcs: {
      toggleNotesModal: () => setCreateNoteModal((open) => !open),
      searchNotesModal: () => setSearchModal((open) => !open),
      getAllNotes: async () => {
        const result = await getAllNotesAPI(limit, null);
        // setLastId(result.data[result.data.length - 1]._id.$oid);
        if (result.data) setAllNotes(result.data);
        else setAllNotes([]);
      },
      createNewNote: async (data) => {
        const result = await createNote(data);
        await notes.funcs.getAllNotes();
        return result;
      },
      openNote: async ({ key }) => {
        props.history.push(`/notes/${key}`);
      },
      getNote: async (id) => {
        const result = await getNoteAPI(id);
        return result;
      },
      editNote: async (id, data) => {
        const result = await editNote(id, data);
        return result;
      },
      searchNotes: async (key) => {
        const result = await searchNotes(key);
        return result;
      }
    },
  };

  const user = {
    state: {
      profile,
    },
    funcs: {
      getProfile: async () => {
        const result = await getProfile();
        setProfile(result.data);
      },
      logout: () => {
        localStorage.removeItem("id_token");
        props.history.push(`/`);
      },
      deleteAccount: async () => {
        await deleteProfile();
        user.funcs.logout();
      },
    },
  };

  useEffect(() => {
    notes.funcs.getAllNotes();
    user.funcs.getProfile();
  }, []);

  console.log(searchModal)

  return (
    <NotesProvider value={notes}>
      <UserProvider value={user}>
        <Widget match={props.match}/>
      </UserProvider>
    </NotesProvider>
  );
};

export default Notes;
