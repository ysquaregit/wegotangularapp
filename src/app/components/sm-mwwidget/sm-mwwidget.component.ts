import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from '@angular/http';
import {Globals} from '../../globals';
import {Observable} from 'rxjs/Rx';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-sm-mwwidget',
    templateUrl: './sm-mwwidget.component.html',
    styleUrls: ['./sm-mwwidget.component.css']
})
export class SmMWWidgetComponent implements OnInit {
    mwDat: { levelvalue: number, prediction: number, tds: number, offline: number, today: number }[] = [{
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
    siteConfigArray: Array<any>;
    maxval = 100;
    ticks = 0;
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

            if (data.json().smmw !== 'NDF') {
                const d1 = new Date();
                const curdate = d1.getDate();
                const d2 = new Date(data.json().smmw[0].dt);
                const dataDate = d2.getDate();
                if (curdate !== dataDate) {
                    this.mwDat = [{
                        levelvalue: data.json().smmw[0].level,
                        prediction: 2.3,
                        tds: data.json().smmw[0].quality,
                        today: data.json().smmw[0].today,
                        offline: 1
                    }];
                    //console.log(this.mwDat[0].levelvalue);
                    this.value = Number(data.json().smmw[0].quality / this.maxval) * 100;
                } else {
                    this.mwDat = [{
                        levelvalue: data.json().smmw[0].level,
                        prediction: 2.3,
                        tds: data.json().smmw[0].quality,
                        today: data.json().smmw[0].today,
                        offline: 0
                    }];
                    //console.log(this.mwDat[0].levelvalue);
                    this.value = Number(data.json().smmw[0].quality / this.maxval) * 100;
                }



            }
        });

    };


    ngOnInit() {
        this.getData('smmw');

        let timer = Observable.timer(1040, 1000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;


            if (this.ticks === 5) {
                this.getData('smmw');
                this.ticks = 0;
            }
        });
    }

}
