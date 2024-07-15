// src/components/NotesList.jsx
import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
const NotesList = ({ user }) => {
  // console.log(user);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:8000/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      // console.log(data);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  const handleDeleteNote = async (id) => {
    try {
      await fetch(`http://localhost:8000/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  return (
    <>
      <ul className="mt-6 flex flex-row flex-wrap">
        <NavLink to={"/create"}>
          <div className="">
            <IoIosAddCircle className="h-[100px] w-[100px]" />
          </div>
        </NavLink>
        {notes &&
          notes.length > 0 &&
          notes.map((note) => (
            <li key={note._id}>
              <div className="min-w-[150px] flex flex-col min-h-[250px]">
                <div className="action text-black">
                  <div className="flex flex-row ">
                    <a
                      className="action-btn text-black"
                      href={`/edit/${note._id}`}
                    >
                      Edit
                    </a>
                    <button
                      className="action-btn  text-black"
                      onClick={() => handleDeleteNote(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="note-title">{note.title}</p>
                <p
                  className="note-content"
                  onClick={() => showFullContent(note.content, note.title)}
                >
                  {note.content}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

const showFullContent = (content, title) => {
  const dialog = document.getElementById("content-dialog");
  dialog.querySelector(".dialog-title").innerText = title;
  dialog.querySelector(".dialog-content").innerText = content;
  dialog.showModal();
};

export default NotesList;
