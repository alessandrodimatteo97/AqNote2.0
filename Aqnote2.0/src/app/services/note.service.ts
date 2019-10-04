import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../model/Note.model';
import {URL} from '../constants';
import {Subject} from '../model/Subject.model';

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

  public uploadFormData(formData) {
    const subjectUrl = `${URL.UPLOAD_NOTE}`;

    return this.http.post(subjectUrl, formData);
  }
  }

  // la lista di noteDetail è in post e anche l'upload delle note

