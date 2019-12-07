import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Account} from '../../services/user.service';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CdlService} from '../../services/cdl.service';
import {Observable} from 'rxjs';
import {DegreeCourse} from '../../model/DegreeCourse.model';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.page.html',
  styleUrls: ['./sign-up-page.page.scss'],
})
export class SignUpPagePage implements OnInit {
  private cdl$: Observable<DegreeCourse[]>;
  private signUpFormModel: FormGroup;


  constructor(
      private formBuilder: FormBuilder,
      private alertController: AlertController,
      private router: Router,
      private userService: UserService,
      private cdlService: CdlService
      ) {
  }

  ngOnInit() {
    // this.cdlService.list().subscribe(p => console.log(p));
    this.cdl$ = this.cdlService.list();

    this.signUpFormModel = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      surname: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      repeatPassword: ['', Validators.compose([
        Validators.required
      ])],
      cdl: ['', Validators.compose([
        Validators.required
      ])]
    });

  }
  onDCChange() {
    // let cdl = this.signUpFormModel.get('cdl').value;
    console.log(this.signUpFormModel.get('cdl').value);
  }
  onSignUp() {
    const account: Account = this.signUpFormModel.value;
    this.userService.signUp(account).subscribe((res) => {
          this.signUpFormModel.reset();
          console.log(res);
          this.router.navigate(['sign-in']);
        },
        (err: HttpErrorResponse) => {
          if (err.status) {
            console.error('login request error: ' + err.status);
            this.showLoginError(err.error.toString(), 'Error');
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


  goToLogin() {
    this.router.navigate(['sign-in']);
  }

}
