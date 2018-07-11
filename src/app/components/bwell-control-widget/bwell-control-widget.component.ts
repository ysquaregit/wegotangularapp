import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from '@angular/http';
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-bwell-control-widget',
    templateUrl: './bwell-control-widget.component.html',

    styleUrls: ['./bwell-control-widget.component.css']
})
export class BwellControlWidgetComponent implements OnInit {
    featureEnabled = false;
    pumpLevelArray: { name: string, status: number, reqstate: number, rt: number, id: number, at: number, offline: number }[] = [];
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
        speed: 1000,
        direction: 'horizontal',
        effect: 'slide',
        autoplayDisableOnInteraction: false
    };
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private global: Globals) {
        this.messageService.getpumpData().subscribe(message => {
            //console.log('observ pump');
            //console.log(message);

            if (this.pumpLevelArray.length === 0) {
                for (let i of message['pump']) {
                    // this.pumpLevelArray.at(i.id).patchValue({name: i.cust_name, status: i.current_state, reqstate:i.req_state, rt: i.rt, id: i.id, at: i.alarm_type_id });
                    const d1 = new Date();
                    const curdate = d1.getDate();
                    const d2 = new Date(i.dt);
                    const dataDate = d2.getDate();
                    //console.log('----------------------------------------------');
                    //console.log(dataDate);
                    if (curdate !== dataDate) {
                        this.pumpLevelArray.push({
                            name: i.cust_name,
                            status: i.current_state,
                            reqstate: i.req_state,
                            rt: i.rt,
                            id: i.id,
                            at: i.alarm_type_id,
                            offline: 1
                        });
                    } else {

                        this.pumpLevelArray.push({
                            name: i.cust_name,
                            status: i.current_state,
                            reqstate: i.req_state,
                            rt: i.rt,
                            id: i.id,
                            at: i.alarm_type_id,
                            offline: 0
                        });

                    }
                }

            } else {

                for (let i of message['pump']) {
                    let updateItem = this.pumpLevelArray.find(this.findIndexToUpdate, i.id);
                    let index = this.pumpLevelArray.indexOf(updateItem);
                    //console.log('_+_+_+_+_+_+_+_+');
                    //console.log(updateItem);
                    //console.log(index);
                    //console.log('__________________');


                    const d1 = new Date();
                    const curdate = d1.getDate();
                    const d2 = new Date(i.dt);
                    const dataDate = d2.getDate();
                    if (curdate !== dataDate) {
                        this.pumpLevelArray[index] = {
                            name: i.cust_name,
                            status: i.current_state,
                            reqstate: i.req_state,
                            rt: i.rt,
                            id: i.id,
                            at: i.alarm_type_id,
                            offline: 1
                        };
                    } else {

                        this.pumpLevelArray[index] = {
                            name: i.cust_name,
                            status: i.current_state,
                            reqstate: i.req_state,
                            rt: i.rt,
                            id: i.id,
                            at: i.alarm_type_id,
                            offline: 0
                        };
                    }

                }

            }


            //console.log('asdasd2222222222222222');
            //console.log(this.pumpLevelArray);
        });

    }

    ngOnInit() {
        this.getData('pump');
        let timer = Observable.timer(2040, 2000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;


            if (this.ticks === 1) {
                this.getData('pump');
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
            //console.log(data.json());

            if (data.json().pump !== 'NDF') {
                this.featureEnabled = true;

                //console.log('message service pump ctrl');
                this.messageService.sendpumpData(data.json().pump);
            } else {
                this.featureEnabled = false;

                //console.log('NO DATA FOUND FOR PUMP CONTROL');
            }

            this.featureEnabled = this.global.bpumpfeature;
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


    stateChange(pid, reqstate) {
        if (reqstate == true) {
            reqstate = 1;
        } else {
            reqstate = 0;
        }

        //console.log(pid + "|" + reqstate);
        this.http.get(this.apiServer + '/sa/saPrimeDash/pc/' + pid + '/' + reqstate).subscribe(data => {
            //console.log(data);

        });

    }

}
