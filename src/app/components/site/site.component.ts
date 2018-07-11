import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {MessageService} from '../../services/data.service';
import {Headers, Http} from "@angular/http";
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";
import {Message} from 'primeng/primeng';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
    today: number = Date.now();

    featureEnabled = false;
    stDat: { dt: number, mt: number, pmt: number }[] = [];
    ticks = 0;
    stDtCheck = 0;
    msgs: Message[] = [];
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private global: Globals) {


        this.messageService.getstotal().subscribe(message => {
            // console.log('observ stot');
            // console.log(message['stot']);

            this.stDat = [];
            // this.sumpLevelArray = [{sname: '--', level: 0 }];
            //  console.log(message['stot'][0].day_total);
            let check = this.stDtCheck > message['stot'][0].day_total;
            //console.log(check);
            //if (check) {
            // message['stot'][0].day_total = this.stDtCheck;
            //}
            this.stDat = [{
                dt: message['stot'][0].day_total,
                mt: message['stot'][0].month_total,
                pmt: message['stot'][0].prev_month_total
            }];
            this.stDtCheck = message['stot'][0].day_total;

            // console.log(this.stDat);

        });
    }

    ngOnInit() {
        this.getData('stot');
        let timer = Observable.timer(1040, 1000);
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;
            // console.log(this.ticks);
            if (this.ticks === 5) {
                this.getData('stot');
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
            this.messageService.setNoNetwork(false);
            //  //console.log("---ssssss--");
            //  console.log(data.json().stot);
            if (data.json().stot !== 'NDF') {
                this.featureEnabled = true;
                this.messageService.setstotal(data.json().stot);
            } else {

                this.featureEnabled = false;
            }

        }, err => {
            // console.log('No network');

            this.messageService.setNoNetwork(true);


        });
    };

}
