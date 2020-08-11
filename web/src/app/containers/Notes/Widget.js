import React from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";

import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import CreateNote from "../../components/CreateNote";
import DeleteWarning from "../../components/DeleteWarning";

import Welcome from "../../components/Welcome";

const Widget = () => {
  return (
    <>
      <Layout>
        <Layout>
          <Sidebar />
          <Layout style={{paddingLeft: 80}}>
            <Route path="/notes/" exact component={Welcome} />
            <Route path="/notes/:id" component={Editor} />
          </Layout>
        </Layout>
      </Layout>
      <CreateNote />
      <DeleteWarning />
    </>
  );
};

export default Widget;
