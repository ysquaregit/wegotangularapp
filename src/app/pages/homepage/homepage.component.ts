import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilityService} from "../../services/utility.service";
import {Router} from '@angular/router';
import {Globals} from '../../globals';
import {Headers, Http} from '@angular/http';
import {environment} from "../../../environments/environment";
import {JwtHelper} from 'angular2-jwt';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    siteListArray: any  [] = [];
    @Output() clicked = new EventEmitter<string>();
    private apiServer = environment.apiServer;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private utilityService: UtilityService, private http: Http, private router: Router, private globals: Globals) {

        //console.log(this.apiServer);


    }

    ngOnInit(): void {
        this.utilityService.isLogged().then((result: boolean) => {
            //console.log('-----------');
            let token = sessionStorage.getItem('token');
            let headers: Headers = new Headers({
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            });
            let dct = this.jwtHelper.decodeToken(token);
            //console.log(dct.uid);

            //console.log(btoa('4'));
            //console.log(atob('NA=='));
            //console.log('-----------');
            if (!result) {
                this.router.navigate(['/login']);
            } else {
                //console.log('current details')
                this.globals.currentUID = parseInt(dct.uid, 10);

                this.http.get(this.apiServer + '/sa/saSiteList/' + parseInt(dct.uid, 10), {headers: headers})
                    .subscribe(data => {
                        //console.log(data.json().siteList);
                    this.siteListArray = data.json().siteList;
                });
            }
        });
    }

    selected(siteID: string, siteName: string) {
        //console.log(siteID + '|' + siteName);
        var tmp = parseInt(siteID);
        var algo = tmp * 948311;
        sessionStorage.setItem('sid', String(algo));
        this.globals.currentSiteID = Number(siteID);
        this.globals.currentSiteName = siteName;
        sessionStorage.setItem('siteid', String(this.globals.currentSiteID));
        this.clicked.emit(siteID);
        // ,  {  skipLocationChange: true , queryParams: { siteID: siteID } }
        this.router.navigate(['dashboard']);
    }
}
