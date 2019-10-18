import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Note} from '../model/Note.model';
import {AUTH_TOKEN, URL} from '../constants';
import {DegreeCourse} from '../model/DegreeCourse.model';
import {User} from '../model/User.model';
import {LoginAccount} from './user.service';
import {FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';
import {JsonArray} from '@angular-devkit/core';
import { HttpResponse } from '@angular/common/http';
import {Storage} from '@ionic/storage';



export interface CommentToUpdate {
  titleC: string;
  comment: string;
  stars: string;
}

export interface NoteDetailForList {
  name: string;
  surname: string;
  pages: number;
  comments: number;
  avarage: number;
  idN: number;
}

export interface PhotoSrc {
  path: string;
}

export interface CommentToLoad {
  name: string;
  surname: string;
  titleC: string;
  text: string;
  like: string;
}

export interface NoteDetail {
  title: string;
  description: string;
  pages: number;
  comments: number;
  avarage: number;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private httpParams: HttpParams, private storage: Storage) {
  }

  list(nameSubject): Observable<NoteDetailForList[]> {
    const url = `${URL.NOTES}/${nameSubject}/`;
    return this.http.get<NoteDetailForList[]>(url);
  }

  showNote(idNote): Observable<NoteDetail> {
    const url = `${URL.NOTE_DETAIL}/${idNote}`;
    console.log(url);
    const result = this.http.get<NoteDetail>(url);
    return result;
  }

  showNotesComments(idNote): Observable<CommentToLoad[]> {
    const url = `${URL.LOAD_COMMENT}/${idNote}`; // localhost:12345/api/notes-comments/{idN}
    const result = this.http.get<CommentToLoad[]>(url);
    return result;
  }

  showImage(idN): Observable<string[]> {
    const url = `${URL.SHOW_NOTE}/${idN}`;
    const result = this.http.get<string[]>(url);
    return result;
  }

  //  const note = `${URL.NOTE_DETAIL}/`;
  // const ciao = this.http.get<ImageData>(note);return ciao;
  updateComment(comment: CommentToUpdate, idNote) {
    const params = new HttpParams()
        .set('comment', comment.comment)
        .set('stars', comment.stars)
        .set('titleC', comment.titleC);
    console.log(this.storage.get(AUTH_TOKEN));
    const url = `${URL.UPDATE_COMMENT}/${idNote}`;
    console.log(url);
    return this.http.post(url, params);
  }

  public uploadFormData(formData) {
    const subjectUrl = `${URL.UPLOAD_NOTE}`;  // da mettere in costants

    return this.http.post(subjectUrl, formData);
  }

  alreadyCommented(user: BehaviorSubject<User>, idNote): Observable<HttpResponse<boolean>> {
    const url = `${URL.ALREADY_COMMENTED}/${idNote}`;
    const params = new HttpParams()
                  .append('idU', user.value.idU.toString());
    console.log(params);
    console.log(user);
    return this.http.post<boolean>(url, params, {observe: 'response'});
  }

  loadPhotos(idNote): Observable<PhotoSrc> {
    const url = `${URL.LOAD_PHOTO}/${idNote}`;
    const toReturn = this.http.post<PhotoSrc>(url, '');
    return toReturn;
  }

  addToFavourite(user: BehaviorSubject<User>, idNote): Observable<HttpResponse<string>> {
    const url = `${URL.ADD_TO_FAVOURITE}/${idNote}`;
    const params = new HttpParams()
        .append('idU', user.value.idU.toString());
    const toReturn = this.http.post<string>(url, params, {observe: 'response'});
    return toReturn;
  }

  removeFromFavourite(user: BehaviorSubject<User>, idNote): Observable<HttpResponse<string>> {
    const url = `${URL.REMOVE_FAVOURITE}/${idNote}`;
    const params = new HttpParams()
        .append('idU', user.value.idU.toString());
    const toReturn = this.http.post<string>(url, params, {observe: 'response'});
    return toReturn;
  }

  checkFavourites(user: BehaviorSubject<User>, idNote): Observable<HttpResponse<string>> {
    const url = `${URL.CHECK_FAVOURITE}/${idNote}`;
    const params = new HttpParams()
        .append('idU', user.value.idU.toString());
    const toReturn = this.http.post<string>(url, params, {observe: 'response'});
    return toReturn;
  }
}
  // la lista di noteDetail è in post e anche l'upload delle note

