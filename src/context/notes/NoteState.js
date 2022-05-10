import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const initialNotes = []
    const [note, setNote] = useState(initialNotes);
    // API request for get all notes
    const host = 'http://localhost:5000';

    const getnotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchnotes`,
            {
                method: 'GET',
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MTNiZjNkYjQyNjAxNDcyZGZjY2E2In0sImlhdCI6MTY1MTU4ODA4M30.dOg859tPp815H2DPcbQnOJ9CJGqGO7hX4Kd0YwhuXWQ",
                    "Content-Type": "application/json"
                }
            })
        const res = await response.json();
        // console.log(res);
        setNote(res);

    }
    
    // Add note using the API call
    const addnotes = async (title,description,tag) => {
        const response = await fetch(`${host}/api/notes/addnote`,
            {
                method: 'POST',
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MTNiZjNkYjQyNjAxNDcyZGZjY2E2In0sImlhdCI6MTY1MTU4ODA4M30.dOg859tPp815H2DPcbQnOJ9CJGqGO7hX4Kd0YwhuXWQ",
                    "Content-Type": " application/json"
                },
                body: JSON.stringify({title, description, tag})
            });
     const res = await response.json();
     setNote(note.concat(res))
    }


    // edit or update a note
    const editnote = async(title,description,tag,id) => {
const response = await fetch(`${host}/api/notes/updatenote/${id}`,
{
    method:'PUT',
    headers:{
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MTNiZjNkYjQyNjAxNDcyZGZjY2E2In0sImlhdCI6MTY1MTU4ODA4M30.dOg859tPp815H2DPcbQnOJ9CJGqGO7hX4Kd0YwhuXWQ",
        "Content-Type": " application/json"
    },
    body:JSON.stringify({title,description,tag})
})
const note = await response.json();
console.log(note)
// setNote(note.concat(res))



    }
    // delete a note
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,
        {
            method:'DELETE',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MTNiZjNkYjQyNjAxNDcyZGZjY2E2In0sImlhdCI6MTY1MTU4ODA4M30.dOg859tPp815H2DPcbQnOJ9CJGqGO7hX4Kd0YwhuXWQ",
                "Content-Type": " application/json"
            },
        });
        const res = await response.json();
        console.log(res)
        const newNote = note.filter((note)=>{
            return note._id !== id
        })
        setNote(newNote);
    }

    return (
        <NoteContext.Provider value={{ note, deletenote, editnote, getnotes,addnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 