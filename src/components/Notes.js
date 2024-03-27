import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'))
            getNote();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    });

    const updateNote = (currentNote) => {
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    };

    const handleClick = (e) => {
        console.log("updating the note");
        editNote(note.id, note.etitle, note.edescription, note.etag);
        e.preventDefault();
        props.showAlert("Note updated successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const notesContainerRef = useRef(null);

    const addNote = () => {
        // Disable scrolling temporarily
        notesContainerRef.current.style.overflow = 'hidden';
        setTimeout(() => {
            notesContainerRef.current.style.overflow = 'auto';
        }, 500); // Adjust the delay as needed

        // Your logic to add a new note
    };

    const ref = useRef(null); // Define ref here

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Launch demo modal
            </button>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                {/* Modal content */}
            </div>

            <div className="row my-3 mb-0">
                <h2>Your Notes</h2>
                <div className="container mx-2" ref={notesContainerRef}>
                    {notes.length === 0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    return (
                        <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                    );
                })}
            </div>
        </>
    );
};

export default Notes;
