// src/components/AddNote.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNote = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddNote({
      note: {
        title: title,
        content: content,
      },
    });
  };

  const handleAddNote = async (note) => {
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(note),
      });
      const newNote = await response.json();
      navigate("/");
    } catch (error) {
      console.error("Error adding note:", error);
      setError("There was an error adding the note. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add a Note</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          Add Note
        </button>
      </form>
      <a className="inline-block mt-4 text-blue-500 hover:underline" href="/">
        Back to Notes
      </a>
    </div>
  );
};

export default AddNote;
