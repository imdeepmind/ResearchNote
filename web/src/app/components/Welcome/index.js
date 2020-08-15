import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

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
      <Title>Hello, welcome to Research Notes</Title>
      <Text>
        Research Notes is a ultra minimalistic open source note taking app.
        Click on the "New Note" button to create a new note.
      </Text>
    </div>
  );
};

export default Welcome;
