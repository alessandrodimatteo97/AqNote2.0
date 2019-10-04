import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Account, UserService} from '../../services/user.service';
import {CdlService} from '../../services/cdl.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DegreeCourse} from '../../model/DegreeCourse.model';
import {NoteService} from '../../services/note.service';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../model/Subject.model';
import {Note} from '../../model/Note.model';
@Component({
  selector: 'app-upload-note',
  templateUrl: './upload-note.page.html',
  styleUrls: ['./upload-note.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadNotePage implements OnInit {
  private s$: Observable<Subject[]>;
  private signUpFormModel: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private alertController: AlertController,
      private router: Router,
      private userService: UserService,
      private cdlService: CdlService,
      private noteService: NoteService,
      private subjectService: SubjectService,
  ) {
  }

  ngOnInit() {

   this.userService.getUtente().subscribe(u => {
     this.s$ = this.subjectService.list1(u.cdl_id);
    });
//   console.log(idDC);
   this.signUpFormModel = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      subject_id: new FormControl('')
    });

  }
  onDCChange() {
    console.log(this.signUpFormModel.get('subject_id').value);
  }
  goOn() {
    const account: Note = this.signUpFormModel.value;
    this.noteService.uploadFormData(account).subscribe((Id) => {
          this.signUpFormModel.reset();
          console.log(Id); // stampa l'id della nota appena creata
        //  this.showMessage().then(r => console.log(r));
          this.router.navigate(['/upload-photo', Id]);
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.error('login request error: ' + err.status);
            this.showLoginError(err.error, 'error');
          }
          if (err.status === 501) {
            console.error('login request error: ' + err.status);
            this.showLoginError(err.error, 'error');
          }
          if (err.status === 500) {
            console.error('login request error: ' + err.status);
            this.showLoginError(err.error, 'error');
          }
          if (err.ok) {
            console.log('la chiamata è andata a buon fine recchia ');
          }
        });
  }

  async showLoginError(errMessage, header) {
    const alert = await this.alertController.create({
      header,
      message: errMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showMessage() {
    const alert = await this.alertController.create({

      message: 'Note created, please push ok, for inserting photos',
      buttons: ['OK']
    });

    await alert.present();
  }



  /*
  ionChange($event) {
    console.log($event.target.value);
    this.translate.use($event.target.value);
    this.translate.use($event.target.value);
    this.translate.setDefaultLang($event.target.value);
  }*/

  onLeft() {
    this.router.navigate(['login']);
  }
  /*
    onSubmit() {
      console.warn(this.signupForm.value);
    } */
}
