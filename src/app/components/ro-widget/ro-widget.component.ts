import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Http} from "@angular/http";
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-ro-widget',
    templateUrl: './ro-widget.component.html',
    styleUrls: ['./ro-widget.component.css']
})
export class ROWidgetComponent implements OnInit {
    featureEnabled = false;
    roArray: { name: string, inFlow: number, outFlow: number }[] = [];
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


        this.messageService.getroData().subscribe(message => {
            //console.log('observ');
            //console.log(message);
            for (let i of message['ro']) {
                //console.log(i);
                this.roArray.push({name: i.cust_name, inFlow: i.inflow, outFlow: i.outflow});
            }

        });


    }

    ngOnInit() {
        this.getData('ro');

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
                this.getData('ro');
                this.ticks = 0;
            }
        });
    }


    getData(route: string) {
        let timeStamp = +new Date();
        /*this.http.get(this.apiServer + '/sa/saPrimeDash/' + route + '/' + atob(sessionStorage.getItem('sid')) + '?' + timeStamp).subscribe(data => {
            console.log(data.json().ro);
            if (data.json().ro !== 'NDF') {
                this.featureEnabled = true;
                this.messageService.sendroData(data.json().ro);
            } else {
                this.featureEnabled = false;
            }
        });*/

    };

}
