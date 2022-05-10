import React, { useContext, useState } from 'react'
import Notes from './Notes'
import noteContext from '../context/notes/NoteContext'

function Home() {
  const context = useContext(noteContext)
  const { addnotes } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const addnoteHandler = (e) => {
    e.preventDefault();
    addnotes(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })

  }

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="container-sm d-flex flex-column align-items-center mt-3">
        <h1 className='text-center'>Add New Note</h1>
        <form className=' addNoteForm mx-4 mb-4' id='form' style={{ width: "60%" }}>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag :</label>
            <input type="text" className="form-control font-weight-bold" id="tag" name='tag' aria-describedby="tagHelp" placeholder='Enter Tag name of your note ex. "Assignment"' value={note.tag} onChange={onchange} />
            {/* <div id="tagHelp" className="form-text">We'll never share your notes with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title :</label>
            <input type="text" className="form-control font-weight-bold" id="title" name='title' placeholder='Enter title of your note' value={note.title} onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor='description' className="form-label">Description :</label>
            <input type="text" className="form-control font-weight-bold" id="description" name='description' placeholder='Enter description of your note' value={note.description} onChange={onchange} />
          </div>
          <button type="submit" className="btn btn-success " onClick={addnoteHandler}>Add Note</button>
        </form>
        <hr />
        <Notes />
      </div>
    </>
  )
}

export default Home