import {User} from './User.model';
import {Note} from './Note.model';

export class Comment {
    titleC: string;
    text: string;
    like: number;
    publishedFrom: User;
    note: Note;
}
