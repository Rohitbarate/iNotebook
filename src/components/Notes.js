import React, { useEffect, useContext, useState } from "react";
import NoteItems from "./NoteItems";
import NoteContext from "../context/notes/NoteContext";
import { Navigate } from "react-router-dom";
import { getNotes } from "./noteApi";
import Loader from "./loader/Loader";

const Notes = (props) => {
  const noteContext = useContext(NoteContext);
  //   const {notes, getnotes } = noteContext;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = props.user
    if (!token) {
      return <Navigate replace to={"/login"} />;
    }
    async function fetchNotes() {
      setLoading(true);
      const data = await getNotes(token);
      setNotes(data.notes);
      setLoading(false);
      console.log(data.notes);
    }
    fetchNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1 className="text-center">Your Notes</h1>
      <div className="noteContainer d-flex flex-row flex-wrap">
        {loading ? (
          <Loader />
        ) : notes.length === 0 ? (
          <h5 style={{ textTransform: "capitalize", color: "red" }}>
            you don't have notes
          </h5>
        ) : (
          notes.map((note) => {
            return (
              <NoteItems
                key={note._id}
                note={note.note}
                editingNote={props.editingNote}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Notes;
