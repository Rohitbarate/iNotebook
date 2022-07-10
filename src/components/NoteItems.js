import React, { useContext } from 'react';
import './noteitem.css';
import noteContext from '../context/notes/NoteContext';

const NoteItems = (props) => {
    const context = useContext(noteContext);
    const { title,description,tag,_id} = props.note;
    const { deletenote } = context;
    

    //  editingNote =(enote)=>{
    //     setNote(enote.title,enote.description,enote.tag);
    // }
    // const onchange = (e) => {
    //     setEnote({ ...enote, [e.target.name]: e.target.value })
    // }


    return (
        <>
            <div className="card my-3 mx-3 d-flex flex-row" style={{ width: "20rem" }}>
                <div className="card-body">
                    <div className="main">
                        <h5 className="card-etitle">{title}</h5> <span> <h6>{tag}</h6></span>
                    </div>
                    <hr />
                    <p className="card-text">{description}</p>
                </div>
                <div className="side">
                    <i className="fa-solid fa-trash-can" onClick={() => { deletenote(_id) }}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{ props.editingNote(_id); window.scrollTo(0,0)}} ></i>
                </div>

            </div>
             
        </>
    )
}


export default NoteItems;