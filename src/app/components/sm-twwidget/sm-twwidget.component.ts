import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from '@angular/http';
import {Globals} from '../../globals';
import {Observable} from 'rxjs/Rx';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-sm-twwidget',
    templateUrl: './sm-twwidget.component.html',
    styleUrls: ['./sm-twwidget.component.css']
})
export class SmTWWidgetComponent implements OnInit {
    twDat: { levelvalue: number, prediction: number, tds: number, offline: number, today: number }[] = [{
        levelvalue: 0,
        prediction: 0,
        tds: 0,
        offline: 1,
        today: 0
    }];
    color = 'primary';
    mode = 'determinate';
    value = 77;
    bufferValue = 45;
    maxval = 100;
    ticks = 0;
    siteConfigArray: Array<any>;
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private global: Globals) {


        this.messageService.getSiteConfig().subscribe(message => {
            //console.log(message);

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
            if (data.json() !== 'NDF') {
                const d1 = new Date();
                const curdate = d1.getDate();
                const d2 = new Date(data.json().smtw[0].dt);
                const dataDate = d2.getDate();
                if (curdate !== dataDate) {
                    this.twDat = [{
                        levelvalue: data.json().smtw[0].level,
                        prediction: 1.2,
                        tds: data.json().smtw[0].quality,
                        today: data.json().smtw[0].today,
                        offline: 1
                    }];
                    this.value = Number(data.json().smtw[0].quality / this.maxval) * 100;
                } else {
                    this.twDat = [{
                        levelvalue: data.json().smtw[0].level,
                        prediction: 1.2,
                        tds: data.json().smtw[0].quality,
                        today: data.json().smtw[0].today,
                        offline: 0
                    }];
                    this.value = Number(data.json().smtw[0].quality / this.maxval) * 100;
                }


            }

        });

    };


    ngOnInit() {
        this.getData('smtw');
        let timer = Observable.timer(1040, 1000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;


            if (this.ticks === 5) {
                this.getData('smtw');
                this.ticks = 0;
            }
        });
    }

}
