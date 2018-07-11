import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from "@angular/http";
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-alarms-widget',
    templateUrl: './alarms-widget.component.html',
    styleUrls: ['./alarms-widget.component.css']
})
export class AlarmsWidgetComponent implements OnInit {
    alarmsArray: { blockName: string, alarmCount: number }[] = [];
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

        this.messageService.getAlarmsData().subscribe(message => {
            //console.log('observ');
            //console.log(message);

            this.alarmsArray = [];
            // this.sumpLevelArray = [{sname: '--', level: 0 }];
            for (let i of message['alarms']) {
                this.alarmsArray.push({blockName: i.block_name, alarmCount: i.count});

            }

        });


    }

    ngOnInit() {
        this.getData('alarms');
        let timer = Observable.timer(1040, 1000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;
            // console.log(this.ticks);
            //if (this.usefulSwiper.swiper.activeIndex === this.usefulSwiper.swiper.slides.length - 1) {
            // this.usefulSwiper.swiper.slideTo(0);
            //} else {
            //this.usefulSwiper.swiper.slideNext();
            //}

            if (this.ticks === 5) {
                this.getData('alarms');
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
            //console.log(data['alarms']);
            if (data.json().alarms !== 'NDF') {
                this.messageService.setAlarmsData(data.json().alarms);
            }
        });
    };


}
