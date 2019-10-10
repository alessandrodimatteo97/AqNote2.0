import { Component, OnInit } from '@angular/core';
import {NoteDetailForList, NoteService} from '../../services/note.service';
import {Note} from '../../model/Note.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.page.html',
  styleUrls: ['./list-notes.page.scss'],
})
export class ListNotesPage implements OnInit {
  private notes$: Observable<NoteDetailForList[]>;
  private notes1: Note[];
  constructor(private noteService: NoteService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.notes$ = this.noteService.list(14); // INIZIALIZZA LE NOTE DELLA MATERIA
  }
}
