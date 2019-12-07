import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import { UserService} from '../../services/user.service';
import {CdlService} from '../../services/cdl.service';
import {Observable} from 'rxjs';
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
  private uploadUpFormModel: FormGroup;
  private idS: number;

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
     this.s$ = this.subjectService.list2(u.cdl_id);
    });
   this.uploadUpFormModel = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
      subject_id:['', Validators.compose([
        Validators.required
      ])],
    });

  }
  onDCChange() {
    console.log(this.uploadUpFormModel.get('subject_id').value);
    this.idS = this.uploadUpFormModel.get('subject_id').value;
  }
  goOn() {
    console.log(this.idS + 'id subjects');
    const account: Note = this.uploadUpFormModel.value;
    this.noteService.uploadFormData(account).subscribe((idN) => {
          this.router.navigate(['upload-photo', this.idS, idN  ]);
        });
  }

}
