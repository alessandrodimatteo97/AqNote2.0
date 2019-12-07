import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from '../../model/Subject.model';
import {Something, SubjectService} from '../../services/subject.service';
import {Storage} from '@ionic/storage';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  private subject$: Observable<any[]>;

  constructor(private subjectService: SubjectService, private storage: Storage, private userService: UserService) { }

  ngOnInit() {
    this.storage.get('cdl').then(cdl => {
      if (cdl === null || cdl === undefined) {
        this.subject$ = this.subjectService.list(this.userService.getUtente().getValue().cdl_id);

      } else {
        this.subject$ = this.subjectService.list(cdl);
      }
    });

  }

}
