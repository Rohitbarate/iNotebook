import React, { useContext, useState } from "react";
import Notes from "../Notes";
import noteContext from "../../context/notes/NoteContext";
import { Navigate } from "react-router-dom";

function Home({ user }) {
  const context = useContext(noteContext);
  const {
    addnotes,
    enote,
    setIsEditingNote,
    setEnote,
    notes,
    updatenote,
    iseditingNote,
  } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // add note
  const addnoteHandler = (e) => {
    e.preventDefault();
    if (note.description !== "" && note.title !== "" && note.tag !== "") {
      addnotes(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
    } else {
      alert("plz fill the blank");
    }
  };

  // update the note

  const editingNote = (id) => {
    setIsEditingNote(true);
    const editNote = notes.find((curNote) => {
      console.log(curNote._id);
      console.log(id);
      return curNote._id === id;
      // return { ...curNote, title: curNote.title, description: curNote.description, tag: curNote.tag }
    });
    console.log(editNote);
    // console.log(curNote._id );
    setEnote(id);
    setNote({
      title: editNote.title,
      description: editNote.description,
      tag: editNote.tag,
    });
  };
  const updateNoteHandler = (e) => {
    e.preventDefault();
    console.log(enote);
    updatenote(note.title, note.description, note.tag, enote);
    setIsEditingNote(false);
    setNote({ title: "", description: "", tag: "" });
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  if (!user) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <>
        <div className="container-sm d-flex flex-column align-items-center mt-3">
          <h1 className="text-center">Add New Note</h1>
          <form
            className=" addNoteForm mx-4 mb-4"
            id="form"
            style={{ width: "60%" }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag :
              </label>
              <input
                type="text"
                className="form-control font-weight-bold"
                id="tag"
                name="tag"
                aria-describedby="tagHelp"
                placeholder='Enter Tag name of your note ex. "Assignment"'
                value={note.tag}
                onChange={onchange}
                minLength={3}
                required
              />
              {/* <div id="tagHelp" className="form-text">We'll never share your notes with anyone else.</div> */}
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title :
              </label>
              <input
                type="text"
                className="form-control font-weight-bold"
                id="title"
                name="title"
                placeholder="Enter title of your note"
                value={note.title}
                onChange={onchange}
                minLength={3}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description :
              </label>
              <input
                type="text"
                className="form-control font-weight-bold"
                id="description"
                name="description"
                placeholder="Enter description of your note"
                value={note.description}
                onChange={onchange}
                minLength={3}
                required
              />
            </div>
            {!iseditingNote ? (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={addnoteHandler}
              >
                Add Note
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
                onClick={updateNoteHandler}
              >
                Update Note
              </button>
            )}
          </form>
          <hr />
          <Notes editingNote={editingNote} user={user} />
        </div>
      </>
    );
  }
}

export default Home;
