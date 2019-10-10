import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import {CommentToLoad, CommentToUpdate, NoteService, PhotoSrc} from '../../services/note.service';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {Note} from '../../model/Note.model';
import {Observer} from 'rxjs';
import { Directive, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {User} from "../../model/User.model";

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  private note: Observable<Note>;
  private photos: Observable<PhotoSrc>;
  base64Image: any;
  public post: any = {color1: '', color2: '', color3: '', color4: '', color5: ''};
  public numberStar: number;
  private formComment: FormGroup;
  private comments: Observable<CommentToLoad[]>;
  private userLogged$: Observable<User>;
  private alreadyCommented$: Observable<boolean>;

  constructor(private modalController: ModalController, private userService: UserService,
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
    this.formComment = new FormGroup({
      title: new FormControl(),
      comment: new FormControl(),
      stars: new FormControl()
    });
    this.userLogged$ = this.userService.getUtente();
    this.activateRoute.queryParams.subscribe(params => {
      this.photos = this.noteService.loadPhotos(params.idN);
      this.alreadyCommented$ = this.noteService.alreadyCommented(this.userLogged$, params.idN);
      this.alreadyCommented$.subscribe(res => {
        console.log(res);
      });
    });
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
    this.formComment.patchValue({ stars: this.numberStar});
    console.log(this.formComment);
    console.log(this.formComment.getRawValue());
  }

  starTwo(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 2;
    this.formComment.patchValue({ stars: this.numberStar});
    console.log(this.formComment.getRawValue());
  }

  starThree(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = 'primary';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 3;
    this.formComment.patchValue({ stars: this.numberStar});
  }

  starFour(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = 'primary';
    this.post.color4 = 'primary';
    this.post.color5 = '';
    this.numberStar = 4;
    this.formComment.patchValue({ stars: this.numberStar});
  }

  starFive(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = 'primary';
    this.post.color4 = 'primary';
    this.post.color5 = 'primary';
    this.numberStar = 5;
    this.formComment.patchValue({ stars: this.numberStar});
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
    this.activateRoute.queryParams.subscribe(params => {
    this.noteService.updateComment(comment, params.idN).subscribe(res  => {
      this.formComment.setValue({title: '', comment: '' , stars: this.numberStar});
      console.log(res);
      this.loadComments();
    });
    });

  }

  loadDetails() {
    this.activateRoute.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log(params.idN);
      this.note = this.noteService.showNote(params.idN);
      console.log(this.note);
      this.note.subscribe(resp => {
        console.log(resp);
      });
    });
  }

  loadComments() {
    this.activateRoute.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log("commenti");
      this.comments = this.noteService.showNotesComments(params.idN);
      this.comments.subscribe(res => {
        console.log(res);
      });
    });
  }
}
