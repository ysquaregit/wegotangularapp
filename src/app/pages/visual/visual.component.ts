import {Component,OnInit,ViewEncapsulation,ViewChild,Input,Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {Globals} from '../../globals';
import {UtilityService} from "../../services/utility.service";
import {Headers,Http} from "@angular/http";
import {MessageService} from "../../services/data.service";
import {environment} from "../../../environments/environment";
import {IMyDpOptions} from 'mydatepicker';
import {Message,SelectItem,Calendar,ProgressSpinnerModule} from 'primeng/primeng';
import * as d3 from 'd3';
// import * as d3Hierarchy from 'd3-hierarchy';
import * as $ from 'jquery/dist/jquery.min.js';
//import 'jquery-ui/ui/widgets/datepicker.js';
import * as Highcharts from 'highcharts/highcharts.js';
import { color } from 'd3';
import { count } from 'rxjs/operator/count';
// import Exporting from 'highcharts/modules/exporting';
import xrange from "highcharts/modules/xrange";
import { open } from 'fs';
import { async } from 'q';
import { appVisualPieChartComponent } from '../../components/visuals/pie-chart/pie-chart.component'
import { appVisualHeatMapComponent } from '../../components/visuals/heat-map/heat-map.component'
// import { ViewChild } from '@angular/core/src/metadata/di';
declare var $: any;
//declare var JQueryUI:any;
@Component({
    selector: 'app-visual',
    templateUrl: './visual.component.html',
    styleUrls: ['./visual.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class VisualComponent implements OnInit {
    siteConfigArray: Array<any> = [];
    today: Date;
    msgs: Message[] = [];
    mode = 'determinate';
    value = 50;
    bufferValue = 75;
    items: Array<any> = [];
    options: Array<any> = [];
    GanttsetData: Array<any> = [];
    RTSChartOptions: Object;
    RTSChartFinalData: Array<any> = [];
    navActive = 'pie';
    Ganttoptions: Object;
    pieChartDataSet: Array<any> = [];
    @ViewChild('piechild') piechild: appVisualPieChartComponent
    @ViewChild('heatChild') heatChild: appVisualHeatMapComponent
    heatMapDataSet: Array<any> = [];
    histogramDataSet: Array<any> = []
    treeMapChartSet: Array<any> = [];
    UsageChartSet: any;
    sparklinesSetData: Array<any> = [];
    fromdateValue: Date;
    toateValue: Date;
    treeMapShowStatus = false;
    bubbleChartDataSet: Object;
    bubbleChartShowStatus = false;
    ganttMapShowStatus = false;
    RTSCHARTStatus = false;
    SLMapShowStatus = false;
    ganttChartObj: Object;
    DatePicker: any;
    public pieflag: boolean;
    componentName: String = "charts";
    RTSChartDataSet: any = [];
    sparkLineWeek:number = 4;
    STPChartShowStatus = false;
    STPChartDataSet = [];
    visualLoading = true;
    heatMappickerToDate:Object;
    heatMapDatePicker:any;
    heatMappickerToDateVal:String;
    selfData:any;
    private width: number;
    private height: number;
    private x;
    private y;

    private node;
    private root;

    private color;
    private maxDepth;
    private topDepth;
    private treemap;
    private chart;
    private parent;

    private apiServer = environment.apiServer;
    private baseURL = environment.baseURL;

    /* Date Picker */
    public myDatePickerOptions: IMyDpOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'dd-mmm-yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false
    };
    public pickerFromDate: any;
    public pickerToDate: any ;

    constructor(private messageService: MessageService, private route: ActivatedRoute, private router: Router,
        private globals: Globals, private utilityService: UtilityService, private http: Http) {
        let curNetworkState = false;
        this.DatePicker = {};
        this.messageService.getNoNetwork().subscribe(message => {
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
        this.maxDepth = 3;
        this.topDepth = 1;
        let d: Date = new Date();
        this.heatMappickerToDate = {
            firstDayOfWeek: 'su',
            monthFormat: 'MMM, YYYY',
            disableKeypress: false,
            allowMultiSelect: false,
            closeOnSelect: undefined,
            closeOnSelectDelay: 100,
            onOpenDelay: 0,
            weekDayFormat: 'ddd',
            appendTo: document.body,
            drops: 'down',
            opens: 'right',
            showNearMonthDays: true,
            showWeekNumbers: false,
            enableMonthSelector: true,
            format: "MM-YYYY",
            yearFormat: 'YYYY',
            showGoToCurrent: true,
            dayBtnFormat: 'DD',
            monthBtnFormat: 'MMM',
            hours12Format: 'hh',
            hours24Format: 'HH',
            meridiemFormat: 'A',
            minutesFormat: 'mm',
            minutesInterval: 1,
            secondsFormat: 'ss',
            secondsInterval: 1,
            showSeconds: false,
            showTwentyFourHours: true,
            timeSeparator: ':',
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: false,
            locale: 'en',
            // min:'2017-08-29 15:50',
            // minTime:'2017-08-29 15:50'
          };
        this.pickerFromDate = { date: {year: (new Date()).getFullYear(), month: (new Date()).getMonth(), day: (new Date()).getDate()} };
        this.pickerToDate = { date: {year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate()} };
        this.heatMappickerToDateVal  = this.getDateFormat(new Date());
        console.log("this.heatMappickerToDateVal",this.heatMappickerToDateVal)
    }




    ngOnInit() {
        /* Set Date */
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        this.fromdateValue = new Date();
        this.toateValue = new Date();
        this.open('pie');
        this.getpiecharts();
        this.selfData = this;
    }


    open(tab) {
        this.navActive = tab;
        switch (tab) {
            case 'pie':
                this.pieChart();
                break;
            case 'heatMap':
                this.heatMapChart();
                break;
            case 'tree':
                this.treeMapChart();
                break;
            case 'RTS':
                this.STPChart();
                break;
            case 'SL':
                this.SLchart();
                break;
            case 'usageChart':
                this.usageChart();
                break;
            case 'ganttChart':
                this.ganttChart();
                break;
            default:
                console.log("Invalid option");
                break;
        }
    }
    /* calling functions */
    getpiecharts(): void {
        this.pieflag = true;
        this.pieChart();
    }

    getganttchart() {
        this.pieflag = true;
        this.ganttChart();
    }

    pieChart() {
        try{
            this.visualLoading = true;
            let getFromDate = (this.pickerFromDate.formatted)?this.pickerFromDate.formatted:this.pickerFromDate;
            let getToDate = (this.pickerToDate.formatted)?this.pickerToDate.formatted:this.pickerToDate;

            if(this.pickerFromDate.formatted) {
                getFromDate = this.pickerFromDate.formatted
                getToDate = this.pickerToDate.formatted
            }
            else {
                getFromDate = this.formatDate(this.pickerFromDate);
                getToDate = this.formatDate(this.pickerToDate);

            }
            this.messageService.getpiechart(this.componentName, getFromDate,getToDate)
            .then((data) => {
                if(data) {
                    this.options = data;
                    setTimeout(() => {
                        this.visualLoading = false;
                    }, 2000);
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }


    STPChart() {
        try{
            this.visualLoading = true;
            this.STPChartShowStatus = false;
            let getFromDate = (this.pickerFromDate.formatted)?this.pickerFromDate.formatted:this.pickerFromDate;
            let getToDate = (this.pickerToDate.formatted)?this.pickerToDate.formatted:this.pickerToDate;

            if(this.pickerFromDate.formatted) {
                getFromDate = this.pickerFromDate.formatted
                getToDate = this.pickerToDate.formatted
            }
            else {
                getFromDate = this.formatDate(this.pickerFromDate);
                getToDate = this.formatDate(this.pickerToDate);

            }
            this.messageService.getstpchart(this.componentName, getFromDate,getToDate)
            .then((data) => {
                if(data) {
                    this.STPChartShowStatus = true;
                    this.STPChartDataSet = data
                    setTimeout(() => {
                        this.visualLoading = false;
                    }, 2000);
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }


    ganttChart() {
        try{
            this.visualLoading = true;
            this.ganttMapShowStatus = false;
            let getFromDate = (this.pickerFromDate.formatted)?this.pickerFromDate.formatted:this.pickerFromDate;
            let getToDate = (this.pickerToDate.formatted)?this.pickerToDate.formatted:this.pickerToDate;

            if(this.pickerFromDate.formatted) {
                getFromDate = this.pickerFromDate.formatted
                getToDate = this.pickerToDate.formatted
            }
            else {
                getFromDate = this.formatDate(this.pickerFromDate);
                getToDate = this.formatDate(this.pickerToDate);

            }
            this.messageService.getganttchart(this.componentName, getFromDate)
            .then((data) => {
                if(data) {
                    this.ganttMapShowStatus = true;
                    this.GanttsetData = data
                    // this.heatChild.ngOnInit();
                    setTimeout(() => {
                        this.visualLoading = false;
                    }, 2000);
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }



    heatMapChart() {
        try{
            if($("#datepicker").val() == undefined || $("#datepicker").val() == "") {
                let dateDefault = this.getDateFormat(new Date());
                console.log(dateDefault)
                $("#datepicker").val(dateDefault)
            }
            $('#datepicker').datepicker({
                autoclose: true,
                minViewMode: 1,
                format: 'mm-yyyy'
            })
            .on('changeDate', function(selected){
                $("#datepicker").val(selected.target.value)
            });

            let getDatePcikerValue = $("#datepicker").val();
            this.visualLoading = true;
            this.treeMapShowStatus = false;
            let getFromDate = getDatePcikerValue
            console.log("getFromDate",getFromDate)
            this.messageService.getheatMapchart(this.componentName, getFromDate)
            .then((data) => {
                if(data) {
                    this.heatMapDataSet = data
                    // this.heatChild.ngOnInit();
                    setTimeout(() => {
                        this.visualLoading = false;
                    }, 2000);
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }

    treeMapChart() {

        try{
            this.visualLoading = true;
            this.treeMapShowStatus = false;
            let getFromDate = (this.pickerFromDate.formatted)?this.pickerFromDate.formatted:this.pickerFromDate;
            let getToDate = (this.pickerToDate.formatted)?this.pickerToDate.formatted:this.pickerToDate;

            if(this.pickerFromDate.formatted) {
                getFromDate = this.pickerFromDate.formatted
                getToDate = this.pickerToDate.formatted
            }
            else {
                getFromDate = this.formatDate(this.pickerFromDate);
                getToDate = this.formatDate(this.pickerToDate);

            }
            this.messageService.gettreeMapchart(this.componentName, getFromDate,getToDate)
            .then((data) => {
                if(data) {
                    this.treeMapChartSet = data
                    this.treeMapShowStatus = true;
                    setTimeout(() => {
                        this.visualLoading = false;
                    }, 2000);
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }

    usageChart() {
        try{
            this.visualLoading = true;
            this.bubbleChartShowStatus = false;
            let getFromDate = (this.pickerFromDate.formatted)?this.pickerFromDate.formatted:this.pickerFromDate;
            let getToDate = (this.pickerToDate.formatted)?this.pickerToDate.formatted:this.pickerToDate;

            if(this.pickerFromDate.formatted) {
                getFromDate = this.pickerFromDate.formatted
                getToDate = this.pickerToDate.formatted
            }
            else {
                getFromDate = this.formatDate(this.pickerFromDate);
                getToDate = this.formatDate(this.pickerToDate);

            }
            this.messageService.getbubble(this.componentName, getFromDate,getToDate)
            .then((data) => {
                if(data) {
                    this.bubbleChartShowStatus = true;
                    this.bubbleChartDataSet = data
                    setTimeout(() => {
                        this.visualLoading = false;
                    }, 2000);
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }

    SLchart() {
        try{
          if(!this.sparkLineWeek) {
              this.sparkLineWeek = 4;
          }
            this.visualLoading = true;
            //this.sparkLineWeek = 4;
            this.SLMapShowStatus = false;
            this.messageService.getsparklinechart(this.componentName, this.sparkLineWeek)
            .then((data) => {
                if(data) {
                    this.SLMapShowStatus = true;
                    this.sparklinesSetData = data;
                    setTimeout(() => {
                        this.visualLoading = false;
                    }, 4000);

                }
            });
          }
        catch(e) {
            console.log(e)
        }

    }

    formatDate(date) {
        let monthFormat = date.date.month;
        if(monthFormat < 10) {
            monthFormat = '0'+monthFormat
        }
        var test =  [date.date.day , monthFormat , date.date.year].join('-');
        return test;
    }

    getDateFormat(date) {
        var d = date;
        // var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        if(curr_month < 10) {
            curr_month = "0"+curr_month;
        }
        return curr_month +"-" +curr_year;
    }

}
