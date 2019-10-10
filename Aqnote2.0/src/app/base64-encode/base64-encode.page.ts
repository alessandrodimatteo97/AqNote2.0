import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NoteService} from '../services/note.service';
import {Observable} from 'rxjs';
import {ImageModalPage} from '../pages/image-modal/image-modal.page';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-base64-encode',
  templateUrl: './base64-encode.page.html',
  styleUrls: ['./base64-encode.page.scss'],
})
export class Base64EncodePage implements OnInit{
  // Constructor Required
  constructor(private modalCtrl: ModalController, private sanitizer: DomSanitizer, private noteService: NoteService) {}
  private photo$: Observable<string[]>;
  private photos = [];
  // Call this method in the image source, it will sanitize it.
  transform(c) {
    this.photos.push(this.sanitizer.bypassSecurityTrustResourceUrl(c));
    return this.sanitizer.bypassSecurityTrustResourceUrl(c);
  }

  ngOnInit() {
    this.photo$ = this.noteService.showImage('11');
  }
  public async openModal(images, index) {
    console.log(images);
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        value: images,
        otherValue: index
      }
    });
    modal.present();
  }


}
