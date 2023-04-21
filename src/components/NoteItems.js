import React, { useContext } from "react";
import "./noteitem.css";
import noteContext from "../context/notes/NoteContext";

const NoteItems = (props) => {
  const context = useContext(noteContext);
  const { title, description, label, deadLine } = props.note;
  const { deletenote } = context;

  const daysRemaining = (deadLine) => {
    const latestDate = new Date().getTime();
    const deadLineDate = Date.parse(deadLine);
    const diff = deadLineDate - latestDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  console.log();
  //  editingNote =(enote)=>{
  //     setNote(enote.title,enote.description,enote.tag);
  // }
  // const onchange = (e) => {
  //     setEnote({ ...enote, [e.target.name]: e.target.value })
  // }

  return (
    <>
      <div
        className="card my-3 mx-3 d-flex flex-row"
        style={{ width: "20rem" }}
      >
        <div className="card-body d-flex flex-column">
          <div className="main">
            <h5 className="card-etitle">{title}</h5>{" "}
            <span>
              {" "}
              <h6>{label}</h6>
            </span>
          </div>
          <hr />
          <p className="card-text">{description}</p>
          <hr />
          <p>Deadline : <b>{daysRemaining(deadLine)}</b>  days remaining</p>
        </div>
        <div className="side">
          <i
            className="fa-solid fa-trash-can"
            onClick={() => {
              deletenote();
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              props.editingNote();
              window.scrollTo(0, 0);
            }}
          ></i>
        </div>
      </div>
    </>
  );
};

export default NoteItems;
