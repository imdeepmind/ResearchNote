import React from "react";
import { Layout } from "antd";

import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import CreateNote from "../../components/CreateNote";

const App = () => {
  const deleteAcc = () => {
    console.log("Delete Account");
  };

  const logout = () => {
    console.log("Logout Account");
  };

  const newNote = () => {
    console.log("New Note");
  };

  const openNote = ({ key }) => {
    console.log("Opening page ", key);
  };

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
              newNote,
              allNotes: [
                {
                  title: "Test Note",
                  id: "note_id",
                },
              ],
              openNote,
            }}
          />
          <Layout>
            <Editor />
          </Layout>
        </Layout>
      </Layout>
      <CreateNote state={true} />
    </>
  );
};

export default App;
