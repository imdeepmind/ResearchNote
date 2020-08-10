import React from "react";

import GoogleLoginButton from "../../components/GoogleLogin";

const Home = (props) => {
  if (localStorage.getItem("id_token")) {
    props.history.push("/notes");
    return null;
  } else {
    return (
      <div>
        <GoogleLoginButton {...props} />
      </div>
    );
  }
};

export default Home;
