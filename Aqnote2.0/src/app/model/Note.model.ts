import {User} from './User.model';
import {Subject} from './Subject.model';

export class Note {
    title: string;
    description: string;
    // tslint:disable-next-line:variable-name
    subject_id: string;
    // tslint:disable-next-line:variable-name
    user_id: string;
    // photos: string[];
    pages: string;
    comments: string;
}
