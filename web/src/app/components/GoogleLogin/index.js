import React from "react";
import GoogleLogin from "react-google-login";
import { Button } from 'antd';

import { googleLogin } from "../../apis/auth.api";

const GoogleLoginButton = props => {
  const responseGoogle = async (response) => {
    const token = response.accessToken;
    const result = await googleLogin(token);
    if (result.data && result.statusCode === 200) {
      const token = result.data.token;
      localStorage.setItem("id_token", token);
      props.history.push("/notes")
    }
  };

  return (
    <GoogleLogin
      clientId={process.env["REACT_APP_GOOGLE_LOGIN"]}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={renderProps => (
        <Button type="primary" size="large" onClick={renderProps.onClick} disabled={renderProps.disabled} style={{margin: 20, width: 200}}>Get Started</Button>
      )}
    />
  );
};

export default GoogleLoginButton;
