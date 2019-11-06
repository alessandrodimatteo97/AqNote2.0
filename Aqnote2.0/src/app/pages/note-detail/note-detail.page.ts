import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import {
  CommentToLoad,
  CommentToUpdate,
  NoteDetail,
  NoteDetailForList,
  NoteService,
  PhotoSrc
} from '../../services/note.service';
import {UserService} from '../../services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Note} from '../../model/Note.model';
import {Observer} from 'rxjs';
import { Directive, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../model/User.model';
import {HttpResponse} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {$e} from "codelyzer/angular/styles/chars";

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  private note: Observable<NoteDetail>;
  private photo$: Observable<string[]>;
  private photos = [];
  base64Image: any;
  public post: any = {color1: '', color2: '', color3: '', color4: '', color5: ''};
  public numberStar: number;
  private formComment: FormGroup;
  private comments: Observable<CommentToLoad[]>;
  private userLogged$: BehaviorSubject<User>;
  private alreadyCommented$: Observable<HttpResponse<boolean>>;
  private commented$: boolean;
  private favButton: string;
  constructor(private modalController: ModalController, private userService: UserService, private modalCtrl: ModalController,
              private noteService: NoteService, private sanitizer: DomSanitizer,
              private elRef: ElementRef, renderer: Renderer2, private activateRoute: ActivatedRoute) { }
  segment = 'detail';
  slideOpts$ = {
    slidesPerView: 2
  };
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
      titleC: new FormControl(),
      comment: new FormControl(),
      stars: new FormControl()
    });
    this.userLogged$ = this.userService.getUtente();
    console.log(this.userLogged$.value.idU);
    this.activateRoute.params.subscribe(params => {
      console.log(params.id);
      this.photo$ = this.noteService.showImage(params.id);
      console.log(params.id);
      this.note = this.noteService.showNote(params.id);
      this.note.subscribe(resp => {
        console.log(resp);
      });
      this.noteService.checkFavourites(this.userLogged$, params.id).subscribe( res => {
        this.favButton = res.body['body'];
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
    this.segment = 'detail';
  }

  starOne(event) {
    this.post.color1 = 'primary';
    this.post.color2 = '';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 1;
    this.formComment.patchValue({ stars: this.numberStar});
  }

  starTwo(event) {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 2;
    this.formComment.patchValue({ stars: this.numberStar});
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

  public async openModal(images, index) {
    console.log(index);
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        value: images,
        otherValue: index
      }
    });
    modal.present();
  }

  transform(c) {
    this.photos.push(this.sanitizer.bypassSecurityTrustResourceUrl(c));
    return this.sanitizer.bypassSecurityTrustResourceUrl(c);
  }

  sendComment(event) {
    const comment: CommentToUpdate = this.formComment.value;
    this.formComment.reset();
    this.post.color1 = '';
    this.post.color2 = '';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 0;
    this.activateRoute.params.subscribe(params => {
    this.noteService.updateComment(comment, params.id).subscribe(res  => {
      this.formComment.setValue({titleC: '', comment: '' , stars: this.numberStar});
      this.loadComments();
    });
    });

  }

  loadDetails() {
    console.log(this.segment);

    this.activateRoute.params.subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log(params.id);
      this.note = this.noteService.showNote(params.id);
      this.note.subscribe(resp => {
        console.log(resp);
      });
      this.noteService.checkFavourites(this.userLogged$, params.id).subscribe( res => {
        this.favButton = res.body['body'];
      });
    });
  }

  loadComments() {
    console.log(this.segment);
    this.activateRoute.params.subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log("commenti");
      this.comments = this.noteService.showNotesComments(params.id);
      this.alreadyCommented$ = this.noteService.alreadyCommented(this.userLogged$, params.id);
      this.alreadyCommented$.subscribe(res => {
        console.log( 'true non commentato, false commentato');
        this.commented$ = res.body['body'];
      });
    });
  }

  addToFavourite($event) {
    console.log(this.favButton);
    if (this.favButton === 'light') {
      this.activateRoute.params.subscribe(params => {
        this.noteService.addToFavourite(this.userLogged$, params.id).subscribe(res => {
          this.favButton = res.body['body'];
        });
      });
    }
    if (this.favButton === 'medium') {
      this.activateRoute.params.subscribe(params => {
        this.noteService.removeFromFavourite(this.userLogged$, params.id).subscribe(res => {
          this.favButton = res.body['body'];
        });
      });
    }
  }
}
