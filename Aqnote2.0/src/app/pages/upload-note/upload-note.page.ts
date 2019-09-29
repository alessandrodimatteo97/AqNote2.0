import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-upload-note',
  templateUrl: './upload-note.page.html',
  styleUrls: ['./upload-note.page.scss'],
})
export class UploadNotePage implements OnInit {
  private signUpFormModel: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.signUpFormModel = new FormGroup({
      title: new FormControl(''), // da aggiungere
      description: new FormControl(''),
    });
  }

  processForm(){
    this.router.navigate(['tabs/upload-note/upload-photo']);
  }

}
