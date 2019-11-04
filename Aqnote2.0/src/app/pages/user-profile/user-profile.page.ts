import { Component, OnInit } from '@angular/core';
import {AccountUpdate, Image, Notes, UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CdlService} from '../../services/cdl.service';
import {Observable} from 'rxjs';
import {DegreeCourse} from '../../model/DegreeCourse.model';
import {AlertController, NavController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {FileUploader, FileLikeObject, FileItem} from 'ng2-file-upload';
import {Note} from '../../model/Note.model';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})

export class UserProfilePage implements OnInit {
  private cdl$: Observable<DegreeCourse[]>;
  private userFormModel: FormGroup;
  private prova;
  private image: Observable<string>;
  private account: AccountUpdate;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  private fullName: string;
  private proof: FileItem;
  private lingue: Lingua[];
  public fileUploader: FileUploader = new FileUploader({});
  private notes$: Observable<Notes[]>;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cdlService: CdlService,
              private alertController: AlertController,
              private sanitizer: DomSanitizer,
              private navController: NavController,
              private linguaService: LinguaService,
              private translateService: TranslateService) {

  }

  segment: string;

  ionViewWillEnter() {
    this.segment = 'data';
  }

  ngOnInit() {
    this.lingue = this.linguaService.getLingue();
    this.cdl$ = this.cdlService.list();
    this.userService.getUtente().subscribe(user => {
      this.image = this.userService.getImage();
      this.notes$ = this.userService.getNotes();
      this.prova = user.cdl_id;
      this.fullName = user.name + ' ' + user.surname;
      this.userFormModel = new FormGroup({
        mail: new FormControl(user.mail),
        OldPassword: new FormControl(),
        Newpassword: new FormControl(),
        cdl_id: new FormControl(user.cdl_id)
      });
    });
    // const authToken = this.userService.getAuthToken();
    //  console.log(authToken);
    //   this.userService.getUtente().subscribe(u=>console.log(u));
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  modify() {
    console.log(this.userFormModel.value);
    this.account = this.userFormModel.value;
    this.userService.update(this.account).subscribe(res => {
      this.userFormModel.value.cdl_id = res.cdl_id;
      // deve aggiornare i valori...
    });
  }

  UploadItem(item) {
    const file = new FileLikeObject(item[0]);
    const formData = new FormData();
    formData.append('file', file.rawFile, file.name);
    this.userService.sendImage(formData).subscribe(res => {
      console.log(res);
    });
    // this.image = this.userService.getImage();
    this.image = null;
    this.proof = this.fileUploader.queue.pop();
  }

  transform(c) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(c);
  }

  navigate(note: Notes, $event) {
    // if($event.target.value)
    // this.navController.navigateRoot('upload-photo/' + note.idS + '/' + note.idN);
    if ($event.target.name == 'create') {
      this.navController.navigateRoot('upload-photo/' + note.idS + '/' + note.idN);
    } else {
      console.log('coglione');
      this.userService.deleteNote(note.idN).subscribe(res => {
        console.log(res);
        this.notes$ = this.userService.getNotes();
      });

    }
  }

  changeLanguage() {
    /*
     this.linguaService.getLinguaAttuale().subscribe(res=>console.log(res));
     console.log(this.linguaService.getLingue()['1'].valore);
     console.log(this.translateService.getDefaultLang());

     */
    if (this.translateService.getDefaultLang() === 'en') {
      this.translateService.use(this.linguaService.getLinguaPreferita());
      this.translateService.setDefaultLang(this.linguaService.getLinguaPreferita());
      this.linguaService.updateLingua(this.linguaService.getLinguaPreferita());
    } else {
      this.translateService.use(this.linguaService.getLingue()['1'].valore);
      this.linguaService.updateLingua(this.linguaService.getLingue()['1'].valore);
      this.translateService.setDefaultLang(this.linguaService.getLingue()['1'].valore);

    }
    //  console.log()


  }
}
