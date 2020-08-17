import React from "react";
import { Typography } from "antd";
import { Helmet } from "react-helmet";

import "./style.css";

const { Title } = Typography;

const Welcome = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <Helmet>
        <title>{"Notes | Research Notes"}</title>
      </Helmet>
      <Title>Hello, welcome to Research Notes</Title>
      <Title level={3} className="welcome-para">
        Research Notes is a ultra minimalistic open source note taking app.
        Click on the "New Note" button to create a new note.
      </Title>
    </div>
  );
};

export default Welcome;
