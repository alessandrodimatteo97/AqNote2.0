import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Account} from '../../services/user.service';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.page.html',
  styleUrls: ['./sign-up-page.page.scss'],
})
export class SignUpPagePage implements OnInit {

  private signUpFormModel: FormGroup;


  constructor(
      private formBuilder: FormBuilder,
      private alertController: AlertController,
      private router: Router,
      private userService: UserService
      ) {
  }

  ngOnInit() {
    this.signUpFormModel = new FormGroup({
      name: new FormControl(''), // da aggiungere
      surname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
      cdl: new FormControl('')
    });

  }

  onSignUp() {
    const account: Account = this.signUpFormModel.value;
    this.userService.signUp(account).subscribe(() => {
          this.signUpFormModel.reset();
          this.showLoginError('esegui il login', 'utente creato')
          this.router.navigate(['sign-in']);
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
            console.log('la chiamata è andata a buon fine recchia ')
          }


        }

    );
  }

  async showLoginError(errMessage, header) {
    const alert = await this.alertController.create({
      header,
      message: errMessage,
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
