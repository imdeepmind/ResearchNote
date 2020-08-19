import React from "react";
import { Typography } from "antd";
import GoogleLoginButton from "../../components/GoogleLogin";

const { Title } = Typography;

const Home = (props) => {
  if (localStorage.getItem("id_token")) {
    props.history.push("/notes");
    return null;
  } else {
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
          padding: 10
        }}
      >
        <img
          src={require("../../assets/logo.png")}
          alt="ResearchNotes logo"
          style={{ width: 300 }}
        />
        <Title level={3} type="secondary" style={{ margin: 0 }}>
          Ultra-Minimal Open-Source 100% Free Note Taking App
        </Title>
        <GoogleLoginButton {...props} />
      </div>
    );
  }
};

export default Home;
