import React, { useEffect, useContext } from "react";
import NoteItems from "./NoteItems";
import NoteContext from "../context/notes/NoteContext";

const Notes = () => {
    const noteContext = useContext(NoteContext)
    const { note, getnotes } = noteContext;
    useEffect(() => {
        getnotes();
    },[])
    return (
        <>
            <h1 className="text-center">Your Notes</h1>
            <div className="noteContainer d-flex flex-row flex-wrap">
                {note.map((note) => {
                    return <NoteItems key={note._id} note={note} />
                })}

            </div>
        </>
    )

}

export default Notes;