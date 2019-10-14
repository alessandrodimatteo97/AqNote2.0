import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../model/Note.model';
import {URL} from '../constants';
import {DegreeCourse} from "../model/DegreeCourse.model";
import {User} from "../model/User.model";
import {LoginAccount} from "./user.service";
import {FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";
import {JsonArray} from "@angular-devkit/core";
import { HttpResponse } from '@angular/common/http';


export interface CommentToUpdate {
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

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private httpParams: HttpParams) { }

  list(idSubject): Observable<NoteDetailForList[]> {
    const url = `${URL.NOTES}/${idSubject}/`;
    return this.http.get<NoteDetailForList[]>(url);
  }

  showNote(idNote): Observable<Note> {
    const url = `${URL.NOTE_DETAIL}/${idNote}`;
    const result = this.http.get<Note>(url);
    return result;
  }

  showNotesComments(idNote): Observable<CommentToLoad[]> {
    const url = `${URL.LOAD_COMMENT}/${idNote}`; // localhost:12345/api/notes-comments/{idN}
    const result = this.http.get<CommentToLoad[]>(url);
    return result;
  }

  showImage(idN): Observable<string[]> {
    const url = `${URL.SHOW_NOTE}/${idN}`;
    const ciao = this.http.get<string[]>(url);
    return ciao;
  }

  //  const note = `${URL.NOTE_DETAIL}/`;
  // const ciao = this.http.get<ImageData>(note);return ciao;
  updateComment(comment: CommentToUpdate, idNote) {
    const params = new HttpParams()
        .set('comment', comment.comment)
        .set('stars', comment.stars);
    const url = `${URL.UPDATE_COMMENT}/${idNote}`;
    console.log(url);
    return this.http.post(url, params);
  }

  public uploadFormData(formData) {
    const subjectUrl = `${URL.UPLOAD_NOTE}`;  // da mettere in costants

    return this.http.post(subjectUrl, formData);
  }

  alreadyCommented(user: Observable<User>, idNote): Observable<any> {
    const url = `${URL.ALREADY_COMMENTED}/${idNote}`;
    const result = this.http.get<any>(url);
    return result;
  }
  loadPhotos(idNote): Observable<PhotoSrc> {
    const url = `${URL.LOAD_PHOTO}/${idNote}`;
    console.log(url);
    const toReturn = this.http.post<PhotoSrc>(url, 'mucchio di nulla');
    return toReturn;
  }
}
  // la lista di noteDetail è in post e anche l'upload delle note

