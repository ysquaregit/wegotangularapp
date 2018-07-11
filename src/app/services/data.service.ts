import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {


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
    sendSiteConfig(siteConfig: Array<any>) {
        this.SiteConfigSubject.next({siteConfig: siteConfig});
    }

    getSiteConfig(): Observable<any> {
        return this.SiteConfigSubject.asObservable();
    }

//daytotal


//wtp
    sendWTPData(wtp: any) {
        this.WTPSubject.next({wtp: wtp});
    }

    getWTPData(): Observable<any> {
        return this.WTPSubject.asObservable();
    }

//wtp


    //stp
    sendSTPData(stp: any) {
        this.STPSubject.next({stp: stp});
    }

    getSTPData(): Observable<any> {
        return this.STPSubject.asObservable();
    }

//stp


    //tlvl
    sendtlvlData(tlvl: Array<{ tname: String, level: Number }>) {
        this.TLVLSubject.next({tlvl: tlvl});
    }

    gettlvlData(): Observable<any> {
        return this.TLVLSubject.asObservable();
    }

//tlvl


    //slvl
    sendslvlData(slvl: Array<{ sname: String, level: Number }>) {
        this.SLVLSubject.next({slvl: slvl});
    }

    getslvlData(): Observable<any> {
        return this.SLVLSubject.asObservable();
    }


    //bwell
    sendbwellData(bwell: Array<{ name: String, byield: Number }>) {
        this.BWELLSubject.next({bwell: bwell});
    }

    getbwellData(): Observable<any> {
        return this.BWELLSubject.asObservable();
    }

//bwell


    //btotal
    setbtotal(btotal: Array<any>) {
        this.BTOTALSubject.next({btotal: btotal});
    }

    getbtotal(): Observable<any> {
        return this.BTOTALSubject.asObservable();
    }

//btotal

    //stotal
    setstotal(stotal: Array<any>) {
        this.STOTALSubject.next({stot: stotal});
    }

    getstotal(): Observable<any> {
        return this.STOTALSubject.asObservable();
    }

//stotal


    //alarms
    setAlarmsData(alarms: Array<any>) {
        this.AlarmsSubject.next({alarms: alarms});
    }

    getAlarmsData(): Observable<any> {
        return this.AlarmsSubject.asObservable();
    }

//alarms


    //alarms
    setNoNetwork(nonetwork: Boolean) {
        this.NoNetworkSubject.next({nonetwork: nonetwork});
    }

    getNoNetwork(): Observable<any> {
        return this.NoNetworkSubject.asObservable();
    }

//alarms


    //disable Nav
    setDisableNav(disablenav: Boolean) {
        this.DisableNav.next({disablenav: disablenav});
    }

    getDisableNac(): Observable<any> {
        return this.DisableNav.asObservable();
    }


    setOAlarmsData(oalarms: Array<any>) {
        this.OAlarmsSubject.next({oalarms: oalarms});
    }

    getOAlarmsData(): Observable<any> {
        return this.OAlarmsSubject.asObservable();
    }


    setSFAlarmsData(sfalarms: Array<any>) {
        this.SFAlarmsSubject.next({sfData: sfalarms});
    }

    getSFAlarmsData(): Observable<any> {
        return this.SFAlarmsSubject.asObservable();
    }


    setcomAlarmsData(comeData: Array<any>) {
        this.comeAlarmsSubject.next({comeData: comeData});
    }

    getcomAlarmsData(): Observable<any> {
        return this.comeAlarmsSubject.asObservable();
    }


    //ven_rp
    sendpumpData(pump: Array<any>) {
        this.PSubject.next({pump: pump});
    }

    getpumpData(): Observable<any> {
        return this.PSubject.asObservable();
    }

//ven_rp


    //ven_prev_month_total
    sendroData(ro: Array<any>) {
        this.ROSubject.next({ro: ro});
    }

    getroData(): Observable<any> {
        return this.ROSubject.asObservable();
    }


//ven_prev_month_total


    clearMessage() {
        // this.subject.next();
    }


    sendMDChartArray(mdchart: any[]) {
        this.MDCSubject.next({mdchart: mdchart});
    }


    getMDChartArray(): Observable<any> {
        return this.MDCSubject.asObservable();
    }


//month historical Chart

    sendMHChartArray(mhchart: any[]) {
        this.MHCSubject.next({mhochart: mhchart});
    }


    getMHChartArray(): Observable<any> {
        return this.MHCSubject.asObservable();
    }

    //month historical chart


    //month historical Detail Chart

    sendMHDChartArray(mhdchart: any[]) {
        this.MHDCSubject.next({mhodchart: mhdchart});
    }


    getMHDChartArray(): Observable<any> {
        return this.MHDCSubject.asObservable();
    }

    //month historical Detail chart


    //month Alarm History

    sendMAHArray(maharray: any[]) {
        this.MAHASubject.next({maharray: maharray});
    }


    getMAHArray(): Observable<any> {
        return this.MAHASubject.asObservable();
    }

    //month Alarm History


    //month day  Chart

    sendPMChartArray(pmchart: any[]) {
        this.PMChartSubject.next({pmchart: pmchart});
    }


    getPMChartArray(): Observable<any> {
        return this.PMChartSubject.asObservable();
    }

    //month day chart


    //Three month cost   Chart

    sendTMCChartArray(tmcchart: any[]) {
        this.TMCChartSubject.next({tmcchart: tmcchart});
    }


    getTMCChartArray(): Observable<any> {
        return this.TMCChartSubject.asObservable();
    }

    //Three month cost   Chart


    //Bill history

    sendBHArray(bhdata: any[]) {
        this.BHSubject.next({bhdata: bhdata});
    }


    getBHtArray(): Observable<any> {
        return this.BHSubject.asObservable();
    }

    //alarms count

    sendALCount(aldata: any[]) {
        this.ALSubject.next({alarms: aldata});
    }


    getALCount(): Observable<any> {
        return this.ALSubject.asObservable();
    }


    //alarms no

    sendASummary(asummary: any[]) {
        this.ApartDatSummary.next({asummary: asummary});
    }


    getASummary(): Observable<any> {
        return this.ApartDatSummary.asObservable();
    }


}
