import React, { useContext, useState } from 'react';
import './noteitem.css';
import noteContext from '../context/notes/NoteContext';

const NoteItems = (props) => {
    const context = useContext(noteContext);
    const { note } = props;
    const { deletenote, editnote } = context;
    const [enote, setEnote] = useState({ etitle: note.title , edescription: note.description, etag: note.tag })

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Updating the note...", note)
        editnote(enote.etitle, enote.edescription, enote.etag, enote._id);
        setEnote({ etitle: "", edescription: "", etag: "" })
    }
    const onchange = (e) => {
        setEnote({ ...enote, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className="card my-3 mx-3 d-flex flex-row" style={{ width: "20rem" }}>
                <div className="card-body">
                    <div className="main">
                        <h5 className="card-etitle">{note.title}</h5> <span> <h6>{note.tag}</h6></span>
                    </div>
                    <hr />
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="side">
                    <i className="fa-solid fa-trash-can" onClick={() => { deletenote(note._id) }}></i>
                    {/* <!-- Button trigger modal --> */}
                    <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                </div>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-etitle" id="staticBackdropLabel">Modal etitle</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* form start */}
                                <form className=' addNoteForm mx-4 mb-4' id='edit-form'  >
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag :</label>
                                        <input type="text" value={note.tag} className="form-control font-weight-bold" id="etag" name='etag' aria-describedby="etagHelp" placeholder='Enter Tag name of your note ex. "Assignment"' onChange={onchange} />
                                        {/* <div id="etagHelp" className="form-text">We'll never share your notes with anyone else.</div> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title :</label>
                                        <input type="text" value={note.title} className="form-control font-weight-bold" id="etitle" name='etitle' placeholder='Enter title of your note' onChange={onchange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='edescription' className="form-label">Description :</label>
                                        <input type="text" value={note.description} className="form-control font-weight-bold" id="edescription" name='edescription' placeholder='Enter description of your note' onChange={onchange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default NoteItems;