import Axios from "./axios.global";

export const createNote = async (data) => {
  try {
    const resp = await Axios.post("/notes/", data);
    return resp.data;
  } catch (error) {
    console.log("Network error: ", error);
    return error.response.data;
  }
};

export const editNote = async (id, data) => {
  try {
    const resp = await Axios.put("/notes/" + id, data);
    return resp.data;
  } catch (error) {
    console.log("Network error: ", error);
    return error.response.data;
  }
};

export const getAllNotes = async (limit, last_id) => {
  try {
    const url = last_id ? `/notes/${limit}/${last_id}/` : `/notes/${limit}/`;

    const resp = await Axios.get(url);
    return resp.data;
  } catch (error) {
    console.log("Network error: ", error);
    return error.response.data;
  }
};

export const getNote = async (id) => {
  try {
    const resp = await Axios.get(`/notes/${id}`);
    return resp.data;
  } catch (error) {
    console.log("Network error: ", error);
    return error.response.data;
  }
};
