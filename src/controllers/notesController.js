import { Notes } from '../models/note.js';
import createHttpError from 'http-errors';

//READ all notes
export const getAllNotes = async (req, res) => {
    const notes = await Notes.find();
    res.status(200).json(notes);
};

//READ by ID
export const getNoteById = async (req, res) => {
    const { noteId } = req.params;
    const note = await Notes.findById(noteId);
    if (!note) {
        throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
};

//CREATE
export const createNote = async (req, res) => {
    const { title, content } = req.body;
    const newNote = new Notes({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
};

//UPDATE
export const updateNote = async (req, res) => {
    const { noteId } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Notes.findByIdAndUpdate(noteId, { title, content }, { new: true });
    if (!updatedNote) {
        throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(updatedNote);
};

//DELETE
export const deleteNote = async (req, res) => {
    const { noteId } = req.params;
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
};