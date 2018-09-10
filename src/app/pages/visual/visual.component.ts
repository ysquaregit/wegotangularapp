import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    Input
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    Globals
} from '../../globals';
import {
    UtilityService
} from "../../services/utility.service";
import {
    Headers,
    Http
} from "@angular/http";
import {
    MessageService
} from "../../services/data.service";
import {
    environment
} from "../../../environments/environment";
import {
    IMyDpOptions
} from 'mydatepicker';
import {
    Message
} from 'primeng/primeng';
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
    RTSCHARTStatus = false;
    ganttChartObj: Object;
    DatePicker: any;
    public pieflag: boolean;
    componentName: String = "charts";
    RTSChartDataSet: any = [];

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
        // other options...
        todayBtnTxt: 'Today',
        dateFormat: 'dd-mmm-yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
    };

    // Initialized to specific date (09.10.2018).
    public pickerFromDate: any = {
        date: {
            year: 2018,
            month: 10,
            day: 9
        }
    };
    public pickerToDate: any = {
        date: {
            year: 2018,
            month: 10,
            day: 9
        }
    };

    constructor(private messageService: MessageService, private route: ActivatedRoute, private router: Router,
        private globals: Globals, private utilityService: UtilityService, private http: Http) {
        let curNetworkState = false;
        this.DatePicker = {};
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

        this.maxDepth = 3;
        this.topDepth = 1;
    }



    /*  getheatMapchart() {
         this.getHistogramChart();
         console.log(this.DatePicker.pickerFromDate.formatted);
         console.log(this.DatePicker.pickerToDate.formatted);
         const url = `${this.baseURL + "charts"}/getWaterMapHeatMap?from_date=${this.DatePicker.pickerFromDate.formatted}&to_date=${this.DatePicker.pickerToDate.formatted}`
         return this.http.get(url).subscribe(activity => {
             this.heatMapDataSet = activity.json();
         });
     } */

    getHistogramChart() {
        console.log(this.DatePicker.HeatpickerFromDate.formatted);
        console.log(this.DatePicker.HeatpickerToDate.formatted);
        const url = `${this.baseURL + "charts"}/getWaterMapHistogram?from_date=${this.DatePicker.HeatpickerFromDate.formatted}&to_date=${this.DatePicker.HeatpickerToDate.formatted}`
        return this.http.get(url).subscribe(activity => {
            this.histogramDataSet = activity.json();
        });
    }

    getstpchart() {
        console.log(this.DatePicker.RTSpickerFromDate.formatted);
        console.log(this.DatePicker.RTSpickerToDate.formatted);
        const url = `${this.baseURL + "charts"}/getWaterDemand?from_date=${this.DatePicker.RTSpickerFromDate.formatted}&to_date=${this.DatePicker.RTSpickerToDate.formatted}`
        return this.http.get(url).subscribe(activity => {
            this.RTSChartDataSet = activity
        });
    }

    getbubble() {
        console.log(this.DatePicker.UsagepickerToDate.formatted);
        console.log(this.DatePicker.UsagepickerToDate.formatted);
        const url = `${this.baseURL + "charts"}/getHighUsers?from_date=${this.DatePicker.UsagepickerFromDate.formatted}&to_date=${this.DatePicker.UsagepickerToDate.formatted}`
        return this.http.get(url).subscribe(activity => {
            this.UsageChartSet = activity.json();
        });
    }

    /*  getganttchart() {
         console.log(this.DatePicker.pickerFromDate.formatted);
         console.log(this.DatePicker.pickerToDate.formatted);
         const url = `${this.baseURL + "charts"}/getPumpsYield?from_date=${this.DatePicker.ganttpickerFromDate.formatted}&to_date=${this.DatePicker.ganttpickerToDate.formatted}`
         return this.http.get(url).subscribe(activity => {
             this.GanttsetData = activity.json();
         });
     } */

    gettreeMapchart() {
        console.log(this.DatePicker.TreepickerFromDate.formatted);
        console.log(this.DatePicker.TreepickerToDate.formatted);
        const url = `${this.baseURL + "charts"}/getBlockLevel?from_date=${this.DatePicker.TreepickerFromDate.formatted}&to_date=${this.DatePicker.TreepickerToDate.formatted}`
        return this.http.get(url).subscribe(activity => {
            this.treeMapChartSet = activity.json();
        });
    }

    getsparklinechart() {
        console.log(this.DatePicker.LastWeek);
        const url = `${this.baseURL + "charts"}/getSourcesTrend?last_week=${this.DatePicker.LastWeek}`
        console.log(url);
        return this.http.get(url).subscribe(activity => {
            this.sparklinesSetData = activity.json();
        });
    }

    ngOnInit() {
        this.fromdateValue = new Date();
        this.toateValue = new Date();
        this.open('pie');
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
                this.RTSChart();
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

    getpiecharts(): void {
        console.log('Triggercall');
        this.pieflag = true;
        this.pieChart();
    }

    pieChart() {
        console.log('tabCall');
        if (this.pieflag == true) {
            this.messageService.getpiechart(this.componentName, this.DatePicker.PiepickerFromDate.formatted, this.DatePicker.PiepickerToDate.formatted)
                .subscribe(activity => {
                    this.options = activity;
                    console.log('beforeFunction');
                    this.piechild.ngOnInit();
                    this.pieflag = false;
                });
        }
        /* 
                this.options = [{
                    name: 'Sources 1',
                    y: 61.41
                }, {
                    name: 'Sources 2',
                    y: 11.84
                }, {
                    name: 'Sources 3',
                    y: 10.85
                }, {
                    name: 'Sources 4',
                    y: 500
                }, {
                    name: 'Sources 5',
                    y: 250
                }] */
    }

    RTSChart() {
        // $('#container').bind('mousemove touchmove touchstart', function (e) {
        //     var chart,
        //         point,
        //         i,
        //         event;

        //     for (i = 0; i < Highcharts.charts.length; i = i + 1) {
        //         chart = Highcharts.charts[i];
        //         // Find coordinates within the chart
        //         event = chart.pointer.normalize(e.originalEvent);
        //         // Get the hovered point
        //         point = chart.series[0].searchPoint(event, true);

        //         if (point) {
        //             point.highlight(e);
        //         }
        //     }
        // });
        // /**
        //  * Override the reset function, we don't need to hide the tooltips and
        //  * crosshairs.
        //  */
        // Highcharts.Pointer.prototype.reset = function () {
        //     return undefined;
        // };

        // /**
        //  * Highlight a point by showing tooltip, setting hover state and draw crosshair
        //  */
        // Highcharts.Point.prototype.highlight = function (event) {
        //     event = this.series.chart.pointer.normalize(event);
        //     this.onMouseOver(); // Show the hover marker
        //     this.series.chart.tooltip.refresh(this); // Show the tooltip
        //     this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
        // };
        // let headers: Headers = new Headers({
        //     'Content-Type': 'application/json'
        // });
        // //https://api.myjson.com/bins/pn21g awsj8
        // this.http.get('https://api.myjson.com/bins/qex4k').subscribe(activity => {
        //     var chartColor;
        //     activity.json().datasets.forEach((dataset,i) => {
        //         if(dataset.name == "Raw") {
        //             chartColor = "#89CFF0";
        //         }
        //         else if(dataset.name == "Treated") {
        //             chartColor = "#32CD32";
        //         }
        //         else {
        //             chartColor = "rgba(67,67,72,0.3)";
        //         }
        //         this.RTSChartOptions = {
        //             chart: {
        //                 type: dataset.type,
        //                 zoomType: 'x',
        //                 height: 300
        //             },
        //             title: {
        //                 text: dataset.name,
        //             },
        //             tooltip: {
        //                 shared: true,
        //                 xDateFormat: '%m/%d/%Y',
        //                 valueDecimals: 2,
        //                 crosshairs: true,
        //                 backgroundColor: 'rgba(0, 0, 0, 0.85)',
        //                 style: {
        //                     color: '#F0F0F0'
        //                 }
        //             },
        //             xAxis: {
        //                 crosshair: true,
        //                 dateTimeLabelFormats: {
        //                     minute: '%H'
        //                 },
        //                 labels: {
        //                     format: '{value}'
        //                 },
        //                 tickInterval:8,
        //                 categories: activity.json().xData,
        //                 events: {
        //                     setExtremes: this.syncExtremes
        //                 },
        //             },
        //             yAxis: [{
        //                 title: {
        //                     text: dataset.Name
        //                 },
        //                 height: 200,
        //                 lineWidth: 2,
        //                 top: 0,
        //                 labels: {
        //                     format: '{value} K/l'
        //                 }
        //             }],
        //             legend: {
        //                 enabled: true,
        //             },
        //             plotOptions: {
        //                 series: {
        //                     pointStart: 0,
        //                     color: '#2B908F'
        //                 }
        //             },
        //             series: [{
        //                 name: dataset.Name,
        //                 data: dataset.data,
        //                 yAxis : 0,
        //                 color: chartColor,//Highcharts.getOptions().colors[i],
        //                 fillOpacity: 0.3
        //             }]
        //         };
        //         this.RTSChartFinalData.push(this.RTSChartOptions);
        //     });
        // });
        /*
        The purpose of this demo is to demonstrate how multiple charts on the same page
        can be linked through DOM and Highcharts events and API methods. It takes a
        standard Highcharts config with a small variation for each data set, and a
        mouse/touch event handler to bind the charts together.
        */



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
        $.getJSON(
            'https://api.myjson.com/bins/qex4k',
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

    getganttchart() {
        console.log('Triggercall');
        this.pieflag = true;
        this.ganttChart();
    }

    ganttChart() {
        console.log('tabCall');
        if (this.pieflag == true) {
            this.messageService.getganttchart(this.componentName, this.DatePicker.ganttpickerFromDate.formatted, this.DatePicker.ganttpickerToDate.formatted)
                .subscribe(activity => {
                    this.GanttsetData = activity;
                    console.log('beforeFunction');
                    this.pieflag = false;
                });
        }

        this.ganttChartObj = {
            chart: {
                type: 'xrange',
                width: 900,
                height: 500,
                zoomType: 'xy'
            },
            title: {
                text: 'Pumps Yield'
            },
            xAxis: {
                //    type: 'datetime'
                top: 50,
                //type: 'datetime'
                min: 0,
                tickInterval: 1,
                title: {
                    text: 'Hours'
                }
            },
            yAxis: {
                title: {
                    text: 'Sources'
                },
                categories: ['Pump 1', 'Pump 2', 'Pump 3', 'Pump 4', 'Pump 5', 'Pump 6'],
                reversed: true
            },
            tooltip: {
                enabled: true,
                formatter: function () {
                    return '<b>' + this.point.options.label + '</b><br/>' + '<b> Yield value :' + this.point.options.yieldValue + ' K/l</b><br/>'
                }
            },

            series: [{
                name: 'Pumps On / Off Status',
                // pointPadding: 0,
                // groupPadding: 0,
                borderColor: 'gray',
                pointWidth: 20,
                data: this.GanttsetData,
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.point.options.yieldPercentage + "%";
                    }
                }
            }]
        };
    }

    getheatMapchart() {
        console.log('Triggercall');
        this.pieflag = true;
        this.heatMapChart();
        this.histroGramChart();
    }

    heatMapChart() {
        console.log('tabCall');
        if (this.pieflag == true) {
            this.messageService.getheatMapchart(this.componentName, this.DatePicker.HeatpickerFromDate.formatted, this.DatePicker.HeatpickerToDate.formatted)
                .subscribe(activity => {
                    this.heatMapDataSet = activity;
                    console.log('beforeFunction');
                    this.heatChild.ngOnInit();
                    this.pieflag = false;
                });
        }
    }

    histroGramChart() {
        console.log('tabCall');
        if (this.pieflag == true) {
            this.messageService.getHistogramChart(this.componentName, this.DatePicker.HeatpickerFromDate.formatted, this.DatePicker.HeatpickerToDate.formatted)
                .subscribe(activity => {
                    this.histogramDataSet = activity;
                    console.log('beforeFunction');
                    this.pieflag = false;
                });
        }
    }

    treeMapChart() {

        this.http.get('https://api.myjson.com/bins/vi8tg').subscribe(activity => {
            this.treeMapChartSet = activity.json();
            this.treeMapShowStatus = true;
        });
    }

    usageChart() {
        var diameter = 500,
            format = d3.format(",d"),
            color = d3.scale.category20c();

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select("#generateGraph").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var tooltip = d3.select("#generateGraph")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "rgba(0, 0, 0, 0.75)")
            .style("border-radius", "6px")
            .style("font", "12px sans-serif")
            .text("tooltip");
        //https://api.myjson.com/bins/jyiro

        //https://api.myjson.com/bins/101lzo
        d3.json("https://api.myjson.com/bins/d8g9g", function (error, root) {
            var node = svg.selectAll(".node")
                .data(bubble.nodes(classes(root))
                    .filter(function (d) { return !d.children; }))
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

            node.append("circle")
                .attr("r", function (d) { return d.r; })
                .style("fill", function <dataType>(d) { console.log(d); return color(Math.random().toString().substr(10, 10)); })
                .on("mouseover", function <dataType>(d) {
                    tooltip.text(d.className + ": " + format(d.value));
                    tooltip.style("visibility", "visible");
                })
                .on("mousemove", function <dataType>(d) {
                    if (d.className) {
                        tooltip.transition()
                            .duration(200)
                        tooltip.html(d.className + "<br/>" + d.value + " K/l")
                            .style("left", ((<any>d3.event).pageX + 10) + "px")
                            .style("top", ((<any>d3.event).pageY - 10) + "px");
                    }
                })
                .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });

            node.append("text")
                .attr("dy", ".3em")
                .style("text-anchor", "middle")
                .style("pointer-events", "none")
                .text(function <dataType>(d) { return d.className.substring(0, d.r / 3); });
        });

        // Returns a flattened hierarchy containing all leaf nodes under the root.
        function classes(root) {
            var classes = [];

            function recurse(name, node) {
                if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
                else classes.push({ packageName: name, className: node.name, value: node.size });
            }

            recurse(null, root);
            return { children: classes };
        }

        d3.select(self.frameElement).style("height", diameter + "px");

    }

    //     usageChart() {
    //         var diameter = 500,
    //     format = d3.format(",d"),
    //     color = d3.scale.category20c();
    //
    //     var bubble = d3.layout.pack()
    //         .sort(null)
    //         .size([diameter, diameter])
    //         .padding(1.5);
    //
    //     var svg = d3.select("#generateGraph").append("svg")
    //         .attr("width", diameter)
    //         .attr("height", diameter)
    //         .attr("class", "bubble");
    //
    //     var tooltip = d3.select("#generateGraph")
    //         .append("div")
    //         .style("position", "absolute")
    //         .style("z-index", "10")
    //         .style("visibility", "hidden")
    //         .style("color", "white")
    //         .style("padding", "8px")
    //         .style("background-color", "rgba(0, 0, 0, 0.75)")
    //         .style("border-radius", "6px")
    //         .style("font", "12px sans-serif")
    //         .text("tooltip");
    // //https://api.myjson.com/bins/jyiro
    //
    // //https://api.myjson.com/bins/101lzo
    //     d3.json("https://api.myjson.com/bins/mlgz8", function(error, root) {
    //     var node = svg.selectAll(".node")
    //         .data(bubble.nodes(classes(root))
    //         .filter(function(d) { return !d.children; }))
    //         .enter().append("g")
    //         .attr("class", "node")
    //         .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    //
    //     node.append("circle")
    //         .attr("r", function(d) { return d.r; })
    //         .style("fill", function<dataType>(d) { console.log(d);return color(Math.random().toString().substr(10,10)); })
    //         .on("mouseover", function<dataType>(d) {
    //                 tooltip.text(d.className + ": " + format(d.value));
    //                 tooltip.style("visibility", "visible");
    //         })
    //         .on("mousemove", function(d) {
    //             //return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    //             return tooltip.style("top", "10px").style("left", "10px");
    //         })
    //         .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    //
    //     node.append("text")
    //         .attr("dy", ".3em")
    //         .style("text-anchor", "middle")
    //         .style("pointer-events", "none")
    //         .text(function<dataType>(d) { return d.className.substring(0, d.r / 3); });
    //     });
    //
    //     // Returns a flattened hierarchy containing all leaf nodes under the root.
    //     function classes(root) {
    //     var classes = [];
    //
    //     function recurse(name, node) {
    //         if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    //         else classes.push({packageName: name, className: node.name, value: node.size});
    //     }
    //
    //     recurse(null, root);
    //     return {children: classes};
    //     }
    //
    //     d3.select(self.frameElement).style("height", diameter + "px");
    //
    //     }

    SLchart() {
        this.http.get('https://api.myjson.com/bins/ht54c').subscribe(activity => {
            this.sparklinesSetData = activity.json();
        });

    }

}
