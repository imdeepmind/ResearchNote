import React from "react";
import Editor from "../../components/Editor";
import Sidebar from "../../components/Sidebar";

import { Layout } from "antd";

const App = () => {
  return (
    <Layout>
      <Layout>
        <Sidebar />
        <Layout>
          <Editor />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
