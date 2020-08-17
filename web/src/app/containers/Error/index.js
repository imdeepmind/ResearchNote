import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const Error = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Title>Looks like you're lost</Title>
      <Text>
        Click <Link to="/">here</Link> to go back to the home page
      </Text>
    </div>
  );
};

export default Error;
