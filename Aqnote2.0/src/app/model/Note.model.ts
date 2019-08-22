import {User} from './User.model';
import {Subject} from './Subject.model';

export class Note {
    title: string;
    description: string;
    user: User;
    subject: Subject;
}
