import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../model/Note.model';
import {URL} from '../constants';
import {DegreeCourse} from "../model/DegreeCourse.model";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  list(idSubject) {
    const noteslUrl = `${URL.NOTES}/${idSubject}/`;

    return this.http.get<Note[]>(noteslUrl);
  }

  showNote(): Observable<Note[]> {
    const note = `${URL.NOTE_DETAIL}/`;
    const ciao =  this.http.get<Note[]>(note);
    return ciao;
  }
  //  const note = `${URL.NOTE_DETAIL}/`;
    // const ciao = this.http.get<ImageData>(note);return ciao;
  }

  // la lista di noteDetail è in post e anche l'upload delle note

