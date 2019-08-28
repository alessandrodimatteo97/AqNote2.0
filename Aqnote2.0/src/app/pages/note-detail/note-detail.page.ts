import { Component, OnInit } from '@angular/core';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import { NoteService} from '../../services/note.service';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {Note} from '../../model/Note.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  private note$: Observable<Note>;

  constructor(private modalController: ModalController,
              private noteService: NoteService) { }
  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }
  ngOnInit() {
     this.note$ = this.noteService.showNote();
     console.log(this.note$);
  }
   // this.noteService.list(1);
    // this.noteService.showNote();


}
