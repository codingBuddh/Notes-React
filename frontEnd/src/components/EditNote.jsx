// src/components/EditNote.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNote = ({ setNotes }) => {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [error, setError] = useState("");
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:8000/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setNote(data);
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
    location.reload();
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      await fetch(`http://localhost:8000/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ note: updatedNote }),
      });
      // setNotes((prevNotes) =>
      //   prevNotes.map((note) =>
      //     note._id === id ? { ...note, ...updatedNote } : note
      //   )
      // );
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="flex justify-center items-top min-h-screen bg-gray-100">
      {note ? (
        <div className="w-full  p-8 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                required
                placeholder="Title"
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                required
                placeholder="Content"
                rows="10"
              />
            </div>
            <button
              className="w-full bg-black text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
              type="submit"
            >
              Update Note
            </button>
          </form>
          <a className="block mt-4 text-blue-500 hover:underline" href="/">
            Back to Notes
          </a>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default EditNote;
