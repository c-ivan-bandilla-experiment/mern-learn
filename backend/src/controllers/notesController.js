import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find();
        res.status(200).json({ data: notes });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving notes" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        const newNote = new Note({
            title,
            content,
        });

        await newNote.save();

        res.status(201).json({ data: newNote });
    } catch (error) {
        console.error("Error creating note:");
    }
}

export async function getNoteByID(req, res) {
    const { id } = req.params;

    try {
        const existingNote = await Note.findById(id);

        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note fetched successfully", data: existingNote });
    } catch (error) {
        console.error("Error fetching note:");
        res.status(500).json({ message: "Error fetching note" });
    }
}

export async function updateNote(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const existingNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note updated successfully", data: existingNote });
    } catch (error) {
        console.error("Error updating note:");
        res.status(500).json({ message: "Error updating note" });
    }
}

export async function deleteNote(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const existingNote = await Note.findByIdAndDelete(id, { title, content }, { new: true });

        if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully", data: existingNote });
    } catch (error) {
        console.error("Error deleting note:");
        res.status(500).json({ message: "Error deleting note" });
    }
}
