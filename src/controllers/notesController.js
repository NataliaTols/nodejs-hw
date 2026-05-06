import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

//READ all notes
export const getAllNotes = async (req, res) => {
    const notes = await Note.find();
    res.status(200).json(notes);
};

//READ by ID
export const getNoteById = async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
        throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
};

//CREATE
export const createNote = async (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
};

//UPDATE
export const updateNote = async (req, res) => {
    const { noteId } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { returnDocument: 'after' });
    if (!updatedNote) {
        throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(updatedNote);
};

//DELETE
export const deleteNote = async (req, res) => {
    const { noteId } = req.params;

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
        throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(deletedNote);
};