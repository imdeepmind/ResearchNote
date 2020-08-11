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
        }}
      >
        <Title>Research Notes</Title>
        <Title level={3} type="secondary" style={{ margin: 0 }}>
          A ultra minimal open-source completely free note taking app
        </Title>
        <GoogleLoginButton {...props} />
      </div>
    );
  }
};

export default Home;
