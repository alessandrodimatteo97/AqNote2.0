import { Component, OnInit } from '@angular/core';
import {NoteDetailForList, NoteService} from '../../services/note.service';
import {Note} from '../../model/Note.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";
@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.page.html',
  styleUrls: ['./list-notes.page.scss'],
})
export class ListNotesPage implements OnInit {
  private notes$: Observable<NoteDetailForList[]>;
  private name: string;

  constructor(private sanitizer: DomSanitizer,
              private noteService: NoteService, private http: HttpClient, private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.name = params.id;
      console.log(params);
      console.log(params.id);
     this.notes$ = this.noteService.list(params.id); // INIZIALIZZA LE NOTE DELLA MATERIA
      this.notes$.subscribe( res => {
        console.log(res);
      });


    });

  }

  transform(c) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(c);
  }
}
