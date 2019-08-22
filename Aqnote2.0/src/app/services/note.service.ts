import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../model/Note.model';
import {URL} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  list(idSubject) {
    const noteslUrl = `${URL.NOTES}/${idSubject}/`;

    return this.http.get<Note[]>(noteslUrl);
  }
  // la lista di noteDetail è in post e anche l'upload delle note
}
