import React, { useEffect, useContext } from "react";
import NoteItems from "./NoteItems";
import NoteContext from "../context/notes/NoteContext";

const Notes = (props) => {
    const noteContext = useContext(NoteContext)
    const { notes, getnotes } = noteContext;
    useEffect(() => {
        getnotes();
        // eslint-disable-next-line
    },[])
    return (
        <>
            <h1 className="text-center">Your Notes</h1>
            <div className="noteContainer d-flex flex-row flex-wrap">
                {notes.map((note) => {
                    return <NoteItems key={note._id} note={note} editingNote={props.editingNote}  />
                })}

            </div>
        </>
    )

}

export default Notes;