import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SwiperComponent} from 'angular2-useful-swiper';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from '@angular/http';
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-pump-widget',
    templateUrl: './pump-widget.component.html',

    styleUrls: ['./pump-widget.component.css']
})
export class PumpLevelWidgetComponent implements OnInit {
    featureEnabled = false;
    pumpLevelArray: { name: string, status: number, reqstate: number, rt: number, id: number, at: number }[] = [];
    color = 'primary';
    checked = true;
    @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
    ticks = 0;
    config: any = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: 10000,
        speed: 400,
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
                for (let i of message['opump']) {
                    //this.pumpLevelArray.at(i.id).patchValue({name: i.cust_name, status: i.current_state, reqstate:i.req_state, rt: i.rt, id: i.id, at: i.alarm_type_id });
                    this.pumpLevelArray.push({
                        name: i.cust_name,
                        status: i.current_state,
                        reqstate: i.req_state,
                        rt: i.rt,
                        id: i.id,
                        at: i.alarm_type_id
                    });
                }

            } else {

                for (let i of message['opump']) {
                    let updateItem = this.pumpLevelArray.find(this.findIndexToUpdate, i.id);
                    let index = this.pumpLevelArray.indexOf(updateItem);
                    //console.log('_+_+_+_+_+_+_+_+');
                    //console.log(updateItem);
                    //console.log(index);
                    //console.log('__________________');
                    this.pumpLevelArray[index] = {
                        name: i.cust_name,
                        status: i.current_state,
                        reqstate: i.req_state,
                        rt: i.rt,
                        id: i.id,
                        at: i.alarm_type_id
                    };

                }

            }


            //console.log('asdasd');
            //console.log(this.pumpLevelArray);
        });

    }

    ngOnInit() {
        this.getData('opump');
        let timer = Observable.timer(1040, 1000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;


            if (this.ticks === 1) {
                this.getData('opump');
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
        /*
        this.http.get(this.apiServer + '/sa/saPrimeDash/' + route + '/' + localStorage.getItem('sid') + '?' + timeStamp, { headers: headers} ).subscribe(data => {

            if(data.json().opump !== 'NDF') {
                this.featureEnabled = true;
                console.log('message service opump ctrl');
                this.messageService.sendpumpData(data.json().opump);
            }else{
                this.featureEnabled =false;
            }
        }); */
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
