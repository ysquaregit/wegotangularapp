import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from '@angular/http';
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-wtp-widget',
    templateUrl: './wtp-widget.component.html',
    styleUrls: ['./wtp-widget.component.css']
})
export class WTPWidgetComponent implements OnInit {
    wtpNDF: boolean;

    wtpArray: { name: string, inFlow: number, inFlowDayTot: number, outFlow: number, outFlowDayTot: number, dt: number, offline: number }[] = [];
    @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
    ticks = 0;
    config: any = {
        pagination: '.swiper-pagination',
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        speed: 1400,
        direction: 'horizontal',
        effect: 'slide',
        autoplayDisableOnInteraction: false
    };
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private global: Globals) {


        this.messageService.getWTPData().subscribe(message => {
            console.log('observ WTP');
            console.log(message);
            this.wtpArray = [];

            const d1 = new Date();
            const curdate = d1.getDate();
            const d2 = new Date(message['wtp'][0].dt);
            const dataDate = d2.getDate();
            if (curdate !== dataDate) {
                this.wtpArray.push({
                    name: message['wtp'][0].cust_name,
                    inFlow: message['wtp'][0].cum,
                    inFlowDayTot: 0,
                    outFlow: message['wtp'][1].cum,
                    outFlowDayTot: 0,
                    dt: message['wtp'][0].dt,
                    offline: 1
                });

            } else if (curdate === dataDate) {

                this.wtpArray.push({
                    name: message['wtp'][0].cust_name,
                    inFlow: message['wtp'][0].cum,
                    inFlowDayTot: message['wtp'][0].day_total,
                    outFlow: message['wtp'][1].cum,
                    outFlowDayTot: message['wtp'][1].day_total,
                    dt: message['wtp'][0].dt,
                    offline: 0
                });

            }






        });


    }

    ngOnInit() {
        this.getData('wtp');

        let timer = Observable.timer(5100, 5000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;
            // console.log(this.ticks);
            if (this.usefulSwiper.swiper.activeIndex === this.usefulSwiper.swiper.slides.length - 1) {
                this.usefulSwiper.swiper.slideTo(0);
            } else {
                this.usefulSwiper.swiper.slideNext();
            }
            if (this.ticks === 5) {
                this.getData('wtp');
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
            //console.log(data.json().wtp);
            //this.wtpArray = [{name: '--', inFlow: 0 , outFlow: 0}];
            if (data.json().wtp !== 'NDF') {
                this.wtpNDF = false;
                this.messageService.sendWTPData(data.json().wtp);
            } else {
                this.wtpNDF = true;
            }

        });

    };

}
