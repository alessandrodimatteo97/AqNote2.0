import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../services/note.service';
import {Note} from "../../model/Note.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.page.html',
  styleUrls: ['./list-notes.page.scss'],
})
export class ListNotesPage implements OnInit {
  private notes: Observable<Note[]>;
  private notes1: Note[];
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.notes = this.noteService.list(14);
    this.notes.subscribe(next => {
      console.log(next);
    });
  }

}
