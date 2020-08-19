import React from "react";
import { Typography } from "antd";
import { Helmet } from "react-helmet";

import "./style.css";

const { Title } = Typography;

const Welcome = () => {
  return (
    <div className="welcome">
      <Helmet>
        <title>{"Notes | Research Notes"}</title>
      </Helmet>
      <Title>Hello, Welcome to Research Notes</Title>
      <Title level={3} className="welcome-para">
        Research Notes is a ultra minimalistic open source note taking app.
        Click on the "New Note" button to create a new note.
      </Title>
    </div>
  );
};

export default Welcome;
