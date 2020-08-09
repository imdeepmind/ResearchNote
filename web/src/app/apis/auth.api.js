import Axios from "./axios.global";

export const googleLogin = async (token) => {
  try {
    const resp = await Axios.post("/auth/google", { access_token: token });
    return resp.data;
  } catch (error) {
    console.log("Network error: ", error);
    return error.response.data;
  }
};

export const getProfile = async () => {
  try {
    const resp = await Axios.get("/auth/");
    return resp.data;
  } catch (error) {
    console.log("Network error: ", error);
    return error.response.data;
  }
};

export const deleteProfile = async () => {
  try {
    const resp = await Axios.delete("/auth/");
    return resp.data;
  } catch (error) {
    console.log("Network error: ", error);
    return error.response.data;
  }
};
