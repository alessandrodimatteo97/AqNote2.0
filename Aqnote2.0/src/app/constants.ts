export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? '/api' : 'http://10.212.9.84:12345/api';

export const URL = {
    DEPARTMENTS: URL_BASE + '/department',
    CDL: URL_BASE  + '/cdl',
    SUBJECTS: URL_BASE  + '/subjectlist', // localhost:12345/api/department/cdl/year/list/1/1
    NOTES: URL_BASE + '/notesList',
    SIGNUP: URL_BASE + '/signup',
    LOGIN: URL_BASE + '/login',
    PROFILE: URL_BASE + '/profile',
    UPDATE: URL_BASE + '/update',
    UPLOAD_NOTE: URL_BASE + '/notes/upload',
    HOME: URL_BASE + '/homepage/informatica',
    FAVOURITE: URL_BASE + '/favourites',
    NAMESFAVOURITES: URL_BASE + '/nameSFavourites',
    NOTE_DETAIL: URL_BASE + '/notes',
    UPLOAD_PHOTO: URL_BASE + '/photos/upload/',
    SHOW_NOTE: URL_BASE + '/download/',
    UPDATE_COMMENT: URL_BASE + '/notes-update-comment',
    LOAD_PHOTO: URL_BASE + '/notes-photos',
    LOAD_COMMENT: URL_BASE + '/notes-comments',
    ALREADY_COMMENTED: URL_BASE + '/check-commented',
    DELETE_PHOTO: URL_BASE + '/photos/delete'
};

export const X_AUTH = 'Authorization';

export const AUTH_TOKEN = 'auth-token';

export const USER_STORAGE = 'utente';

export const LINGUA = 'lingua';
