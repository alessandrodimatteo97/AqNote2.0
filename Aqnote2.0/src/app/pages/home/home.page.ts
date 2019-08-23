import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import { IonTabs} from '@ionic/angular';
import { ViewChild} from '@angular/core';
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
  private subject$: Observable<any>;

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

     this.subjectService.listHome().subscribe((c ) => {
        console.log(c);
       console.log(c[1]);
      console.log(c[2]);

      });

      }



  private activeTabName: string;

  ionViewWillEnter() {
    this.segment = 'first';
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


