import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Message} from 'primeng/primeng';
import {Headers, Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {JwtHelper} from 'angular2-jwt';
import {MessageService} from "../../services/data.service";
import {ModalDialogService} from "ngx-modal-dialog";


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    msgs: Message[] = [];
    msgs2: Message[] = [];
    val1: string;
    jwtHelper: JwtHelper = new JwtHelper();
    val2: string = '1';
    pn1: string = "9884401015";
    pn2: string = "";
    pn3: string = "";
    em1: string = "sriram@wegot.in";
    em2: string = "";
    em3: string = "";
    wsettings: Array<any> = [];
    ems: Array<any> = [];
    sms: Array<any> = [];
    raw: Number = 0.10;
    ro: Number = 0.10;
    hot: Number = 0.10;
    stp: Number = 0.10;
    slabs: Array<any> = [];
    addNew: number = 0;
    phones: Array<any> = [];
    emails: Array<any> = [];
    fcCost: Number = 0;
    fcTax: Number = 0;
    sqft: Number = 0;
    sqCost: Number = 0;
    settings = {
        columns: {

            slabfrom: {
                title: 'From Litre',
                filter: false
            },
            slabto: {
                title: 'To Litre',
                filter: false
            },
            slabrate: {
                title: 'Cost Per Litre',
                filter: false
            }
        },
        actions: {
            edit: false,
            delete: true,
            add: true
        },
        mode: 'inline',
        delete: {
            confirmDelete: true
        },
        add: {
            confirmCreate: true,
        },


    };
    phonesettings = {
        columns: {

            mobile_number: {
                title: 'Mobile Number',
                filter: false
            }
        },
        actions: {
            edit: false,
            delete: true,
            add: true
        },
        mode: 'inline',
        delete: {
            confirmDelete: true
        },
        add: {
            confirmCreate: true,
        },


    };
    emailsettings = {
        columns: {

            email_id: {
                title: 'Email Ids',
                filter: false
            }
        },
        actions: {
            edit: false,
            delete: true,
            add: true
        },
        mode: 'inline',
        delete: {
            confirmDelete: true
        },
        add: {
            confirmCreate: true,
        },


    };
    private apiServer = environment.apiServer;

    constructor(private messageService: MessageService, private http: Http, private modalService: ModalDialogService, private viewRef: ViewContainerRef) {
        let curNetworkState = false;
        this.slabs = [{id: 1, name: 'one', froml: 0, tol: 2000, cpl: 0.05}, {
            id: 2,
            name: 'two',
            froml: 2001,
            tol: 4000,
            cpl: 0.08
        }];
        this.messageService.getNoNetwork().subscribe(message => {
            // console.log('from observable for no network');

            // console.log(message.nonetwork);
            if (message.nonetwork === true) {

                curNetworkState = message;
                this.msgs2 = [{
                    severity: 'error',
                    summary: 'No Internet Access ',
                    detail: 'Check Internet Connectivity'
                }];

            } else if (message.nonetwork === false) {
                curNetworkState = message;
                this.msgs2 = [];
            }


        });


        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let dct = this.jwtHelper.decodeToken(token);


        this.getslabs();
        this.getsms();
        this.getemails();

        this.http.post(this.apiServer + '/config/config', {
            sid: sessionStorage.getItem('sid'),
            uid: dct.uid
        }, {headers: headers}).subscribe(data => { // Read the result field from the JSON response.
            //console.log(data.json());
            this.wsettings = data.json().wsettings;
            this.ems = data.json().ems;
            this.sms = data.json().sms;

            this.pn1 = this.sms[0];
            this.pn2 = this.sms[1];
            this.pn3 = this.sms[2];


            this.em1 = this.ems[0];
            this.em2 = this.ems[1];
            this.em3 = this.ems[2];

            this.raw = this.wsettings[0].cpl;
            this.ro = this.wsettings[1].cpl;
            this.hot = this.wsettings[2].cpl;
            this.stp = this.wsettings[3].cpl;


            this.val2 = String(data.json().mc.cost_type);
            this.fcCost = data.json().mc.fc_cost;
            this.fcTax = data.json().mc.fc_tax;
            this.sqft = data.json().mc.sqft;
            this.sqCost = data.json().mc.sq_cost;


        });


    }

    ngOnInit() {


    }


    waterRateUpdate() {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let dct = this.jwtHelper.decodeToken(token);

        this.http.post(this.apiServer + '/config/settings/cpl', {
            raw: this.raw,
            ro: this.ro,
            hot: this.hot,
            stp: this.stp,
            sid: sessionStorage.getItem('sid'),
            uid: dct.uid
        }, {headers: headers}).subscribe(data => {
            //console.log(data);
            this.msgs.push({severity: 'success', summary: 'Updated!', detail: String(data.json().message)});

        });


    }


    smsUpdate() {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let dct = this.jwtHelper.decodeToken(token);
        this.http.post(this.apiServer + '/config/noti/sms', {
            pn1: this.pn1,
            pn2: this.pn2,
            pn3: this.pn3,
            sid: sessionStorage.getItem('sid'),
            uid: dct.uid
        }, {headers: headers}).subscribe(data => {
            //console.log(data);
            this.msgs.push({severity: 'success', summary: 'Updated!', detail: String(data.json().message)});

        });


    }

    emailUpdate() {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let dct = this.jwtHelper.decodeToken(token);

        this.http.post(this.apiServer + '/config/noti/email', {
            em1: this.em1,
            em2: this.em2,
            em3: this.em3,
            sid: sessionStorage.getItem('sid'),
            uid: dct.uid
        }, {headers: headers}).subscribe(data => {
            //console.log(data);
            this.msgs.push({severity: 'success', summary: 'Updated!', detail: String(data.json().message)});

        });
    }


    MCUpdate() {
        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let dct = this.jwtHelper.decodeToken(token);

        this.http.post(this.apiServer + '/config/settings/mc', {
            fc: this.fcCost,
            fct: this.fcTax,
            sqft: this.sqft,
            sqc: this.sqCost,
            sid: sessionStorage.getItem('sid'),
            uid: dct.uid,
            ct: this.val2
        }, {headers: headers}).subscribe(data => {
            //console.log(data);
            this.msgs.push({severity: 'success', summary: 'Updated!', detail: String(data.json().message)});

        });
    }

    nodata() {
        alert('No Sqr.Ft Data available for configuration');
    }


    deleteclicked(event) {
        if (window.confirm('Are you sure you want to delete?')) {

            console.log(event.data);
            let token = sessionStorage.getItem('token');
            let headers: Headers = new Headers({
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            });
            let dct = this.jwtHelper.decodeToken(token);

            this.http.post(this.apiServer + '/config/config/delslabs', {

                sid: sessionStorage.getItem('sid'),
                id: event.data.id

            }, {headers: headers}).subscribe(data => {
                event.confirm.resolve(data);
                this.msgs.push({severity: 'failure', summary: 'Deleted!', detail: 'Slab Deleted'});
                console.log(data);


            });


        } else {
            event.confirm.reject();
        }
    }

    createclicked(event) {
        if (window.confirm('Are you sure you want to add this slab setting?')) {
            console.log(event.newData);
            let obj = event.newData;

            let token = sessionStorage.getItem('token');
            let headers: Headers = new Headers({
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            });
            let dct = this.jwtHelper.decodeToken(token);

            this.http.post(this.apiServer + '/config/config/setslabs', {

                sid: sessionStorage.getItem('sid'),
                slabfrom: obj.slabfrom,
                slabto: obj.slabto,
                slabrate: obj.slabrate

            }, {headers: headers}).subscribe(data => {
                this.getslabs();
                event.confirm.resolve(event.newData);

                this.msgs.push({severity: 'success', summary: 'Added!', detail: 'Slab Created'});
                console.log(data);
            });

        } else {
            event.confirm.reject();
        }

    }


    deleteSMSclicked(event) {
        if (window.confirm('Are you sure you want to delete?')) {

            console.log(event.data);
            let token = sessionStorage.getItem('token');
            let headers: Headers = new Headers({
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            });
            let dct = this.jwtHelper.decodeToken(token);

            this.http.post(this.apiServer + '/config/config/delsms', {

                sid: sessionStorage.getItem('sid'),
                id: event.data.id

            }, {headers: headers}).subscribe(data => {
                event.confirm.resolve(data);
                this.msgs.push({
                    severity: 'failure',
                    summary: 'Deleted!',
                    detail: 'Mobile Number removed from Notification List'
                });
                console.log(data);


            });


        } else {
            event.confirm.reject();
        }
    }

    createSMSclicked(event) {
        if (window.confirm('Are you sure you want to add this Mobile Number?')) {
            console.log(event.newData);
            let obj = event.newData;

            let token = sessionStorage.getItem('token');
            let headers: Headers = new Headers({
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            });
            let dct = this.jwtHelper.decodeToken(token);

            this.http.post(this.apiServer + '/config/config/setsms', {

                sid: sessionStorage.getItem('sid'),
                mn: obj.mobile_number,
                uid: 0

            }, {headers: headers}).subscribe(data => {
                this.getsms();
                event.confirm.resolve(event.newData);

                this.msgs.push({severity: 'success', summary: 'Added!', detail: 'Mobile Number added.'});
                console.log(data);
            });

        } else {
            event.confirm.reject();
        }

    }


    deleteEmailclicked(event) {
        if (window.confirm('Are you sure you want to delete?')) {

            console.log(event.data);
            let token = sessionStorage.getItem('token');
            let headers: Headers = new Headers({
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            });
            let dct = this.jwtHelper.decodeToken(token);

            this.http.post(this.apiServer + '/config/config/delemail', {

                sid: sessionStorage.getItem('sid'),
                id: event.data.id

            }, {headers: headers}).subscribe(data => {
                event.confirm.resolve(data);
                this.msgs.push({
                    severity: 'failure',
                    summary: 'Deleted!',
                    detail: 'Email Id removed from Notification List'
                });
                console.log(data);


            });


        } else {
            event.confirm.reject();
        }
    }

    createEmailclicked(event) {
        if (window.confirm('Are you sure you want to add this Email Id?')) {
            console.log(event.newData);
            let obj = event.newData;

            let token = sessionStorage.getItem('token');
            let headers: Headers = new Headers({
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            });
            let dct = this.jwtHelper.decodeToken(token);

            this.http.post(this.apiServer + '/config/config/setemail', {

                sid: sessionStorage.getItem('sid'),
                emailid: obj.email_id,
                uid: 0

            }, {headers: headers}).subscribe(data => {
                this.getemails();
                event.confirm.resolve(event.newData);

                this.msgs.push({severity: 'success', summary: 'Added!', detail: 'Email Id added.'});
                console.log(data);
            });

        } else {
            event.confirm.reject();
        }

    }


    showAddMore() {
        this.addNew = 1;
    }


    cancelall() {
        this.addNew = 0;
    }


    getslabs() {

        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let dct = this.jwtHelper.decodeToken(token);


        this.http.post(this.apiServer + '/config/config/getslabs', {
            sid: sessionStorage.getItem('sid'),
            uid: dct.uid
        }, {headers: headers}).subscribe(data => { // Read the result field from the JSON response.
            //console.log(data.json());
            this.slabs = data.json().slabRates;
        });
    }


    getsms() {

        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let dct = this.jwtHelper.decodeToken(token);


        this.http.post(this.apiServer + '/config/config/getsms', {
            sid: sessionStorage.getItem('sid'),
            uid: dct.uid
        }, {headers: headers}).subscribe(data => { // Read the result field from the JSON response.
            //console.log(data.json());
            // change it to phones variable after update
            this.phones = data.json().slabRates;
        });
    }


    getemails() {

        let token = sessionStorage.getItem('token');
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
        });
        let dct = this.jwtHelper.decodeToken(token);


        this.http.post(this.apiServer + '/config/config/getemail', {
            sid: sessionStorage.getItem('sid'),
            uid: dct.uid
        }, {headers: headers}).subscribe(data => { // Read the result field from the JSON response.
            //console.log(data.json());
            // change it to phones variable after update
            this.emails = data.json().emails;
        });
    }

}
