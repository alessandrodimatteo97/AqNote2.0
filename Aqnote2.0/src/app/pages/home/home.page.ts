import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../model/Subject.model';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {Storage} from '@ionic/storage';
import {ActionSheetController} from '@ionic/angular';
import {CdlService} from '../../services/cdl.service';
import {DegreeCourse} from '../../model/DegreeCourse.model';
import {TranslateService} from '@ngx-translate/core';
import {LinguaService} from '../../services/lingua.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private degreeCourse: string;
    private language: string;

    constructor(private menu: MenuController,
                private userService: UserService,
                private modalController: ModalController,
                private subjectService: SubjectService,
                private storage: Storage,
                private actionSheet: ActionSheetController,
                private cdlService: CdlService,
                private translateService: TranslateService,
                private linguaService: LinguaService) {}

    private subject$: Observable<Subject[]>;
    private cdl$: DegreeCourse[] = [];
    private segment: string;
    private sliderOpts = {
        zoom: false,
        slidesPerView: 1.5,
        spaceBetween: 20,
        centeredSlides: true
    };

    /**
     * IonViewWillEnter ci serve per la lingua nel caso la modifichiamo nella pagina di profilo
     * e andiamo nella home, infatti l'ngOnInit non viene lanciato e verrà richiamato da questa
     * direttiva di Ionic.
     */
    ionViewWillEnter() {
        this.initTranslate();
    }


    ngOnInit() {
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

    async openDc() {
        const actionSheet = await this.actionSheet.create({
            header:  this.degreeCourse,
            buttons:  await this.Cdl()
        });
        await actionSheet.present();
    }

    Cdl() {
        const buttons = [];
        this.cdl$.forEach(res => {
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
        });
        this.translateService.get('SELECTLANGUAGE').subscribe((data: string) => {
            this.language = data;
        });
    }

    async openLanguage() {
        const actionSheet = await this.actionSheet.create({
            header: this.language,
            buttons: [{
                text: 'Italiano',
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
        if (lan === 'it') {
            this.translateService.use(this.linguaService.getLinguaPreferita());
            this.translateService.setDefaultLang(this.linguaService.getLinguaPreferita());
            this.linguaService.updateLingua(this.linguaService.getLinguaPreferita());
            this.initTranslate();
        } else {
            this.translateService.use(this.linguaService.getLingue()['1'].valore);
            this.linguaService.updateLingua(this.linguaService.getLingue()['1'].valore);
            this.translateService.setDefaultLang(this.linguaService.getLingue()['1'].valore);
            this.initTranslate();
        }
    }
}
