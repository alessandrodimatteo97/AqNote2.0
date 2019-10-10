import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import {CommentToUpdate, NoteService} from '../../services/note.service';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {Note} from '../../model/Note.model';
import {Observer} from 'rxjs';
import { Directive, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  private note$: Observable<Note>;
  base64Image: any;
  public post: any = {color1: '', color2: '', color3: '', color4: '', color5: ''};
  public numberStar: number;
  private formComment: FormGroup;

  constructor(private modalController: ModalController,
              private noteService: NoteService, private elRef: ElementRef, renderer: Renderer2, private activateRoute: ActivatedRoute) { }
  segment: string;

  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img
      }
    }).then(modal => {
      modal.present();
    });
  }
  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
    console.log(params.idN);
    this.note$ = this.noteService.showNote(params.idN);
    this.note$.subscribe(resp => {
      console.log(resp);
      console.log(resp[0].description);
      console.log(resp[0].title);
      console.log(resp[0].subject_id);
      console.log(resp[0].user_id);
    });
    });
    /*const imageUrl = 'http://10.170.19.61:12345/api/download';
    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      console.log(base64data);
      this.base64Image = 'data:image/jpg;base64,' + base64data;
    });
    this.formComment = new FormGroup({
      stars: new FormControl(''),
      comment: new FormControl(''),
    });*/
  }
  /*{
     this.noteService.showNote().subscribe(items => {
       items.map(item => {
         console.log(item.title);
         console.log(item.user);
         console.log(item.photos);
         console.log(item.description);
         console.log(item.subject);
       });
     });
  }*/
  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;  img.src = url;
      if (!img.complete) {
          console.log('sei tu?0');
          img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
          img.onerror = (err) => {
              console.log('sei tu?1');
              observer.error(err);
          };
      } else {
          console.log('sei tu?2');
          observer.next(this.getBase64Image(img));
          observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    console.log(dataURL);
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }
ionViewWillEnter() {
    this.segment = 'data';
  }

  starOne(event) {
    this.post.color1 = 'primary';
    this.post.color2 = '';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 1;
    this.formComment.setValue({comment: '' , stars: this.numberStar});
  }

  starTwo(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 2;
    this.formComment.setValue({comment: '' , stars: this.numberStar});
  }

  starThree(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = 'primary';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 3;
    this.formComment.setValue({comment: '' , stars: this.numberStar});
  }

  starFour(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = 'primary';
    this.post.color4 = 'primary';
    this.post.color5 = '';
    this.numberStar = 4;
    this.formComment.setValue({comment: '' , stars: this.numberStar});
  }

  starFive(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = 'primary';
    this.post.color4 = 'primary';
    this.post.color5 = 'primary';
    this.numberStar = 5;
    this.formComment.setValue({comment: '' , stars: this.numberStar});
  }

  sendComment(event) {
    console.log(this.formComment);
    const comment: CommentToUpdate = this.formComment.value;
    this.formComment.reset();
    this.post.color1 = '';
    this.post.color2 = '';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 0;
    this.noteService.updateComment(comment).subscribe(() => {
      this.formComment.setValue({comment: '' , stars: this.numberStar});
    });
  }
}
