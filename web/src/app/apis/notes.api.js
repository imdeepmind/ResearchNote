import Axios from "./axios.global";

export const createNote = async (title) => {
  try {
    const resp = await Axios.post("/notes/", { title });
    return resp.data;
  } catch (error) {
    console.log("Network error: ", error);
    return error.response.data;
  }
};
