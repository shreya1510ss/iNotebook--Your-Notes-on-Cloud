import React from "react";
import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: " ",
    description: "",
    tag: ""
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: " ",description: "",tag: ""});
    props.showAlert("Note added succesfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div  style={{ padding:"10px"}} >
      <div className="container my-5">
        <h2>Add a Note</h2>
        <form className="my-2">
          <div className="form-group my-3">
            <label htmlFor="title" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"

              onChange={onChange}
              minLength={5} required
              value={note.title}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"

              onChange={onChange}
              minLength={5} required
              value={note.description}
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="tag" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary my-2"
            onClick={handleClick}
            disabled={note.title.length<5 || note.description.length<5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
