import db from '../models/index.js';
import { Repository } from './repository.js';

class NoteRepository extends Repository {
    constructor() {
        super(db.Note);
    }
}

const noteRepository = new NoteRepository();

export default noteRepository;
