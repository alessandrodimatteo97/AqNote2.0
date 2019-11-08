import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
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

    this.signUpFormModel = new FormGroup({
      name: new FormControl(''), // da aggiungere
      surname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
      cdl: new FormControl('')
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
        }
        );
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
