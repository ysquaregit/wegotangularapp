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
import { MyDatePickerModule } from 'mydatepicker';
declare var $: any;
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
    sparkLineWeek:number = 0;
    STPChartShowStatus = false;
    STPChartDataSet = [];
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
        this.pickerFromDate = { date: {year: (new Date()).getFullYear(), month: (new Date()).getMonth(), day: (new Date()).getDate()} };
        this.pickerToDate = { date: {year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate()} };
    }




    ngOnInit() {
        /* Set Date */
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        this.fromdateValue = new Date();
        this.toateValue = new Date();
        this.open('pie');
        this.getpiecharts();
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
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }

    RTSChart() {
        /**
         * In order to synchronize tooltips and crosshairs, override the
         * built-in events with handlers defined on the parent element.
         */
        setTimeout(() => {
            $('#STPChartContainer').bind('mousemove touchmove touchstart', function (e) {
                var chart,
                    point,
                    i,
                    event;
                console.log("Highcharts.charts", Highcharts.charts)
                for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                    if (Highcharts.charts[i]) {
                        chart = Highcharts.charts[i];
                        // Find coordinates within the chart
                        event = chart.pointer.normalize(e.originalEvent);
                        // event.chartX = (event.chartX+100) % 500;
                        // Get the hovered point
                        point = chart.series[0].searchPoint(event, true);

                        if (point) {
                            point.highlight(e);
                        }
                    }

                }
            });
        }, 2000);

        /**
         * Override the reset function, we don't need to hide the tooltips and
         * crosshairs.
         */
        Highcharts.Pointer.prototype.reset = function () {
            return undefined;
        };

        /**
         * Highlight a point by showing tooltip, setting hover state and draw crosshair
         */
        Highcharts.Point.prototype.highlight = function (event) {
            //event = this.series.chart.pointer.normalize(event);
            this.onMouseOver(); // Show the hover marker
            this.series.chart.tooltip.refresh(this); // Show the tooltip
            this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
        };

        /**
         * Synchronize zooming through the setExtremes event handler.
         */
        function syncExtremes(e) {
            var thisChart = this.chart;

            if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                console.log("Highcharts.chartsHighcharts.charts", Highcharts.charts)
                Highcharts.each(Highcharts.charts, function (chart) {
                    if (chart !== thisChart) {
                        if (chart.xAxis[0].setExtremes) { // It is null while updating
                            chart.xAxis[0].setExtremes(
                                e.min,
                                e.max,
                                undefined,
                                false, {
                                    trigger: 'syncExtremes'
                                }
                            );
                        }
                    }
                });
            }
        }
        $(".highcharts-container").remove();
        this.RTSCHARTStatus = true;
        // Get the data. The contents of the data file can be viewed at
        $.getJSON('https://api.myjson.com/bins/qex4k',
            function (activity) {
                let chartColor;
                $.each(activity.datasets, function (i, dataset) {
                    if (dataset.name == "Raw") {
                        chartColor = "#89CFF0";
                    } else if (dataset.name == "Treated") {
                        chartColor = "#32CD32";
                    } else {
                        chartColor = "rgba(67,67,72,0.3)";
                    }
                    // Add X values
                    dataset.data = Highcharts.map(dataset.data, function (val, j) {
                        return [activity.xData[j], val];
                    });

                    var $container = $('.STPChartContainer' + i)
                    $('<div id="chart' + i + '">').appendTo('.STPChartContainer');

                    var chart = new Highcharts.Chart({
                        chart: {
                            marginLeft: 40, // Keep all charts left aligned
                            spacingTop: 20,
                            spacingBottom: 20,
                            renderTo: $container[0],
                            height: 178

                        },
                        title: {
                            text: dataset.name,
                            align: 'left',
                            margin: 0,
                            x: 30
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        xAxis: {
                            crosshair: true,
                            events: {
                                setExtremes: syncExtremes
                            },

                            labels: {
                                format: '{value}'
                            },
                            tickInterval: 1,
                            categories: activity.xData,
                            min: 0,
                            max: 24
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        tooltip: {
                            positioner: function () {
                                return {
                                    // right aligned
                                    x: this.chart.chartWidth - this.label.width,
                                    y: 10 // align to title
                                };
                            },
                            borderWidth: 0,
                            backgroundColor: 'none',
                            pointFormat: '{point.y}',
                            headerFormat: '',
                            shadow: false,
                            style: {
                                fontSize: '18px'
                            },
                            valueDecimals: dataset.valueDecimals
                        },
                        series: [{
                            data: dataset.data,
                            name: dataset.name,
                            type: dataset.type,
                            color: chartColor, //Highcharts.getOptions().colors[i],
                            fillOpacity: 0.3,
                            tooltip: {
                                valueSuffix: ' ' + dataset.unit
                            }
                        }]
                    });

                });
            }
        );
    }

    syncExtremes(e) {
        var thisChart = this.chart;

        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(
                            e.min,
                            e.max,
                            undefined,
                            false, {
                                trigger: 'syncExtremes'
                            }
                        );
                    }
                }
            });
        }
    }

    STPChart() {
        try{
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
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }


    ganttChart() {
        try{
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
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }



    heatMapChart() {
        try{
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
            this.messageService.getheatMapchart(this.componentName, getFromDate,getToDate)
            .then((data) => {
                if(data) {
                    this.heatMapDataSet = data
                    // this.heatChild.ngOnInit();
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }

    treeMapChart() {
        
        try{
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
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }

    usageChart() {
        try{
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
                }
            });
        }
        catch(e) {
            console.log(e)
        }
    }

    SLchart() {
        try{
            this.sparkLineWeek = 4;
            this.SLMapShowStatus = false;
            this.messageService.getsparklinechart(this.componentName, this.sparkLineWeek)
            .then((data) => {
                if(data) {
                    this.SLMapShowStatus = true;
                    this.sparklinesSetData = data;
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

}
