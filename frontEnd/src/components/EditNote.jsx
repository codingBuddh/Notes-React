// src/components/EditNote.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams();
  console.log(id);
  const [note, setNote] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setNote(data.note);
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Failed to fetch note.");
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateNote(id, note);
    navigate("/");
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedNote),
      });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, ...updatedNote } : note
        )
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Note</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="note-title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          required
          placeholder="Title"
        />
        <textarea
          className="note-content"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          required
          placeholder="Content"
        />
        <button className="note-action" type="submit">
          Update Note
        </button>
      </form>
      <a className="go-back" href="/">
        Back to Notes
      </a>
    </div>
  );
};

export default EditNote;
