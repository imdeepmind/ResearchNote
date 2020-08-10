import React from "react";

const NotesContext = React.createContext();

export const NotesProvider = NotesContext.Provider;
export const NotesConsumer = NotesContext.Consumer;

export default NotesContext;
