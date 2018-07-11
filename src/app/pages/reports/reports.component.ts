import {Component, OnInit} from '@angular/core';
import {Message, SelectItem} from 'primeng/primeng';
import {Headers, Http} from "@angular/http";
import {Globals} from "../../globals";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {saveAs} from 'file-saver/FileSaver';
import {MessageService} from "../../services/data.service";

//import * as moment from moment;

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


    blockArrayList: any [] = [];
    apartArrayList: any [] = [];
    id: Number = 0;
    baseDataArray: any [] = [];
    cars: SelectItem[];
    sid: Number = 0;
    selectedBlock: string;
    selectedApart: string;
    fromdateValue: Date;
    todateValue: Date;
    apartFEList: any [] = [{label: 'Select Block', value: 0}];
    fromAdateValue: Date;
    toAdateValue: Date;
    urlLink: string;
    fromWSdateValue: Date;
    toWSdateValue: Date;
    msgs: Message[] = [];
    algo: Number;
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, public globals: Globals, public http: Http) {

        let curNetworkState = false;
        this.messageService.getNoNetwork().subscribe(message => {
            // console.log('from observable for no network');

            // console.log(message.nonetwork);
            if (message.nonetwork === true) {

                curNetworkState = message;
                this.msgs = [{
                    severity: 'error',
                    summary: 'No Internet Access ',
                    detail: 'Check Internet Connectivity'
                }];

            } else if (message.nonetwork === false) {
                curNetworkState = message;
                this.msgs = [];
            }


        });
    }

    ngOnInit() {
        this.id = Number(atob(sessionStorage.getItem('sid')));
        this.getData(this.id);

        //console.log(this.blockArrayList);
    }

    downloadClicked() {
        if (typeof this.selectedBlock === 'undefined') {


        } else {

            let fromdate = this.dateWorker(this.fromdateValue);
            let todate = this.dateWorker(this.todateValue);
            //console.log(this.globals.currentSiteID);
            this.urlLink = 'http://35.154.25.206:4000/day_wise?s_id=' + this.globals.currentSiteID + '&b_id=' + this.selectedBlock + '&from=' + fromdate + '&to=' + todate;
            //const headers = new Headers();
            //headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // this.http.get('http://35.154.25.206:4000/day_wise?s_id='+ this.globals.currentSiteID + '&b_id=' + this.selectedBlock + '&from=' + fromdate + '&to=' +  todate, { headers: headers} )
            //    .toPromise()
            //    .then(response => this.saveToFileSystem(response));


        }

    }


    downloadSTClicked() {


        let fromdate = this.dateWorker(this.fromdateValue);
        let todate = this.dateWorker(this.todateValue);
        //console.log(this.globals.currentSiteID);
        this.sid = Number(sessionStorage.getItem('sid'));
        this.algo = Number(this.sid) / 948311;
        //  console.log('http://35.154.25.206:4000/site_wise_day?s_id=' + this.algo + '&from=' + fromdate + '&to=' +  todate);
        this.urlLink = 'http://35.154.25.206:4000/site_wise_day?s_id=' + this.algo + '&from=' + fromdate + '&to=' + todate;
        //const headers = new Headers();
        //headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // this.http.get('http://35.154.25.206:4000/day_wise?s_id='+ this.globals.currentSiteID + '&b_id=' + this.selectedBlock + '&from=' + fromdate + '&to=' +  todate, { headers: headers} )
        //    .toPromise()
        //    .then(response => this.saveToFileSystem(response));


    }


    downloadApartClicked() {
        if (typeof this.selectedApart === 'undefined') {


        } else {
            let fromAdate = this.dateWorker(this.fromAdateValue);
            let toAdate = this.dateWorker(this.toAdateValue);
            //console.log(this.selectedApart);
            const headers = new Headers();
            this.urlLink = 'http://35.154.25.206:4000/day_wise_apart?b_id=' + this.selectedBlock + '&aprt_id=' + this.selectedApart + '&from=' + fromAdate + '&to=' + toAdate;
            //headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            //this.http.get('http://35.154.25.206:4000/day_wise_apart?b_id=' + this.selectedBlock + '&aprt_id=' + this.selectedApart + '&from=' + fromAdate + '&to=' +  toAdate, { headers: headers, responseType: ResponseContentType.Blob} )
            //    .toPromise()
            //    .then(response => this.saveToFileSystem(response));


        }

    }


    downloadWSClicked() {


        let fromWSdate = this.dateWorker(this.fromWSdateValue);
        let toWSdate = this.dateWorker(this.toWSdateValue);
        this.sid = Number(sessionStorage.getItem('sid'));
        this.algo = Number(this.sid) / 948311;
        //console.log(this.selectedApart);
        const headers = new Headers();
        this.urlLink = 'http://35.154.25.206:4000/site_water_det?s_id=' + this.algo + '&from=' + fromWSdate + '&to=' + toWSdate;

        // headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // this.http.get('http://35.154.25.206:4000/site_water_det?s_id=4&from=' + fromWSdate + '&to=' +  toWSdate, { headers: headers, responseType: ResponseContentType.Blob} )
        //    .toPromise()
        //    .then(response => this.saveToFileSystem(response));


    }


    downloadPLClicked() {


        let fromWSdate = this.dateWorker(this.fromWSdateValue);
        let toWSdate = this.dateWorker(this.toWSdateValue);
        this.sid = Number(sessionStorage.getItem('sid'));
        this.algo = Number(this.sid) / 948311;
        //console.log(this.selectedApart);
        const headers = new Headers();
        this.urlLink = 'http://35.154.25.206:4004/pumpState?s_id=' + this.algo + '&from=' + fromWSdate + '&to=' + toWSdate;
        //headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        //this.http.get('http://35.154.25.206:4004/pumpState?s_id=4&from=' + fromWSdate + '&to=' +  toWSdate, { headers: headers, responseType: ResponseContentType.Blob} )
        //  .toPromise()
        // .then(response => this.saveToFileSystem(response));


    }


    dateWorker(dateData) {

        var date = new Date(dateData);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return (year + '-' + month + '-' + day);

    }


    getData(siteID) {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        //console.log('entered' + siteID);
        this.http.get(this.apiServer + '/sa/saBlockList/' + sessionStorage.getItem('sid'), {headers: headers}).subscribe(data => {
            this.globals.blocksArray = data.json().blockList;


            this.blockArrayList = [{label: 'Select Block', value: 0}];
            for (let blocks of this.globals.blocksArray) {
                this.blockArrayList.push({label: blocks.block_name, value: blocks.id});
            }
            // Read the result field from the JSON response.
            for (const blocks of data.json().blockList) {
                //console.log('gotBlockID:' + blocks.id);
                this.getAparts(blocks.id, blocks.block_name);
            }

        });


    }


    getAparts(blockID: number, blockName: string) {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        const tempApartArray: any[] = [];

        this.http.get(this.apiServer + '/sa/saApartList/' + blockID, {headers: headers}).subscribe(data => {
            // Read the result field from the JSON response.
            for (const aparts of data.json().apartList) {
                //console.log('gotApartID:' + aparts.id);
                // build the array here
                tempApartArray.push({name: aparts.cust_name, status: aparts.status, id: aparts.id});
                // this.getAparts(aparts.id);
            }
            this.baseDataArray.push({name: blockName, block_id: blockID, apartArray: tempApartArray});
            this.globals.blockApartData = this.baseDataArray;
            //console.log(this.baseDataArray);

        });
    }

    blockSelected(selectedID) {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        //console.log(selectedID);

        this.http.get(this.apiServer + '/sa/saApartList/' + selectedID, {headers: headers}).subscribe(data => {
            // Read the result field from the JSON response.
            //console.log(data.json());
            this.apartFEList = [{label: 'Select', value: 0}];
            for (const aparts of data.json().apartList) {
                //console.log('gotApartIDdddd:' + aparts.id);
                // build the array here
                this.apartFEList.push({label: aparts.cust_name, value: aparts.id});
                // this.getAparts(aparts.id);
            }


        });

    }

    tabClicked() {
        this.selectedBlock = '';
    }

    private saveToFileSystem(response) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const parts: string[] = contentDispositionHeader.split(';');
        const filename = parts[1].split('=')[1];
        const blob = new Blob([response._body], {type: 'text/csv;charset=utf-8;'});
        saveAs(blob, filename);
    }

}
