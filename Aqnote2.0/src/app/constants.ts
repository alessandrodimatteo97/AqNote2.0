export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? '/api' : 'http://10.208.100.85:12345/api';

export const URL = {
    DEPARTMENTS: URL_BASE + '/department',
    CDL: URL_BASE  + '/cdl',
    SUBJECTS: URL_BASE  + '/subjectlist', // localhost:12345/api/department/cdl/year/list/1/1
    NOTES: URL_BASE + '/notesList',
    SIGNUP: URL_BASE + '/signup',
    LOGIN: URL_BASE + '/login',
    PROFILE: URL_BASE + '/profile',
    IMAGEPROFILE: URL_BASE + '/image/profile/download',
    UPLOADIMAGEPROFILE: URL_BASE + '/image/profile/upload',
    UPDATE: URL_BASE + '/update',
    UPLOAD_NOTE: URL_BASE + '/notes/upload',
    HOME: URL_BASE + '/homepage',
    FAVOURITE: URL_BASE + '/favourites',
    NAMESFAVOURITES: URL_BASE + '/nameSFavourites',
    NOTE_DETAIL: URL_BASE + '/notes',
    UPLOAD_PHOTO: URL_BASE + '/photos/upload/',
    SHOW_NOTE: URL_BASE + '/download/',
    UPDATE_COMMENT: URL_BASE + '/notes-update-comment',
    LOAD_PHOTO: URL_BASE + '/notes-photos',
    LOAD_COMMENT: URL_BASE + '/notes-comments',
    ALREADY_COMMENTED: URL_BASE + '/check-commented',
    DELETE_PHOTO: URL_BASE + '/photos/delete',
    ADD_TO_FAVOURITE: URL_BASE + '/add-favourite',
    REMOVE_FAVOURITE: URL_BASE + '/remove-favourite',
    CHECK_FAVOURITE: URL_BASE + '/check-favourite',
    GETNOTESUSER: URL_BASE + '/profile/notes',
    DELETE_NOTE: URL_BASE + '/delete/note',
    GET_USER_COMMENTS: URL_BASE + '/get-user-comments'
};

export const X_AUTH = 'Authorization';

export const AUTH_TOKEN = 'auth-token';

export const USER_STORAGE = 'utente';

export const LINGUA = 'lingua';
