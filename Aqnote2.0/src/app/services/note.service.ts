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

export interface NoteDetailForList {
  name: string;
  surname: string;
  pages: number;
  comments: number;
  avarage: number;
  idN: number;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private httpParams: HttpParams) { }

  list(idSubject): Observable<NoteDetailForList[]> {
    const noteslUrl = `${URL.NOTES}/${idSubject}/`;
    return this.http.get<NoteDetailForList[]>('http://192.168.1.10:12345/api/notesList/14');
  }

  showNote(idNote): Observable<Note> {
    const url = `${URL.NOTE_DETAIL}/${idNote}`;
    const result =  this.http.get<Note>(url);
    return result;
  }

  showImage(idN): Observable<string[]> {
    const url = `${URL.SHOW_NOTE}/${idN}`;
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
  }

  public uploadFormData(formData) {
    const subjectUrl = `${URL.UPLOAD_NOTE}`;  // da mettere in costants

    return this.http.post(subjectUrl, formData);
  }
}


