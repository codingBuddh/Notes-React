import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";

const NotesList = ({ user }) => {
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
      <ul className="mt-6 flex flex-wrap gap-4">
        <NavLink to={"/create"}>
          <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors">
            <IoIosAddCircle className="text-green-500 w-16 h-16" />
          </div>
        </NavLink>
        {notes &&
          notes.length > 0 &&
          notes.map((note) => (
            <li
              key={note._id}
              className="bg-white shadow-md rounded-lg p-4 min-w-[200px] flex flex-col justify-between"
            >
              <div className="flex justify-between mb-4">
                <a
                  className="text-blue-500 hover:underline"
                  href={`/edit/${note._id}`}
                >
                  Edit
                </a>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
              <div
                onClick={() => showFullContent(note.content, note.title)}
                className="cursor-pointer"
              >
                <p className="font-bold text-lg mb-2">{note.title}</p>
                <p className="text-gray-700 cursor-pointer">{note.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <dialog
        id="content-dialog"
        className="centerdialog- rounded-lg p-4 shadow-lg "
      >
        <h2 className="dialog-title font-bold text-xl mb-2"></h2>
        <p className="dialog-content text-gray-700"></p>
        <button
          onClick={() => document.getElementById("content-dialog").close()}
          className="mt-4 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Close
        </button>
      </dialog>
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
