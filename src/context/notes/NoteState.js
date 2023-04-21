import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes);
    // state for the edit note
    const [iseditingNote, setIsEditingNote] = useState(false);
    const [enote,setEnote] = useState("")


    // API request for get all notes
    const host = 'http://localhost:5000';

    const getnotes = async (token) => {

        const response = await fetch(`${host}/data/v1/note/getnotes`,
            {
                method: 'GET',
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                }
            })
        const res = await response.json();
        // console.log(res);
        setNotes(res);

    }

    // Add note using the API call
    const addnotes = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`,
            {
                method: 'POST',
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MTNiZjNkYjQyNjAxNDcyZGZjY2E2In0sImlhdCI6MTY1MTU4ODA4M30.dOg859tPp815H2DPcbQnOJ9CJGqGO7hX4Kd0YwhuXWQ",
                    "Content-Type": " application/json"
                },
                body: JSON.stringify({ title, description, tag })
            });
        const res = await response.json();
        setNotes(notes.concat(res))
    }


    // edit or update a note
    const updatenote = async ( title, description, tag, id) => {
       console.log( title, description, tag, enote)
        const response = await fetch(`${host}/api/notes/updatenote/${enote}`,
            {
                method: 'PUT',
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MTNiZjNkYjQyNjAxNDcyZGZjY2E2In0sImlhdCI6MTY1MTU4ODA4M30.dOg859tPp815H2DPcbQnOJ9CJGqGO7hX4Kd0YwhuXWQ",
                    "Content-Type": " application/json"
                },
                body: JSON.stringify({ title, description, tag })
            })
            const note = await response.json();
            let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                console.log(element._id);
              element.title = title;
              element.description = description;
              element.tag = tag; 
              break; 
            }
          }  
          setNotes(newNotes);
    };
    // delete a note
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MTNiZjNkYjQyNjAxNDcyZGZjY2E2In0sImlhdCI6MTY1MTU4ODA4M30.dOg859tPp815H2DPcbQnOJ9CJGqGO7hX4Kd0YwhuXWQ",
                    "Content-Type": " application/json"
                },
            });
        const res = await response.json();
        console.log(res)
        const newNote = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNote);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, deletenote, setIsEditingNote, getnotes, addnotes,setEnote , enote,updatenote,iseditingNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 