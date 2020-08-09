import React from "react";
import GoogleLogin from "react-google-login";

import { googleLogin } from "../../apis/auth.api";

const GoogleLoginButton = () => {
  const responseGoogle = async (response) => {
    const token = response.accessToken;
    const result = await googleLogin(token);
    if (result.data && result.statusCode === 200) {
      const token = result.data.token;
      localStorage.setItem("id_token", token);
    }
  };

  return (
    <GoogleLogin
      clientId={process.env["REACT_APP_GOOGLE_LOGIN"]}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
