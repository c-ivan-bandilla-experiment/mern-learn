import BaseService, { BASE_URL } from "./baseService";

class NotesService extends BaseService {
    #baseUrl = `${BASE_URL}/notes`;

    async getAllNotes() {
        return this.api.get(this.#baseUrl);
    }

    async getNoteById(id) {
        return this.api.get(`${this.#baseUrl}/${id}`);
    }

    async createNote(noteData) {
        return this.api.post(this.#baseUrl, noteData);
    }

    async updateNote(id, noteData) {
        return this.api.put(`${this.#baseUrl}/${id}`, noteData);
    }

    async deleteNote(id) {
        return this.api.delete(`${this.#baseUrl}/${id}`);
    }
}
export default new NotesService();