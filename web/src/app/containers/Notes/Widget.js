import React from "react";
import { Route } from "react-router-dom";

import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import CreateNote from "../../components/CreateNote";
import SearchAllNotesModal from "../../components/SearchModal";
import Welcome from "../../components/Welcome";

const Widget = (props) => {
  return (
    <>
      <div style={{display: "flex"}}>
        <Sidebar match={props.match}/>
        <div style={{width: "100%"}}>
          <Route path="/notes/" exact component={Welcome} />
          <Route path="/notes/:id" component={Editor} />
        </div>
      </div>
      <CreateNote />
      <SearchAllNotesModal />
    </>
  );
};

export default Widget;