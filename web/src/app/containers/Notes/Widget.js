import React from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";

import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import CreateNote from "../../components/CreateNote";
import DeleteWarning from "../../components/DeleteWarning";
import SearchAllNotesModal from "../../components/SearchModal";
import Welcome from "../../components/Welcome";

const { Content } = Layout;

const Widget = (props) => {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar match={props.match}/>
        <Layout className="site-layout">
          <Content>
            <Route path="/notes/" exact component={Welcome} />
            <Route path="/notes/:id" component={Editor} />
          </Content>
        </Layout>
      </Layout>
      <CreateNote />
      <DeleteWarning />
      <SearchAllNotesModal />
    </>
  );
};

export default Widget;