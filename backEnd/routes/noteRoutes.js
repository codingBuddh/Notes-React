import express from "express";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("req");
  try {
    // console.log("req.user.id", req.user.id);
    const notes = await getNotes(req.user.id);

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/",
  [body("note").notEmpty().withMessage("Note content is required")],
  async (req, res) => {
    // console.log(req.body);
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { note } = req.body;
    console.log(note);
    try {
      const newNote = await addNote(req.user.id, note);
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/:noteId",
  [
    param("noteId").isMongoId().withMessage("Invalid note ID"),
    body("note").notEmpty().withMessage("Note content is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const noteId = req.params.noteId;
    const { note: updatedNote } = req.body;
    try {
      const data = await updateNote(req.user.id, noteId, updatedNote);
      if (!data) {
        return res.status(404).json({ error: "Note not found." });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/:noteId",
  [param("noteId").isMongoId().withMessage("Invalid note ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const noteId = req.params.noteId;
      await deleteNote(noteId);
      res.json({ message: "Note deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
