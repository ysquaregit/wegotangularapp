import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Http} from "@angular/http";
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-bwell-intelligence-widget',
    templateUrl: './bwell-intelligence-widget.component.html',

    styleUrls: ['./bwell-intelligence-widget.component.css']
})
export class BwellIntelligenceWidgetComponent implements OnInit {
    featureEnabled = false;
    sumpLevelArray: { sname: string, level: number }[] = [];
    @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
    ticks = 0;
    config: any = {
        pagination: '.swiper-pagination',
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: 5000,
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
            //console.log(message);
            //this.sumpLevelArray = [{sname: '--', level: 0 }];

            if (this.sumpLevelArray.length === 0) {
                for (let i of message['slvl']) {
                    this.sumpLevelArray.push({sname: i.cust_name, level: i.level});
                }

            } else {
                this.sumpLevelArray = [];
                for (let i of message['slvl']) {
                    this.sumpLevelArray.push({sname: i.cust_name, level: i.level});
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
        let timeStamp = +new Date();
        /*this.http.get(this.apiServer + '/sa/saPrimeDash/' + route + '/' + atob(sessionStorage.getItem('sid')) + '?' + timeStamp).subscribe(data => {
            console.log(data.json().slvl);
            // this.sumpLevelArray = [{sname: 'one', level: 1}];
            if (data.json().slvl !== 'NDF') {
                this.featureEnabled = true;
                this.messageService.sendslvlData(data.json().slvl);
            } else {
                this.featureEnabled = false;
            }
        });*/
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
