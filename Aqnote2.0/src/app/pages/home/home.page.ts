import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../model/Subject.model';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menu: MenuController, private userService: UserService , private modalController: ModalController, private subjectService: SubjectService, private storage: Storage) {
  }
  private subject$: Observable<Subject[]>;
  segment: string;
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };
    // this.subjectService.listHome().subscribe




  private activeTabName: string;

  ngOnInit() {
      this.segment = '1';
      // this.activatedRoute.params.subscribe(p => this.subject$ = this.subjectService.listHome(p.id));
      this.storage.get('cdl').then(cdl => {
          if (cdl === null || cdl === undefined) {
              this.subject$ = this.subjectService.listHome(this.userService.getUtente().getValue().cdl_id);

          } else {
              this.subject$ = this.subjectService.listHome(cdl);

          }
      });
  }

  ionViewWillEnter() {
    this.segment = '1';
  }
  segmentChanged(ev: any) {
    console.log(ev.target.value);
  }
  getSelectedTab(): void {
    console.log('this');
    // this.activeTabName = this.tabs.getSelected();
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


}


