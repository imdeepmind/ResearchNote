import React from "react";

import GoogleLoginButton from "../../components/GoogleLogin";

const Home = props => {
  return (
    <div>
      <GoogleLoginButton {...props} />
    </div>
  );
};

export default Home;
