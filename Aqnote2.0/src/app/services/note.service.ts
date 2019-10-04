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



export interface CommentToUpdate {
  comment: string;
  stars: string;
}
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  list(idSubject): Observable<Note[]> {
    const noteslUrl = `${URL.NOTES}/${idSubject}/`;
    return this.http.get<Note[]>(noteslUrl);
  }

  showNote(): Observable<Note[]> {
    const note = `${URL.NOTE_DETAIL}/`;
    const ciao =  this.http.get<Note[]>(note);
    return ciao;
  }

  showImage(): Observable<string[]> {
    const url = `${URL.SHOW_NOTE}/`;
    const ciao = this.http.get<string[]>(url);
    return ciao;
  }
  //  const note = `${URL.NOTE_DETAIL}/`;
    // const ciao = this.http.get<ImageData>(note);return ciao;
  updateComment(comment: CommentToUpdate) {
    const params = new HttpParams()
        .set('comment', comment.comment)
        .set('stars', comment.stars);
    const url = `${URL.UPDATE_COMMENT}/`;
    return this.http.post('http://10.170.19.61:12345/api/notes/33/comment', params, {observe: 'response'});

    // const loginUpUrl = `${URL.LOGIN}/?${params}`;
    // la lista di noteDetail è in post e anche l'upload delle note
  }
}

