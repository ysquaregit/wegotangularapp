import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from "@angular/http";
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-stp-widget',
    templateUrl: './stp-widget.component.html',
    styleUrls: ['./stp-widget.component.css']
})
export class StpWidgetComponent implements OnInit {
    featureEnabled = false;
    stpArray: { name: string, inFlow: number, outFlow: number } [] = [];
    @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
    ticks = 0;
    config: any = {
        pagination: '.swiper-pagination',
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 1400,
        direction: 'vertical',
        effect: 'slide',
        autoplayDisableOnInteraction: false
    };
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private global: Globals) {

        this.messageService.getSTPData().subscribe(message => {
            //console.log('observ STP');
            //console.log(message);
            this.stpArray = [];
            //console.log(typeof message['stp']);
            for (let i of message['stp']) {
                //console.log(i);
                this.stpArray.push({name: i.cust_name, inFlow: i.inflow, outFlow: i.outflow});
            }

        });


    }

    ngOnInit() {
        this.getData('stp');

        let timer = Observable.timer(5120, 5000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;
            // console.log(this.ticks);
            if (this.usefulSwiper.swiper.activeIndex === this.usefulSwiper.swiper.slides.length - 1) {
                this.usefulSwiper.swiper.slideTo(0);
            } else {
                this.usefulSwiper.swiper.slideNext();
            }

            if (this.ticks === 5) {
                this.getData('stp');
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
        /*this.http.get(this.apiServer + '/sa/saPrimeDash/' + route + '/' + sessionStorage.getItem('sid') + '?' + timeStamp, { headers: headers} ).subscribe(data => {
            console.log('asdasdasd');
            console.log(data);
            if (data.json().stp !== 'NDF') {
                this.featureEnabled = true;
                this.messageService.sendSTPData(data.json().stp);
            } else {
                this.featureEnabled = false;
            }
        }); */

    };

}
