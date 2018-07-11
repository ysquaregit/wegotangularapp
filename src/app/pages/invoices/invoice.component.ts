import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message, SelectItem} from 'primeng/primeng';
import {Headers, Http, ResponseContentType} from "@angular/http";
import {Globals} from "../../globals";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {saveAs} from 'file-saver/FileSaver';
import {MessageService} from "../../services/data.service";

@Component({
    selector: 'app-reports',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

    @ViewChild('apt') el: ElementRef;
    blockArrayList: any [] = [];
    apartArrayList: any [] = [];
    id: Number = 0;
    baseDataArray: any [] = [];
    cars: SelectItem[];
    apartFEList: any [] = [];
    selectedBlock: string;
    selectedApart: string;
    dateValue: Date;
    apartName: string;
    msgs: Message[] = [];
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, public globals: Globals, public http: Http) {
        let curNetworkState = false;
        this.messageService.getNoNetwork().subscribe(message => {
            //console.log('from observable for no network');

            //console.log(message.nonetwork);
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

    }

    downloadClicked() {
        if (typeof this.selectedBlock === 'undefined') {


        } else {
            //alert(this.selectedBlock + "|" + this.dateValue);
            const headers = new Headers();
            headers.append('Accept', 'application/pdf');
            this.http.get('http://13.127.61.15:4000/?id=' + this.selectedBlock + '&aprt_id=7', {
                headers: headers,
                responseType: ResponseContentType.Blob
            })
                .toPromise()
                .then(response => this.saveToFileSystem(response));


        }

    }


    downloadFullBlock() {
        if (typeof this.selectedBlock === 'undefined') {


        } else {
            //alert(this.selectedBlock + "|" + this.dateValue);
            const headers = new Headers();
            headers.append('Accept', 'application/pdf');
            this.http.get('http://13.127.61.15:4000/full?s_id=4&b_id=' + this.selectedBlock, {
                headers: headers,
                responseType: ResponseContentType.Blob
            })
                .toPromise()
                .then(response => this.saveToFileSystem(response));


        }

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
        this.apartFEList = [];
        this.http.get(this.apiServer + '/sa/saApartList/' + selectedID, {headers: headers}).subscribe(data => {
            // Read the result field from the JSON response.
            //console.log(data.json());
            for (const aparts of data.json().apartList) {
                //console.log('gotApartIDdddd:' + aparts.id);
                // build the array here
                this.apartFEList.push({label: aparts.cust_name, value: aparts.id});
                // this.getAparts(aparts.id);
            }


        });

    }

    apartSelected(selectedName) {
        //console.log(selectedName);

        this.apartName = selectedName;


    }

    downloadApartInvoice() {
        const headers = new Headers();
        headers.append('Accept', 'application/pdf');
        var decryptedSID = parseInt(sessionStorage.getItem('sid')) / 948311;
        this.http.get('http://35.154.25.206:4000/?s_id=' + decryptedSID + '&aprt_id=' + this.selectedApart, {
            headers: headers,
            responseType: ResponseContentType.Blob
        }).toPromise().then(response => this.saveToFileSystem(response));

    }

    resetControls() {
        this.selectedBlock = '';
        this.selectedApart = '';
    }

    private saveToFileSystem(response) {
        let d = new Date().getMonth();

        //console.log(d);
        //console.log(response.headers);
        const contentDispositionHeader: string = response.headers.get('content-disposition');
        //console.log(contentDispositionHeader);
        // const parts: string[] = contentDispositionHeader.split(';');
        //const filename = parts[1].split('=')[1];
        const blob = new Blob([response.blob()], {type: 'application/pdf'});
        let filename = 'Report_' + d;
        //console.log(filename);
        saveAs(blob, filename);
        ////console.log(filename);
    }

}
