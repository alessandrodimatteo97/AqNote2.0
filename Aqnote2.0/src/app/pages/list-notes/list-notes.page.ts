import { Component, OnInit } from '@angular/core';
import {NoteDetailForList, NoteService} from '../../services/note.service';
import {Note} from '../../model/Note.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.page.html',
  styleUrls: ['./list-notes.page.scss'],
})
export class ListNotesPage implements OnInit {
  private notes$: Observable<NoteDetailForList[]>;
  private name: string;

  constructor(private noteService: NoteService, private http: HttpClient, private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.name = params['key'];
      this.notes$ = this.noteService.list(params['key']); // INIZIALIZZA LE NOTE DELLA MATERIA
    });
  }
}
