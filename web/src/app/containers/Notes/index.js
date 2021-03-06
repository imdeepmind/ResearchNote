import React, { useState, useEffect } from "react";

import {
  createNote,
  getAllNotes as getAllNotesAPI,
  getNote as getNoteAPI,
  editNote,
  searchNotes,
  deleteNote,
} from "../../apis/notes.api";

import { getProfile, deleteProfile } from "../../apis/auth.api";

import { NotesProvider } from "../../context/NotesContext";
import { UserProvider } from "../../context/UserContext";

import TopBarProgress from "react-topbar-progress-indicator";

import Widget from "./Widget";
import { confirmDialog } from "../../components/Dialogs";

const isValidCode = (code) => code / 500 < 1;

TopBarProgress.config({
  barColors: {
    "0": "#1890ff",
    "1.0": "#002766",
  },
  shadowBlur: 5,
});

const Notes = (props) => {
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

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
        setError(null);
        setShowLoader(true);
        const result = await getAllNotesAPI(30);
        if (result && isValidCode(result.statusCode)) {
          setAllNotes(result.data || []);
          setShowLoader(false);
          return result;
        }
        setError(
          result && result.message
            ? result.message
            : "Can not load the list of notes"
        );
        setShowLoader(false);
      },
      createNewNote: async (data) => {
        setError(null);
        const result = await createNote(data);
        await notes.funcs.getAllNotes();
        if (result && isValidCode(result.statusCode)) {
          notes.funcs.openNote({ key: result["data"]["_id"]["$oid"] });
          return result;
        }
        setError(
          result && result.message
            ? result.message
            : "Can not create the new note"
        );
      },
      openNote: async ({ key }) => {
        props.history.push(`/notes/${key}`);
      },
      getNote: async (id) => {
        setError(null);
        setShowLoader(true);
        const result = await getNoteAPI(id);
        if (result && isValidCode(result.statusCode)) {
          setShowLoader(false);
          return result;
        }
        setError(
          result && result.message ? result.message : "Can not load the note"
        );
        setShowLoader(false);
      },
      editNote: async (id, data) => {
        setError(null);
        const result = await editNote(id, data);
        if (result && isValidCode(result.statusCode)) {
          return result;
        }
        setError(
          result && result.message
            ? result.message
            : "Can not save the edited note"
        );
      },
      searchNotes: async (key) => {
        setError(null);
        const result = await searchNotes(key);
        if (result && isValidCode(result.statusCode)) {
          return result;
        }
        setError(
          result && result.message ? result.message : "Can not search the notes"
        );
      },
      deleteNote: async (key) => {
        setError(null);
        const result = await deleteNote(key);
        await notes.funcs.getAllNotes();
        props.history.push(`/notes/`);
        return result;
      },
    },
  };

  const user = {
    state: {
      profile,
    },
    funcs: {
      getProfile: async () => {
        setError(null);
        const result = await getProfile();
        if (result && isValidCode(result.statusCode)) {
          await setProfile(result.data);
          return result;
        }
        setError(
          result && result.message
            ? result.message
            : "Can not load the profile data"
        );
      },
      logout: () => {
        localStorage.removeItem("id_token");
        props.history.push(`/`);
      },
      deleteAccount: async () => {
        setError(null);
        const result = await deleteProfile();
        if (result && isValidCode(result.statusCode)) {
          user.funcs.logout();
          return result;
        }
        setError(
          result && result.message
            ? result.message
            : "Can not delete the account"
        );
      },
    },
  };

  useEffect(() => {
    notes.funcs.getAllNotes();
    user.funcs.getProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    confirmDialog("Oops!!", error, null);
    setError(null);
  }

  return (
    <NotesProvider value={notes}>
      <UserProvider value={user}>
        {showLoader && <TopBarProgress />}
        <Widget match={props.match} />
      </UserProvider>
    </NotesProvider>
  );
};

export default Notes;
