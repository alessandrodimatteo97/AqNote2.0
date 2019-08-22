import {User} from './User.model';
import {DegreeCourse} from './DegreeCourse.model';

export class Note {
    title: string;
    description: string;
    user: User;
    degreeCourse: DegreeCourse;
}
