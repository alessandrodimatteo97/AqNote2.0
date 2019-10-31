import { Component, OnInit } from '@angular/core';
import {AccountUpdate, Image, MyComment, UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CdlService} from '../../services/cdl.service';
import {Observable} from 'rxjs';
import {DegreeCourse} from '../../model/DegreeCourse.model';
import {AlertController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {FileUploader, FileLikeObject, FileItem} from 'ng2-file-upload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})

export class UserProfilePage implements OnInit {
  private cdl$: Observable<DegreeCourse[]>;
  private comments: Observable<MyComment[]>;
  private userFormModel: FormGroup;
  private prova;
  private image: Observable<string>;
  private account: AccountUpdate;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  private fullName: string;
  private proof: FileItem;
  public fileUploader: FileUploader = new FileUploader({});

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cdlService: CdlService,
              private alertController: AlertController,
              private sanitizer: DomSanitizer) {

  }
  segment: string;

  ionViewWillEnter() {
    this.segment = 'data';
  }
  ngOnInit() {
    this.comments = this.userService.getUserComments();
    this.comments.subscribe(res => {
      console.log(res);
    });
    this.cdl$ = this.cdlService.list();
    this.userService.getUtente().subscribe(user => {
      this.image = this.userService.getImage();
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
    let file = new FileLikeObject(item[0]);
    const formData = new FormData();
    formData.append('file', file.rawFile, file.name);
    this.userService.sendImage(formData).subscribe(res=>{
      console.log(res);
          });
   // this.image = this.userService.getImage();
    this.image = null;
    this.proof = this.fileUploader.queue.pop();
  }

  transform(c) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(c);
  }
}
