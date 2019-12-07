import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import {CommentToLoad, CommentToUpdate, NoteDetail, NoteService} from '../../services/note.service';
import {UserService} from '../../services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../model/User.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  private note: Observable<NoteDetail>;
  private photo$: Observable<string[]>;
  private photos = [];
  public post: any = {color1: '', color2: '', color3: '', color4: '', color5: ''};
  public numberStar: number;
  private formComment: FormGroup;
  private comments: Observable<CommentToLoad[]>;
  private userLogged$: BehaviorSubject<User>;
  private commented$: boolean;
  private favButton: string;
  private favourite: boolean;
  private idN: string;
  private segment = 'detail';
  private slideOpts$ = {
    slidesPerView: 2.5
  };
  constructor(private modalController: ModalController,
              private userService: UserService,
              private modalCtrl: ModalController,
              private noteService: NoteService,
              private sanitizer: DomSanitizer,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idN = params.id;
      this.userService.isLogged().subscribe(res => {
      if (res.valueOf()){
      this.formComment = new FormGroup({
        titleC: new FormControl(),
        comment: new FormControl(),
        stars: new FormControl()
      });
      this.favourite = true;
      this.userLogged$ = this.userService.getUtente();
      this.photo$ = this.noteService.showImage(params.id);
      this.note = this.noteService.showNote(params.id);
      this.noteService.checkFavourites(this.userLogged$, params.id).subscribe(res => {
      this.favButton = res.body['body'];
        });
      this.comments = this.noteService.showNotesComments(params.id);
      this.noteService.alreadyCommented(this.userLogged$, params.id).subscribe(res => {
        this.commented$ = res.body['body'];
      });
      } else {
      this.favourite = false;
      this.photo$ = this.noteService.showImage(params.id);
      this.note = this.noteService.showNote(params.id);
      this.comments = this.noteService.showNotesComments(params.id);
      this.commented$ = false;
    }
    });

    });



  }
ionViewWillEnter() {
    this.segment = 'detail';
  }

  starOne() {
    this.post.color1 = 'primary';
    this.post.color2 = '';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 1;
    this.formComment.patchValue({ stars: this.numberStar});
  }

  starTwo() {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 2;
    this.formComment.patchValue({ stars: this.numberStar});
  }

  starThree() {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = 'primary';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 3;
    this.formComment.patchValue({ stars: this.numberStar});
  }

  starFour() {
    this.post.color1 = 'primary';
    this.post.color2 = 'primary';
    this.post.color3 = 'primary';
    this.post.color4 = 'primary';
    this.post.color5 = '';
    this.numberStar = 4;
    this.formComment.patchValue({ stars: this.numberStar});
  }

  starFive() {
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

  sendComment() {
    const comment: CommentToUpdate = this.formComment.value;
    this.formComment.reset();
    this.post.color1 = '';
    this.post.color2 = '';
    this.post.color3 = '';
    this.post.color4 = '';
    this.post.color5 = '';
    this.numberStar = 0;
    this.noteService.updateComment(comment, this.idN).subscribe(res  => {
        this.formComment.setValue({titleC: '', comment: '' , stars: this.numberStar});
        this.loadComments();
    });
  }

  loadComments() {
    console.log(this.segment);
    this.comments = this.noteService.showNotesComments(this.idN);
    this.noteService.alreadyCommented(this.userLogged$, this.idN).subscribe(res => {
      this.commented$ = res.body['body'];
    });

  }

  addToFavourite() {
    console.log(this.favButton);
    if (this.favButton === 'light') {
        this.noteService.addToFavourite(this.userLogged$, this.idN).subscribe(res => {
          this.favButton = res.body['body'];
      });
    }
    if (this.favButton === 'medium') {
        this.noteService.removeFromFavourite(this.userLogged$, this.idN).subscribe(res => {
          this.favButton = res.body['body'];
      });
    }
  }
}
