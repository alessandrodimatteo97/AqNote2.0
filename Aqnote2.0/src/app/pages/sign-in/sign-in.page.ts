import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import {LoginAccount, UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs';
import {DegreeCourse} from '../../model/DegreeCourse.model';
import {CdlService} from '../../services/cdl.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit{
  private loginFormModel: FormGroup;
  private cdl$: Observable<DegreeCourse[]>;



  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private router: Router,
              private userService: UserService,
              private storage: Storage,
              private navController: NavController,
              private cdlService: CdlService

  ) {
  }

  ngOnInit() {
    this.cdl$ = this.cdlService.list();
    this.loginFormModel = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  onLogin() {
    const loginAccount: LoginAccount = this.loginFormModel.value;
    this.userService.login(loginAccount).subscribe(() => {
          this.loginFormModel.reset();
          this.navController.navigateRoot(['/tabs/home']); //  + this.userService.getUtente().getValue().cdl_id );
        },
        (err: HttpErrorResponse) => {
          if (err.status) {
            console.error('login request error: ' + err.status);
            this.showLoginError(err.error.toString(), 'Error');
          }
    }

    );


  }
  onDCSelect($event) {
    this.storage.set('cdl', $event.target.value);
  }

  onSignUp() {
    this.router.navigate(['sign-up-page']);
  }


  async showLoginError(errMessage, header) {
    const alert = await this.alertController.create({
      header,
      message: errMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

  navigate() {
    this.router.navigate(['tabs/']);
  }




}
