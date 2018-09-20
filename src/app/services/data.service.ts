import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
    private baseURL = environment.baseURL;

    httpOptions = {

    };
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

    }
    // private headers: Headers = new Headers({'Content-Type': 'application/json'});
    private SiteConfigSubject = new Subject<any>();
    private STPSubject = new Subject<any>();
    private TLVLSubject = new Subject<any>();
    private SLVLSubject = new Subject<any>();
    private WTPSubject = new Subject<any>();
    private BWELLSubject = new Subject<any>();
    private BTOTALSubject = new Subject<any>();
    private STOTALSubject = new Subject<any>();
    private PSubject = new Subject<any>();
    private ROSubject = new Subject<any>();
    private BHSubject = new Subject<any>();
    private ALSubject = new Subject<any>();
    private AlarmsSubject = new Subject<any>();
    private OAlarmsSubject = new Subject<any>();
    private MDCSubject = new Subject<any>();
    private MHCSubject = new Subject<any>();
    private MHDCSubject = new Subject<any>();
    private MAHASubject = new Subject<any>();
    private PMChartSubject = new Subject<any>();
    private TMCChartSubject = new Subject<any>();
    private SFAlarmsSubject = new Subject<any>();
    private comeAlarmsSubject = new Subject<any>();
    private ApartDatSummary = new Subject<any>();
    private NoNetworkSubject = new Subject<any>();
    private DisableNav = new Subject<any>();
    //siteConfig

    /* get the pie-chart data from server */
    getpiechart(actionComponentName: String, fromdate: number, todate: number): Promise<any>{
        // console.log('Triggercall');

        // const url = `${this.baseURL + "charts"}/getSources?from_date=${fromdate}&to_date=${todate}`;
        // return this.http.get<any[]>(url, this.httpOptions)
        //     .pipe(
        //     tap(heroes => this.log(`fetched heroes`)),
        //     catchError(this.handleError('getHeroes', []))
        //     );
        let params = {
            'from_date':fromdate,
            'to_date':todate
        }
        let url: string = `${this.baseURL}/site/usage/watersource `;
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, params, {headers: headers}).toPromise();
    }

    /* get the pie-chart data from server */
    getheatMapchart(actionComponentName: String,fromdate: number): Promise<any>{
        console.log('Triggercall');

        // const url = `${this.baseURL + "charts"}/getWaterMapHeatMap?from_date=${fromdate}&to_date=${todate}`;
        // return this.http.get<any[]>(url, this.httpOptions)
        //     .pipe(
        //     tap(heroes => this.log(`fetched heroes`)),
        //     catchError(this.handleError('getHeroes', []))
        //     );

            let params = {
                'from_date':fromdate
            }
            let url: string = `${this.baseURL}/site/watermap `;
            let headers = new HttpHeaders({'Content-Type': 'application/json'});
            return this.http.post(url, params, {headers: headers}).toPromise();
    }

    getHistogramChart(actionComponentName: String, fromdate: number, todate: number): Observable<any[]> {
        console.log('Triggercall');

        const url = `${this.baseURL + "charts"}/getWaterMapHistogram?from_date=${fromdate}&to_date=${todate}`;
        return this.http.get<any[]>(url, this.httpOptions)
            .pipe(
            tap(heroes => this.log(`fetched heroes`)),
            catchError(this.handleError('getHeroes', []))
            );
    }

    getstpchart(actionComponentName: String, fromdate: number, todate: number): Promise<any>{
        let params = {
            'from_date':fromdate,
            'to_date':todate
        }
        let url: string = `${this.baseURL}/site/demand/watertype `;
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, params, {headers: headers}).toPromise();
    }

    getbubble(actionComponentName: String, fromdate: number, todate: number): Promise<any>{
        let params = {
            'from_date':fromdate,
            'to_date':todate
        }
        let url: string = `${this.baseURL}/site/highusers`;
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, params, {headers: headers}).toPromise();
    }

    getganttchart(actionComponentName: String, date: number): Promise<any>{
        
        let params = {
            'from_date':date
        }
        let url: string = `${this.baseURL}/site/pump/yield`;
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, params, {headers: headers}).toPromise();
    }

    gettreeMapchart(actionComponentName: String, fromdate: number, todate: number): Promise<any>{

        let params = {
            'from_date':fromdate,
            'to_date':todate
        }
        let url: string = `${this.baseURL}/site/usage/blocklevel `;
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, params, {headers: headers}).toPromise();
    }

    getsparklinechart(actionComponentName: String, last_week: number): Promise<any>{
        
        let params = {
            'last_week':last_week
        }
        let url: string = `${this.baseURL}/site/trend/watersource`;
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, params, {headers: headers}).toPromise();
    }
    sendSiteConfig(siteConfig: Array<any>) {
        this.SiteConfigSubject.next({ siteConfig: siteConfig });
    }

    getSiteConfig(): Observable<any> {
        return this.SiteConfigSubject.asObservable();
    }

    //daytotal


    //wtp
    sendWTPData(wtp: any) {
        this.WTPSubject.next({ wtp: wtp });
    }

    getWTPData(): Observable<any> {
        return this.WTPSubject.asObservable();
    }

    //wtp


    //stp
    sendSTPData(stp: any) {
        this.STPSubject.next({ stp: stp });
    }

    getSTPData(): Observable<any> {
        return this.STPSubject.asObservable();
    }

    //stp


    //tlvl
    sendtlvlData(tlvl: Array<{ tname: String, level: Number }>) {
        this.TLVLSubject.next({ tlvl: tlvl });
    }

    gettlvlData(): Observable<any> {
        return this.TLVLSubject.asObservable();
    }

    //tlvl


    //slvl
    sendslvlData(slvl: Array<{ sname: String, level: Number }>) {
        this.SLVLSubject.next({ slvl: slvl });
    }

    getslvlData(): Observable<any> {
        return this.SLVLSubject.asObservable();
    }


    //bwell
    sendbwellData(bwell: Array<{ name: String, byield: Number }>) {
        this.BWELLSubject.next({ bwell: bwell });
    }

    getbwellData(): Observable<any> {
        return this.BWELLSubject.asObservable();
    }

    //bwell


    //btotal
    setbtotal(btotal: Array<any>) {
        this.BTOTALSubject.next({ btotal: btotal });
    }

    getbtotal(): Observable<any> {
        return this.BTOTALSubject.asObservable();
    }

    //btotal

    //stotal
    setstotal(stotal: Array<any>) {
        this.STOTALSubject.next({ stot: stotal });
    }

    getstotal(): Observable<any> {
        return this.STOTALSubject.asObservable();
    }

    //stotal


    //alarms
    setAlarmsData(alarms: Array<any>) {
        this.AlarmsSubject.next({ alarms: alarms });
    }

    getAlarmsData(): Observable<any> {
        return this.AlarmsSubject.asObservable();
    }

    //alarms


    //alarms
    setNoNetwork(nonetwork: Boolean) {
        this.NoNetworkSubject.next({ nonetwork: nonetwork });
    }

    getNoNetwork(): Observable<any> {
        return this.NoNetworkSubject.asObservable();
    }

    //alarms


    //disable Nav
    setDisableNav(disablenav: Boolean) {
        this.DisableNav.next({ disablenav: disablenav });
    }

    getDisableNac(): Observable<any> {
        return this.DisableNav.asObservable();
    }


    setOAlarmsData(oalarms: Array<any>) {
        this.OAlarmsSubject.next({ oalarms: oalarms });
    }

    getOAlarmsData(): Observable<any> {
        return this.OAlarmsSubject.asObservable();
    }


    setSFAlarmsData(sfalarms: Array<any>) {
        this.SFAlarmsSubject.next({ sfData: sfalarms });
    }

    getSFAlarmsData(): Observable<any> {
        return this.SFAlarmsSubject.asObservable();
    }


    setcomAlarmsData(comeData: Array<any>) {
        this.comeAlarmsSubject.next({ comeData: comeData });
    }

    getcomAlarmsData(): Observable<any> {
        return this.comeAlarmsSubject.asObservable();
    }


    //ven_rp
    sendpumpData(pump: Array<any>) {
        this.PSubject.next({ pump: pump });
    }

    getpumpData(): Observable<any> {
        return this.PSubject.asObservable();
    }

    //ven_rp


    //ven_prev_month_total
    sendroData(ro: Array<any>) {
        this.ROSubject.next({ ro: ro });
    }

    getroData(): Observable<any> {
        return this.ROSubject.asObservable();
    }


    //ven_prev_month_total


    clearMessage() {
        // this.subject.next();
    }


    sendMDChartArray(mdchart: any[]) {
        this.MDCSubject.next({ mdchart: mdchart });
    }


    getMDChartArray(): Observable<any> {
        return this.MDCSubject.asObservable();
    }


    //month historical Chart

    sendMHChartArray(mhchart: any[]) {
        this.MHCSubject.next({ mhochart: mhchart });
    }


    getMHChartArray(): Observable<any> {
        return this.MHCSubject.asObservable();
    }

    //month historical chart


    //month historical Detail Chart

    sendMHDChartArray(mhdchart: any[]) {
        this.MHDCSubject.next({ mhodchart: mhdchart });
    }


    getMHDChartArray(): Observable<any> {
        return this.MHDCSubject.asObservable();
    }

    //month historical Detail chart


    //month Alarm History

    sendMAHArray(maharray: any[]) {
        this.MAHASubject.next({ maharray: maharray });
    }


    getMAHArray(): Observable<any> {
        return this.MAHASubject.asObservable();
    }

    //month Alarm History


    //month day  Chart

    sendPMChartArray(pmchart: any[]) {
        this.PMChartSubject.next({ pmchart: pmchart });
    }


    getPMChartArray(): Observable<any> {
        return this.PMChartSubject.asObservable();
    }

    //month day chart


    //Three month cost   Chart

    sendTMCChartArray(tmcchart: any[]) {
        this.TMCChartSubject.next({ tmcchart: tmcchart });
    }


    getTMCChartArray(): Observable<any> {
        return this.TMCChartSubject.asObservable();
    }

    //Three month cost   Chart


    //Bill history

    sendBHArray(bhdata: any[]) {
        this.BHSubject.next({ bhdata: bhdata });
    }


    getBHtArray(): Observable<any> {
        return this.BHSubject.asObservable();
    }

    //alarms count

    sendALCount(aldata: any[]) {
        this.ALSubject.next({ alarms: aldata });
    }


    getALCount(): Observable<any> {
        return this.ALSubject.asObservable();
    }


    //alarms no

    sendASummary(asummary: any[]) {
        this.ApartDatSummary.next({ asummary: asummary });
    }


    getASummary(): Observable<any> {
        return this.ApartDatSummary.asObservable();
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        //this.messageService.add('HeroService: ' + message);
        //alert('HeroService: ' + message);
    }

}
