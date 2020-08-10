import React from "react";
import { Layout } from "antd";

import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";
import CreateNote from "../../components/CreateNote";

const Widget = (props) => {
  return (
    <>
      <Layout>
        <Layout>
          <Sidebar profile={props.profile} />
          <Layout>
            <Editor />
          </Layout>
        </Layout>
      </Layout>
      <CreateNote />
    </>
  );
};

export default Widget;
