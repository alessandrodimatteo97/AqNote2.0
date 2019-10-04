import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {ImageModalPage} from '../image-modal/image-modal.page';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../model/Subject.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private subject$: Observable<Subject[]>;

  constructor(private menu: MenuController, private modalController: ModalController, private subjectService: SubjectService) {
  }
  segment: string;
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  ngOnInit() {
      this.segment = '1';
     this.subject$ = this.subjectService.listHome();
      }
    // this.subjectService.listHome().subscribe




  private activeTabName: string;

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
  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img
      }
    }).then(modal => {
      modal.present();
    });
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


