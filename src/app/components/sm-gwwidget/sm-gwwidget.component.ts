import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {MessageService} from '../../services/data.service';
import {Globals} from '../../globals';
import {Headers, Http} from '@angular/http';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-sm-gwwidget',
    templateUrl: './sm-gwwidget.component.html',
    styleUrls: ['./sm-gwwidget.component.css']
})
export class SmGWWidgetComponent implements OnInit {
    gwDat: { levelvalue: number, prediction: number, tds: number, today: number, offline: number }[] = [{
        levelvalue: 0,
        prediction: 0,
        tds: 0,
        today: 0,
        offline: 1
    }];
    color = 'primary';
    mode = 'determinate';
    value = 50;
    bufferValue = 75;
    smgwNDF: boolean;
    ticks = 0;
    siteConfigArray: Array<any>;
    maxval = 100;
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
            //console.log("GWWWW");
            if (data.json().smgw !== 'NDF') {
                this.smgwNDF = false;

                const d1 = new Date();
                const curdate = d1.getDate();
                const d2 = new Date(data.json().smgw[0].dt);
                const dataDate = d2.getDate();
                if (curdate !== dataDate) {
                    this.gwDat = [{
                        levelvalue: data.json().smgw[0].level,
                        prediction: 0,
                        tds: data.json().smgw[0].quality,
                        today: data.json().smgw[0].today,
                        offline: 1
                    }];
                    this.value = Number(data.json().smgw[0].quality / this.maxval) * 100;
                } else {
                    this.gwDat = [{
                        levelvalue: data.json().smgw[0].level,
                        prediction: 2.2,
                        tds: data.json().smgw[0].quality,
                        today: data.json().smgw[0].today,
                        offline: 0
                    }];
                    this.value = Number(data.json().smgw[0].quality / this.maxval) * 100;
                }
                //console.log(data.json().smgw);

            } else {
                this.smgwNDF = true;
            }

        });

    };


    ngOnInit() {
        this.getData('smgw');

        let timer = Observable.timer(1040, 1000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;


            if (this.ticks === 5) {
                this.getData('smgw');
                this.ticks = 0;
            }
        });
    }
}
