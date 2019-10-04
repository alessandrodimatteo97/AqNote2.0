export const USE_PROXY = false;

export const URL_BASE = USE_PROXY ? '/api' : 'http://10.170.19.61:12345/api';

export const URL = {
    DEPARTMENTS: URL_BASE + '/department',
    CDL: URL_BASE  + '/cdl',
    SUBJECTS: URL_BASE  + '/subjectlist', // localhost:12345/api/department/cdl/year/list/1/1
    NOTES: URL_BASE + '/notesList',
    SIGNUP: URL_BASE + '/signup',
    LOGIN: URL_BASE + '/login',
    PROFILE: URL_BASE + '/profile',
    UPDATE: URL_BASE + '/update',
    SENDPHOTO: URL_BASE + '/8/notes/upload',
    HOME: URL_BASE + '/homepage/informatica',
    FAVOURITE: URL_BASE + '/favourites',
    NAMESFAVOURITES: URL_BASE + '/nameSFavourites',
    NOTE_DETAIL: URL_BASE + '/download',
    SHOW_NOTE: URL_BASE + '/download/45',
    UPDATE_COMMENT: URL_BASE + '/notes/33/comment'


};

export const X_AUTH = 'Authorization';

export const AUTH_TOKEN = 'auth-token';

export const USER_STORAGE = 'utente';

export const LINGUA = 'lingua';
