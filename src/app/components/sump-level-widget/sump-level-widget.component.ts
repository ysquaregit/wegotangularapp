import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from "@angular/http";
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-sump-level-widget',
    templateUrl: './sump-level-widget.component.html',

    styleUrls: ['./sump-level-widget.component.css']
})
export class SumpLevelWidgetComponent implements OnInit {
    featureEnabled = false;
    sumpLevelArray: { sname: string, level: number, offline: number, dt: number, eqKl: number }[] = [];
    @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
    ticks = 0;
    config: any = {
        pagination: '.swiper-pagination',
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: 10000,
        loop: false,
        speed: 400,
        direction: 'horizontal',
        effect: 'slide',
        autoplayDisableOnInteraction: false
    };
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private global: Globals) {
        this.messageService.getslvlData().subscribe(message => {
            //console.log('observ');
            console.log(message);
            //this.sumpLevelArray = [{sname: '--', level: 0 }];

            this.sumpLevelArray = [];
                for (let i of message['slvl']) {
                    const d1 = new Date();
                    const curdate = d1.getDate();
                    const d2 = new Date(i.dt);
                    const dataDate = d2.getDate();
                    if (curdate !== dataDate) {
                        if (i.eqKl) {
                            this.sumpLevelArray.push({
                                sname: i.cust_name,
                                level: i.level,
                                offline: 1,
                                dt: i.dt,
                                eqKl: i.eqKl
                            });

                        } else {
                            this.sumpLevelArray.push({
                                sname: i.cust_name,
                                level: i.level,
                                offline: 1,
                                dt: i.dt,
                                eqKl: 0
                            });

                        }
                    } else {
                        if (i.eqKl) {
                            this.sumpLevelArray.push({
                                sname: i.cust_name,
                                level: i.level,
                                offline: 0,
                                dt: i.dt,
                                eqKl: i.eqKl
                            });

                        } else {
                            this.sumpLevelArray.push({
                                sname: i.cust_name,
                                level: i.level,
                                offline: 0,
                                dt: i.dt,
                                eqKl: 0
                            });
                        }
                    }

                }


            //console.log(this.sumpLevelArray);

        });

    }

    ngOnInit() {
        this.getData('slvl');
        let timer = Observable.timer(1040, 5000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;
            // console.log(this.ticks);
            // if (this.usefulSwiper.swiper.activeIndex === this.usefulSwiper.swiper.slides.length - 1) {
            //  this.usefulSwiper.swiper.slideTo(0);
            // } else {
            //     this.usefulSwiper.swiper.slideNext();
            //  }

            if (this.ticks === 5) {
                this.getData('slvl');
                this.ticks = 0;
            }


        });
    }

    getData(route: string) {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let timeStamp = +new Date();
        this.http.get(this.apiServer + '/sa/saPrimeDash/' + route + '/' + sessionStorage.getItem('sid') + '?' + timeStamp, {headers: headers}).subscribe(data => {
            //console.log(data.json().slvl);
            // this.sumpLevelArray = [{sname: 'one', level: 1}];
            if (data.json().slvl !== 'NDF') {

                if (data.json().slvl[0].status === 1) {
                    this.featureEnabled = true;
                    this.messageService.sendslvlData(data.json().slvl);
                } else {
                    this.featureEnabled = false;
                }

            } else {
                this.featureEnabled = false;
            }
        });
    };

    gonext() {
        this.usefulSwiper.swiper.slideNext();
    }

    goprev() {
        this.usefulSwiper.swiper.slidePrev();
    }


    findIndexToUpdate(newItem) {
        return newItem.id === this;
    }


}
