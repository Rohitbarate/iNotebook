const baseUrl = process.env.REACT_APP_BASEURL;

const getNotes = async (token) => {
  try {
    const res = await fetch(`${baseUrl}/note/getnotes`, {
      method: "GET",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("frontend error : ", error);
  }
};

const addNotes = async (token, note) => {
  // const {title,description,label,deadLine} = note
  try {
    const res = await fetch(`${baseUrl}/note/create`, {
      method: "PUT",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const data = await res.json();
    return data
  } catch (error) {
    console.log("frontend error : ", error);
  }
};
export { getNotes, addNotes };
