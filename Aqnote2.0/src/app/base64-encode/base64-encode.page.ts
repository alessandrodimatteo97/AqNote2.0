import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NoteService} from '../services/note.service';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-base64-encode',
  templateUrl: './base64-encode.page.html',
  styleUrls: ['./base64-encode.page.scss'],
})
export class Base64EncodePage {
  // Constructor Required
  constructor(private sanitizer: DomSanitizer, private noteService: NoteService) {}
  private photo$: Observable<string[]>;
  private photos = [];
  // Call this method in the image source, it will sanitize it.
  transform(c) {
    this.photos.push(this.sanitizer.bypassSecurityTrustResourceUrl(c));
    return this.sanitizer.bypassSecurityTrustResourceUrl(c);
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.photo$ = this.noteService.showImage(); /*.subscribe(data => {
      //console.log(data);
      //this.photo$[0] = 'data:image/jpg;base64,' + base64data;
      console.log(data);
      this.photo$ = data;
      //return this.sanitizer.bypassSecurityTrustResourceUrl(this.photo$[0]);
    });*/
  }



}
