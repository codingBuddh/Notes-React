import { Note } from "../models/Note.js";

export const getNotes = async (userId) => {
  // console.log("req comming");
  try {
    // const userId = req.user._id;
    // console.log("xfcgvh", userId);
    const notes = await Note.find({ userId });
    // console.log(notes);
    return notes;
  } catch (error) {
    throw error;
  }
};
export const addNote = async (userId, note) => {
  try {
    const newNote = new Note({ userId, ...note });
    await newNote.save();
    return newNote;
  } catch (error) {
    throw error;
  }
};
export const updateNote = async (uid, id, updatedNote) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, userId: uid },
      updatedNote,
      { new: true }
    );
    if (!note) {
      return null;
    }

    return note;
  } catch (error) {
    throw error;
  }
};
export const deleteNote = async (id) => {
  try {
    await Note.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
