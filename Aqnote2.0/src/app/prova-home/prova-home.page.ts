import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from '../model/Subject.model';
import {MenuController, ModalController} from '@ionic/angular';
import {SubjectService} from '../services/subject.service';
import {ImageModalPage} from '../pages/image-modal/image-modal.page';

@Component({
  selector: 'app-prova-home',
  templateUrl: './prova-home.page.html',
  styleUrls: ['./prova-home.page.scss'],
})
export class ProvaHomePage implements OnInit {

  constructor(private menu: MenuController, private modalController: ModalController, private subjectService: SubjectService) {
  }
  private subject$: Observable<Subject[]>;
  segment: string;
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };



  private activeTabName: string;

  ngOnInit() {

    this.subject$ = this.subjectService.listHome();
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
    this.menu.enable(true, '1');
    this.menu.open('1');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


}
