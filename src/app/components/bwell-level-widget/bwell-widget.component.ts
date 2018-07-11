import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from '@angular/http';
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-bwell-widget',
    templateUrl: './bwell-widget.component.html',

    styleUrls: ['./bwell-widget.component.css']
})
export class BwellLevelWidgetComponent implements OnInit {
    featureEnabled = false;
    bwellLevelArray: { name: string, total: number, cumtotal: number, id: number, status: number, crt: number, cit: number }[] = [];
    color = 'primary';
    checked = true;
    @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
    ticks = 0;
    config: any = {
        pagination: '.swiper-pagination',
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        autoplay: 10000,
        speed: 400,
        direction: 'horizontal',
        effect: 'slide',
        autoplayDisableOnInteraction: false
    };
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private global: Globals) {
        this.messageService.getbwellData().subscribe(message => {
            //console.log('observ bwell');
            //console.log(message);


            if (this.bwellLevelArray.length === 0) {
                for (let i of message['bwell']) {
                    const d1 = new Date();
                    const curdate = d1.getDate();
                    const d2 = new Date(i.dt);
                    const dataDate = d2.getDate();
                    const stat = Number(i.status);
                    if (curdate === dataDate) {
                        this.bwellLevelArray.push({
                            name: i.cust_name,
                            total: i.agg_total,
                            cumtotal: i.cumtotal,
                            id: i.id,
                            status: i.status,
                            crt: i.crt,
                            cit: i.cit
                        });
                    } else {
                        this.bwellLevelArray.push({
                            name: i.cust_name,
                            total: 0,
                            cumtotal: i.cumtotal,
                            id: i.id,
                            status: i.status,
                            crt: i.crt,
                            cit: i.cit
                        });
                    }
                }
            } else {

                for (let i of message['bwell']) {
                    const d1 = new Date();
                    const curdate = d1.getDate();
                    const d2 = new Date(i.dt);
                    const dataDate = d2.getDate();
                    const stat = Number(i.status);
                    if (curdate === dataDate) {
                        let updateItem = this.bwellLevelArray.find(this.findIndexToUpdate, i.id);
                        let index = this.bwellLevelArray.indexOf(updateItem);
                        this.bwellLevelArray[index] = {
                            name: i.cust_name,
                            total: i.agg_total,
                            cumtotal: i.cumtotal,
                            id: i.id,
                            crt: i.crt,
                            cit: i.cit,
                            status: i.status
                        };
                    } else {
                        let updateItem = this.bwellLevelArray.find(this.findIndexToUpdate, i.id);
                        let index = this.bwellLevelArray.indexOf(updateItem);
                        this.bwellLevelArray[index] = {
                            name: i.cust_name,
                            total: 0,
                            cumtotal: i.cumtotal,
                            id: i.id,
                            crt: i.crt,
                            cit: i.cit,
                            status: i.status
                        };
                    }
                }

            }


            //this.bwellLevelArray = [];
            // this.sumpLevelArray = [{sname: '--', level: 0 }];

        });

    }

    ngOnInit() {
        this.getData('bwell');
        let timer = Observable.timer(2040, 2000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;
            // console.log(this.ticks);


            if (this.ticks === 2) {
                this.getData('bwell');
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
            //console.log('----asdasdasd-----');
            //console.log(data.json());
            // this.bwellLevelArray = [{name: 'one', total: 111, cumtotal: 222, id: 1},{name: 'two', total: 111, cumtotal: 222, id: 2},{name: 'tmree', total: 111, cumtotal: 222, id: 3}];
            if (data.json().bwell !== 'NDF') {
                //console.log(data.json().bwell[0].status);
                if (data.json().bwell[0].status === 1) {
                    this.featureEnabled = true;
                    this.global.bpumpfeature = true;
                    //console.log('sending');
                    this.messageService.sendbwellData(data.json().bwell);
                } else {
                    this.featureEnabled = false;
                    this.global.bpumpfeature = false;
                }

            } else {
                //console.log('feature Offline');
                this.featureEnabled = false;
                this.global.bpumpfeature = false;

            }
        });
    };


    stateChange(bid, reqstate) {
        if (reqstate == true) {
            reqstate = 1;
        } else {
            reqstate = 0;
        }

        //console.log(bid + "|" + reqstate);
        this.http.get(this.apiServer + '/sa/saPrimeDash/pc/' + bid + '/' + reqstate).subscribe(data => {
            //console.log(data.json().bwell);

        });

    }


    findIndexToUpdate(newItem) {
        return newItem.id === this;
    }


    gonext() {
        this.usefulSwiper.swiper.slideNext();
    }

    goprev() {
        this.usefulSwiper.swiper.slidePrev();
    }
}
