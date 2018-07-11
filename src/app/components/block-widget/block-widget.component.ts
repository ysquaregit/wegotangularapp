import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from "@angular/http";
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-block-widget',
    templateUrl: './block-widget.component.html',
    styleUrls: ['./block-widget.component.css']
})


export class BlockWidgetComponent implements OnInit {
    featureEnabled = false;
    blockTotals: { name: string, day_total: number, current_month_total: number, prev_month_total: number, offline: number }[] = [];
    @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
    ticks = 0;
    config: any = {
        pagination: '.swiper-pagination',
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        autoplay: 10000,
        speed: 1000,
        direction: 'vertical',
        effect: 'slide',
        autoplayDisableOnInteraction: false
    };
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private global: Globals) {

        this.messageService.getbtotal().subscribe(message => {
            //console.log('observ');
            //console.log(message['btotal'].length);

            if (this.blockTotals.length === 0) {
                for (let i of message['btotal']) {
                    const d1 = new Date();
                    const curdate = d1.getDate();
                    const d2 = new Date(i.dt);
                    const dataDate = d2.getDate();
                    const stat = Number(i.status);
                    if (curdate === dataDate) {
                        this.blockTotals.push({
                            name: i.name, day_total: i.day_total,
                            current_month_total: i.month_total, prev_month_total: i.prev_month_total, offline: stat
                        });
                    } else {
                        this.blockTotals.push({
                            name: i.name, day_total: 0,
                            current_month_total: i.month_total, prev_month_total: i.prev_month_total, offline: 0
                        });
                    }
                }
            } else {

                for (let i of message['btotal']) {
                    let updateItem = this.blockTotals.find(this.findIndexToUpdate, i.name);
                    let index = this.blockTotals.indexOf(updateItem);
                    //console.log('_+_+_+_+_+_+_+_+');
                    //console.log(updateItem);
                    //console.log(index);
                    console.log('__________________');
                    const d1 = new Date();
                    const curdate = d1.getDate();
                    const d2 = new Date(i.dt);
                    const dataDate = d2.getDate();
                    const stat = Number(i.status);
                    if (curdate === dataDate) {
                        this.blockTotals[index] = {
                            name: i.name, day_total: i.day_total,
                            current_month_total: i.month_total, prev_month_total: i.prev_month_total, offline: stat
                        };
                    } else {
                        console.log('Caught one offline');
                        this.blockTotals[index] = {
                            name: i.name, day_total: 0,
                            current_month_total: i.month_total, prev_month_total: i.prev_month_total, offline: 0
                        };

                    }

                }

            }
            console.log(this.blockTotals);
        });

    }

    ngOnInit() {
        this.getData('btotal');
        let timer = Observable.timer(5040, 5000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;
            // console.log(this.ticks);
            if (this.usefulSwiper.swiper.activeIndex === this.usefulSwiper.swiper.slides.length - 1) {
                //this.usefulSwiper.swiper.slideTo(0);
            } else {
                //this.usefulSwiper.swiper.slideNext();
            }

            if (this.ticks === 5) {
                this.getData('btotal');
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
            console.log("-----btotal data");
            console.log(data.json());


            this.featureEnabled = true;
            this.messageService.setbtotal(data.json().btotal);



        });
    };


    findIndexToUpdate(newItem) {
        return newItem.name === this;
    }

    gonext() {
        this.usefulSwiper.swiper.slideNext();
    }

    goprev() {
        this.usefulSwiper.swiper.slidePrev();
    }

}
