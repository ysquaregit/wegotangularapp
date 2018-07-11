import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../globals';
import {UtilityService} from "../../services/utility.service";
import {Headers, Http} from "@angular/http";
import {MessageService} from "../../services/data.service";
import {environment} from "../../../environments/environment";
import {Message} from 'primeng/primeng';

@Component({
    selector: 'app-dashboard-ven',
    templateUrl: './dashboard-ven.component.html',
    styleUrls: ['./dashboard-ven.component.css']
})
export class DashboardVenComponent implements OnInit {
    siteConfigArray: Array<any> = [];
    msgs: Message[] = [];
    color = 'warn';
    mode = 'determinate';
    value = 50;
    bufferValue = 75;
    items: Array<any> = [];
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private route: ActivatedRoute, private router: Router,
                private globals: Globals, private utilityService: UtilityService, private http: Http) {
        let curNetworkState = false;
        this.messageService.getNoNetwork().subscribe(message => {
            //console.log('from observable for no network');

            //console.log(message.nonetwork);
            if (message.nonetwork === true) {
                this.messageService.setDisableNav(true);
                curNetworkState = message;
                this.msgs = [{
                    severity: 'error',
                    summary: 'No Internet Access ',
                    detail: 'Check Internet Connectivity'
                }];

            } else if (message.nonetwork === false) {
                this.messageService.setDisableNav(false);
                curNetworkState = message;
                this.msgs = [];
            }


        });
    }

    ngOnInit() {

        var d = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var n = month[d.getMonth()];


        this.utilityService.isLogged().then((result: boolean) => {

            if (!result) {
                this.router.navigate(['/login']);
            } else {
                let token = sessionStorage.getItem('token');
                let headers: Headers = new Headers({
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                });
                //console.log(sessionStorage.getItem('sid'));
                this.http.get(this.apiServer + '/sa/saPrimeDash/' + sessionStorage.getItem('sid'), {headers: headers}).subscribe(data => {

                    this.siteConfigArray = data.json().siteConfig[0];
                    this.messageService.sendSiteConfig(data.json().siteConfig[0]);

                });


            }
        });

    }
}
