import React from "react";
import { Layout } from "antd";

import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import CreateNote from "../../components/CreateNote";

import { Route } from "react-router-dom";
import Welcome from "../../components/Welcome";

const Widget = (props) => {
  return (
    <>
      <Layout>
        <Layout>
          <Sidebar profile={props.profile} />
          <Layout>
            <Route path="/notes/" exact component={Welcome} />
            <Route path="/notes/:id" component={Editor} />
          </Layout>
        </Layout>
      </Layout>
      <CreateNote />
    </>
  );
};

export default Widget;
