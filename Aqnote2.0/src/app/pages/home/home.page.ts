import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../model/Subject.model';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {Storage} from '@ionic/storage';
import {ActionSheetController} from '@ionic/angular';
import {CdlService} from '../../services/cdl.service';
import {map} from 'rxjs/operators';
import {DegreeCourse} from '../../model/DegreeCourse.model';
import {TranslateService} from '@ngx-translate/core';
import {LinguaService} from '../../services/lingua.service';
declare function require(path: string);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private degreeCourse: string;
    private language: string;

    constructor(private menu: MenuController, private userService: UserService, private modalController: ModalController, private subjectService: SubjectService, private storage: Storage, private actionSheet: ActionSheetController, private cdlService: CdlService, private translateService: TranslateService, private linguaService: LinguaService) {
    }

    private subject$: Observable<Subject[]>;
    private cdl$: DegreeCourse[] = [];
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
      this.initTranslate();
      this.segment = '1';
      this.cdlService.list().subscribe(res => res.forEach(Dc => this.cdl$.push(Dc)));
      // this.activatedRoute.params.subscribe(p => this.subject$ = this.subjectService.listHome(p.id));
      this.storage.get('cdl').then(cdl => {
          if (cdl === null || cdl === undefined) {
              this.subject$ = this.subjectService.listHome(this.userService.getUtente().getValue().cdl_id);

          } else {
              this.subject$ = this.subjectService.listHome(cdl);

          }
      });
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

  async openDc() {
    const actionSheet = await this.actionSheet.create({
      header: 'Course Deegree',
      buttons:  await this.Cdl()
    });
    await actionSheet.present();
  }

  Cdl() {
    let buttons = [];
    this.cdl$.forEach(res =>{
      let button = {
          text: res.nameDC,

          handler: () => {
           this.subject$ = this.subjectService.listHome(res.idDC);
           this.storage.set('cdl', res.idDC);
           return true;
          }
        };
        buttons.push(button);

    });


    return buttons;


    }

    initTranslate() {
        this.translateService.get('DEGREECOURSE').subscribe((data: string) => {
            this.degreeCourse = data;
            console.log(data);
        });
        this.translateService.get('SELECTLANGUAGE').subscribe((data: string) => {
            this.language = data;
            console.log(data);
        });
    }

    async openLanguage() {
        const actionSheet = await this.actionSheet.create({
            header: await this.language,
            buttons: [{
                text: 'italiano',
                handler: () => {
                    this.changeLanguage('it');
                }
            }, {
                text: 'English',
                handler: () => {
                    this.changeLanguage('en');
                }
            }]

        });

        await actionSheet.present();
    }


    changeLanguage(lan: string) {
        /*
         this.linguaService.getLinguaAttuale().subscribe(res=>console.log(res));
         console.log(this.linguaService.getLingue()['1'].valore);
         console.log(this.translateService.getDefaultLang());

         */
        if (lan === 'it') {
            this.translateService.use(this.linguaService.getLinguaPreferita());
            this.translateService.setDefaultLang(this.linguaService.getLinguaPreferita());
            this.linguaService.updateLingua(this.linguaService.getLinguaPreferita());
        } else {
            this.translateService.use(this.linguaService.getLingue()['1'].valore);
            this.linguaService.updateLingua(this.linguaService.getLingue()['1'].valore);
            this.translateService.setDefaultLang(this.linguaService.getLingue()['1'].valore);

        }
    }
}


