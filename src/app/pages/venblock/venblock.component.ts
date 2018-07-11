import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Headers, Http} from "@angular/http";
import {Globals} from '../../globals';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-venblock',
    templateUrl: './venblock.component.html',
    styleUrls: ['./venblock.component.css']
})


export class VenblockComponent implements OnInit {
    siteName = this.global.currentSiteName;
    tabpane = "tab-pane active";
    display: boolean = false;
    day_totalx: Number;
    alarmHistData: any [] = [];
    aptName: String;
    message: string;
    aptStatus: string;
    id: Number = 0;
    apartArray: any [] = [];
    opened: boolean;
    apartAlarmArray: any[] = [];
    apartCompArray: any[] = [];
    apartCompCumArray: any[] = [];
    month_total: Number;
    cumulative: Number;
    day_total: Number;
    last_update: Number;
    dialogType: Number;
    showDialog: boolean;
    private apiServer = environment.apiServer;

    constructor(private route: ActivatedRoute, private http: Http, private globals: Globals,
                private router: Router, private global: Globals) {
    }



    ngOnInit() {

        this.id = Number(atob(sessionStorage.getItem('sid')));
        if (this.id === 0) {
            this.router.navigate(['selection']);
        } else {

            this.getData(this.id);
        }

    }

// open dialog send with data
    openDialog(aptID, dialogType, aptName): void {

        this.dialogType = dialogType;
        if (this.dialogType === 0) {
            this.aptStatus = " ";
        } else if (this.dialogType === 2) {
            this.aptStatus = "No Flow Detected";
            this.day_total = 0;

        } else if (this.dialogType === 12) {
            this.aptStatus = "Leakage Detected";
        } else {
            this.aptStatus = "";
        }
        this.getSummary(aptID);
        this.day_totalx = this.day_total;
        this.aptName = aptName;


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
            // Read the result field from the JSON response.

            this.getAparts(this.globals.blocksArray[0].id);


        });


    }


    TabClicked(id: any) {

        //console.log(this.globals.blocksArray[Number(id.index)]);
        let selectedBlockId = Number(this.globals.blocksArray[Number(id.index)].id);
        //console.log(selectedBlockId);
        this.getAparts(selectedBlockId);
    }

    getAparts(blockID: number) {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        this.apartArray = [];

        this.http.get(this.apiServer + '/sa/saApartList/' + blockID, {headers: headers}).subscribe(data => {
            // Read the result field from the JSON response.
            for (const aparts of data.json().apartList) {
                //console.log('gotApartID:' + aparts.id);
                // build the array here
                this.apartArray.push({name: aparts.cust_name, status: aparts.status, id: aparts.id});
                // this.getAparts(aparts.id);
            }


        });
    }


    getSummary(apartID: Number) {
        this.dialogType = 0;
        this.message = '';
        this.month_total = 0;
        this.day_total = 0;
        this.cumulative = 0;
        this.showDialog = false;
        this.last_update = 0;
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        //apartID =1;
        this.http.get(this.apiServer + '/sa/saApartData/' + apartID, {headers: headers}).subscribe(data => {
            //console.log(typeof data);
            console.log(data);
            //console.log('apartID: ' + apartID);
            let apartDatArray: any [] = data.json().apartDat;
            let componentDataArray: any [] = data.json().apartSensorDat;
            let componentCumDataArray: any [] = data.json().apartSensorCumDat.month;
            console.log(componentCumDataArray);
            console.log('----------------------------------');
            console.log(apartDatArray);
            //console.log(apartDatArray.length);
            if (data.json().apartDat.res) {
                console.log('catcged');

                this.dialogType = 0;
                this.month_total = 0;
                this.day_total = 0;
                this.showDialog = true;

                this.apartCompArray = [];
                for (let i = 0; i < componentDataArray.length; i++) {
                    this.apartCompArray.push({
                        name: componentDataArray[i].cust_name,
                        status: componentDataArray[i].status
                    });
                }
                console.log('----------sdfsdffs')


            } else {

                if (apartDatArray.length === 4) {
                    this.dialogType = 0;
                    this.message = "No data Found. Kindly contact the admin if the problem persists.";
                    this.month_total = 0;
                    this.day_total = 0;
                    this.showDialog = true;
                    this.apartCompArray = [];


                } else if (apartDatArray.length === 1) {
                    console.log('----=-=-=-=-=-= apart Data');
                    console.log(apartDatArray);

                    if (apartDatArray[0].dt) {
                        const d1 = new Date();
                        const curdate = d1.getDate();
                        const d2 = new Date(apartDatArray[0].dt);
                        const dataDate = d2.getDate();
                        if (curdate === dataDate) {

                            this.dialogType = 3;
                            this.month_total = apartDatArray[0].month_total;
                            this.day_total = apartDatArray[0].agg_total;
                            this.cumulative = apartDatArray[0].cur_cum;
                            this.last_update = apartDatArray[0].dt;
                            this.showDialog = true;
                        } else {
                            this.dialogType = 0;
                            this.month_total = apartDatArray[0].month_total;
                            this.day_total = 0;
                            this.cumulative = apartDatArray[0].cur_cum;
                            this.last_update = apartDatArray[0].dt;
                            this.showDialog = true;
                        }

                    } else {
                        // remove this later when changed in sav2
                        this.dialogType = 0;
                        this.month_total = apartDatArray[0].month_total;
                        this.cumulative = apartDatArray[0].cur_cum;
                        this.day_total = apartDatArray[0].agg_total;
                        this.showDialog = true;
                    }


                    this.apartCompArray = [];
                    for (let i = 0; i < componentDataArray.length; i++) {
                        this.apartCompArray.push({
                            name: componentDataArray[i].cust_name,
                            status: componentDataArray[i].status
                        });
                    }

                    console.log(componentCumDataArray);
                    this.apartCompCumArray = [];
                    for (let i = 0; i < componentCumDataArray.length; i++) {
                        this.apartCompCumArray.push({
                            name: componentCumDataArray[i].cust_name,
                            cumulative: componentCumDataArray[i].cum
                        });
                    }

                }
            }

        });
        // this.getAlarms(apartID);
    }


    getAlarms(apartID) {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        //apartID =9;
        this.http.get(this.apiServer + '/sa/saAlarmsData/' + apartID, {headers: headers}).subscribe(data => {
            //console.log(typeof data);
            //console.log(data);
            this.apartAlarmArray = data.json().alarmDat;
            //console.log(this.apartAlarmArray);

            if (this.apartAlarmArray.length === 0) {
                this.dialogType = 0;
            } else {
                for (let alarmPoint of this.apartAlarmArray) {
                    if (alarmPoint.notification === 7) {
                        this.alarmHistData.push({
                            component: alarmPoint.compName,
                            currState: alarmPoint.currState, notification: alarmPoint.notification
                        });
                    } else {
                        //console.log('no notifications');
                    }
                }
                //console.log(this.alarmHistData);
            }
        });
    }


}
