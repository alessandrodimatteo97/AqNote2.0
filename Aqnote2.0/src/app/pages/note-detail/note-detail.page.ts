import { Component, OnInit } from '@angular/core';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {

  constructor(private modalController: ModalController) { }
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
  }

}
