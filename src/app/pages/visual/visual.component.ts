import {
    Component,
    OnInit,
    ViewEncapsulation,
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
import * as d3Hierarchy from 'd3-hierarchy';
import * as $ from 'jquery/dist/jquery.min.js';
import * as Highcharts from 'highcharts/highcharts.js';

@Component({
    selector: 'app-visual',
    templateUrl: './visual.component.html',
    styleUrls: ['./visual.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class VisualComponent implements OnInit {
    siteConfigArray: Array < any > = [];
    today: Date;
    msgs: Message[] = [];
    mode = 'determinate';
    value = 50;
    bufferValue = 75;
    items: Array < any > = [];
    options: Array < any > = [];
    RTSChartOptions: Object;
    RTSChartFinalData: Array < any > = [];
    navActive = 'pie';
    Ganttoptions: Object;
    heatMapDataSet: Array < any > = [];
    histogramDataSet: Array < any > = []
    treeMapChartSet: Array < any > = [];
    sparklinesSetData: Array < any > = [];
    fromdateValue: Date;
    toateValue: Date;
    treeMapShowStatus = false;

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



    ngOnInit() {
        this.fromdateValue = new Date();
        this.toateValue = new Date();
        this.open('pie')
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

    pieChart() {
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
        }]
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
        $('#STPChartContainer').bind('mousemove touchmove touchstart', function(e) {
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
                    // Get the hovered point
                    point = chart.series[0].searchPoint(event, true);

                    if (point) {
                        point.highlight(e);
                    }
                }

            }
        });
        /**
         * Override the reset function, we don't need to hide the tooltips and
         * crosshairs.
         */
        Highcharts.Pointer.prototype.reset = function() {
            return undefined;
        };

        /**
         * Highlight a point by showing tooltip, setting hover state and draw crosshair
         */
        Highcharts.Point.prototype.highlight = function(event) {
            event = this.series.chart.pointer.normalize(event);
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
                Highcharts.each(Highcharts.charts, function(chart) {
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
        // Get the data. The contents of the data file can be viewed at
        $.getJSON(
            'https://api.myjson.com/bins/qex4k',
            function(activity) {
                let chartColor;
                $.each(activity.datasets, function(i, dataset) {
                    if (dataset.name == "Raw") {
                        chartColor = "#89CFF0";
                    } else if (dataset.name == "Treated") {
                        chartColor = "#32CD32";
                    } else {
                        chartColor = "rgba(67,67,72,0.3)";
                    }
                    // Add X values
                    dataset.data = Highcharts.map(dataset.data, function(val, j) {
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
                            height: 250

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
                            positioner: function() {
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
            Highcharts.each(Highcharts.charts, function(chart) {
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

    ganttChart() {
        // var category_json = [{"name":"Pump 1","data":[{"x":1,"y":0,"label":"60 K/l","from":1,"to":3},{"x":1,"y":0,"from":1,"to":3},{"x":7,"y":0,"from":7,"label":"50 K/l","to":10},{"x":7,"y":0,"from":7,"to":10}]},{"name":"Pump 2","data":[{"x":3,"y":1,"label":"60 K/l","from":3,"to":5},{"x":7,"y":1,"from":7,"to":10}]},{"name":"Pump 3","data":[{"x":6,"y":2,"label":"50 K/l","from":6,"to":12},{"x":14,"y":2,"from":14,"to":19}]},{"name":"Pump 4","data":[{"x":9,"y":3,"label":"80%","from":9,"to":15},{"x":19,"y":3,"from":19,"to":23}]}]

        // var chart = new Highcharts.Chart({
        //     chart: {
        //         renderTo: 'ganttChartContainer'
        //     },

        //     title: {
        //         text: 'On / Off Status'
        //     },

        //     xAxis: {

        //     },

        //     yAxis: {

        //      categories: ['Pump 1',
        //                   'Pump 2',
        //                   'Pump 3',
        //                   'Pump 4',
        //                   'Pump 5',
        //                   'Pump 6',
        //                   'Pump 7',
        //                   'Pump 8',
        //                   'Pump 9'],
        //         tickInterval: 1,            
        //         tickPixelInterval: 200,
        //         labels: {
        //             style: {
        //                 color: '#525151',
        //                 font: '12px Helvetica',
        //                 fontWeight: 'bold'
        //             },
        //            /* formatter: function() {
        //                 if (tasks[this.value]) {
        //                     return tasks[this.value].name;
        //                 }
        //             }*/
        //         },
        //         startOnTick: false,
        //         endOnTick: false,
        //         title: {
        //             text: 'Sources'
        //         },
        //         minPadding: 0.2,
        //         maxPadding: 0.2,
        //         fontSize:'15px'

        //     },

        //     legend: {
        //         enabled: false
        //     },
        //     labels: {
        //         enabled: false
        //     },
        //     tooltip: {
        //         // formatter: function() {
        //         //     return '<b>'+ tasks[this.y].name + '</b><br/>' +
        //         //         Highcharts.dateFormat('%m-%d-%Y', this.point.options.from)  +
        //         //         ' - ' + Highcharts.dateFormat('%m-%d-%Y', this.point.options.to); 
        //         // }
        //     },

        //     plotOptions: {
        //         line: {
        //             lineWidth: 10,
        //             marker: {
        //                 enabled: false
        //             },
        //             dataLabels: {
        //                 enabled: true,
        //                 align: 'left',
        //                 formatter: function() {
        //                     return this.point.options && this.point.options.label;
        //                 }
        //             }
        //         }
        //     },

        //     series: category_json

        // });	
        $(function() {
            // Define tasks
            var tasks = [{
                name: 'Pump 1',
                intervals: [{ // From-To pairs
                    from: 3,
                    to: 6,
                    label: '65 K/l'
                }]
            }, {
                name: 'Pump 2',
                intervals: [{ // From-To pairs
                    from: 10,
                    to: 18,
                    label: '75 K/l'
                }]
            }, {
                name: 'Pump 3',
                intervals: [{ // From-To pairs
                    from: 5,
                    to: 14,
                    label: '91 K/l'
                }, {
                    from: 14,
                    to: 23,
                    label: '64 K/l'
                }]
            }, {
                name: 'Pump 4',
                intervals: [{ // From-To pairs
                    from: 9,
                    to: 18,
                    label: '83 K/l'
                }]
            }, {
                name: 'Pump 5',
                intervals: [{ // From-To pairs
                    from: 12,
                    to: 19,
                    label: '75 K/l'
                }, {
                    from: 9,
                    to: 16,
                    label: '87 K/l'
                }]
            }, {
                name: 'Pump 6',
                intervals: [{ // From-To pairs
                    from: 13,
                    to: 22,
                    label: '92 K/l'
                }, {
                    from: 16,
                    to: 22,
                    label: '74 K/l'
                }]
            }, {
                name: 'Pump 7',
                intervals: [{ // From-To pairs
                    from: 12,
                    to: 18,
                    label: '74 K/l'
                }, {
                    from: 19,
                    to: 24,
                    label: '47 K/l'
                }]
            }];

            // Define milestones
            /*var milestones = [{
                name: 'Get to bed',
                time: Date.UTC(0, 0, 0, 22),
                task: 1,
                marker: {
                    symbol: 'triangle',
                    lineWidth: 1,
                    lineColor: 'black',
                    radius: 8
                }
            }];
             */
            // re-structure the tasks into line seriesvar series = [];
            var series = [];
            $.each(tasks.reverse(), function(i, task) {
                var item = {
                    name: task.name,
                    data: []
                };
                $.each(task.intervals, function(j, interval) {
                    item.data.push({
                        x: interval.from,
                        y: i,
                        label: interval.label,
                        from: interval.from,
                        to: interval.to
                    }, {
                        x: interval.to,
                        y: i,
                        from: interval.from,
                        to: interval.to
                    });

                    // add a null value between intervals
                    if (task.intervals[j + 1]) {
                        item.data.push(
                            [(interval.to + task.intervals[j + 1].from) / 2, null]
                        );
                    }

                });

                series.push(item);
            });

            // restructure the milestones
            /*$.each(milestones, function(i, milestone) {
                var item = Highcharts.extend(milestone, {
                    data: [[
                        milestone.time,
                        milestone.task
                    ]],
                    type: 'scatter'
                });
                series.push(item);
            });
             */

            // create the chart
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'ganttChartContainer'
                },

                title: {
                    text: ''
                },

                xAxis: {
                    //type: 'datetime'
                    min: 0,
                    tickInterval: 1,
                    title: {
                        text: 'Hours'
                    },
                },

                yAxis: {

                    categories: ['Pump 7',
                        'Pump 6',
                        'Pump 5',
                        'Pump 4',
                        'Pump 3',
                        'Pump 2',
                        'Pump 1'
                    ],
                    tickInterval: 1,
                    tickPixelInterval: 200,
                    labels: {
                        style: {
                            color: '#525151',
                            font: '12px Helvetica',
                            fontWeight: 'bold'
                        },
                        /* formatter: function() {
                             if (tasks[this.value]) {
                                 return tasks[this.value].name;
                             }
                         }*/
                    },
                    startOnTick: false,
                    endOnTick: false,
                    title: {
                        text: 'Sources'
                    },
                    minPadding: 0.2,
                    maxPadding: 0.2,
                    fontSize: '15px'

                },

                legend: {
                    enabled: false
                },
                tooltip: {
                    enabled: false,
                    formatter: function() {
                        return '<b>' + tasks[this.y].name + '</b><br/>' + '<b>' + this.point.options.label + '</b><br/>'
                    }
                },

                plotOptions: {
                    line: {
                        lineWidth: 10,
                        marker: {
                            enabled: false
                        },
                        dataLabels: {
                            enabled: true,
                            align: 'left',
                            formatter: function() {
                                return this.point.options && this.point.options.label;
                            }
                        }
                    }
                },

                series: series

            });
        });
    }



    heatMapChart() {
        //https://api.myjson.com/bins/fkyjo
        //https://api.myjson.com/bins/7hw5g
        var testData = [{
                "Sender": 0,
                "Receiver": 0,
                "Bytes": 2323
            },
            {
                "Sender": 0,
                "Receiver": 1,
                "Bytes": 1337735
            },
            {
                "Sender": 0,
                "Receiver": 2,
                "Bytes": 1498089
            },
            {
                "Sender": 0,
                "Receiver": 3,
                "Bytes": 1927158
            },
            {
                "Sender": 0,
                "Receiver": 4,
                "Bytes": 954470
            },
            {
                "Sender": 0,
                "Receiver": 5,
                "Bytes": 1059291
            },
            {
                "Sender": 0,
                "Receiver": 6,
                "Bytes": 337230
            },
            {
                "Sender": 0,
                "Receiver": 7,
                "Bytes": 1196630
            },
            {
                "Sender": 1,
                "Receiver": 0,
                "Bytes": 920993
            },
            {
                "Sender": 1,
                "Receiver": 1,
                "Bytes": 4564564
            },
            {
                "Sender": 1,
                "Receiver": 2,
                "Bytes": 68509952
            },
            {
                "Sender": 1,
                "Receiver": 3,
                "Bytes": 24007175
            },
            {
                "Sender": 1,
                "Receiver": 4,
                "Bytes": 294988
            },
            {
                "Sender": 1,
                "Receiver": 5,
                "Bytes": 33621593
            },
            {
                "Sender": 1,
                "Receiver": 6,
                "Bytes": 746257
            },
            {
                "Sender": 1,
                "Receiver": 7,
                "Bytes": 3212629
            },
            {
                "Sender": 2,
                "Receiver": 0,
                "Bytes": 3064254
            },
            {
                "Sender": 2,
                "Receiver": 1,
                "Bytes": 36162185
            },
            {
                "Sender": 2,
                "Receiver": 2,
                "Bytes": 45645
            },
            {
                "Sender": 2,
                "Receiver": 3,
                "Bytes": 2552097
            },
            {
                "Sender": 2,
                "Receiver": 4,
                "Bytes": 140083
            },
            {
                "Sender": 2,
                "Receiver": 5,
                "Bytes": 503400
            },
            {
                "Sender": 2,
                "Receiver": 6,
                "Bytes": 3624428
            },
            {
                "Sender": 2,
                "Receiver": 7,
                "Bytes": 984222
            },
            {
                "Sender": 3,
                "Receiver": 0,
                "Bytes": 123123123123
            },
            {
                "Sender": 3,
                "Receiver": 1,
                "Bytes": 71141164
            },
            {
                "Sender": 3,
                "Receiver": 2,
                "Bytes": 39918684
            },
            {
                "Sender": 3,
                "Receiver": 3,
                "Bytes": 56767
            },
            {
                "Sender": 3,
                "Receiver": 4,
                "Bytes": 165707
            },
            {
                "Sender": 3,
                "Receiver": 5,
                "Bytes": 1998975
            },
            {
                "Sender": 3,
                "Receiver": 6,
                "Bytes": 523288
            },
            {
                "Sender": 3,
                "Receiver": 7,
                "Bytes": 254694
            },
            {
                "Sender": 4,
                "Receiver": 0,
                "Bytes": 5878690
            },
            {
                "Sender": 4,
                "Receiver": 1,
                "Bytes": 3743080
            },
            {
                "Sender": 4,
                "Receiver": 2,
                "Bytes": 1084812
            },
            {
                "Sender": 4,
                "Receiver": 3,
                "Bytes": 89613280
            },
            {
                "Sender": 4,
                "Receiver": 4,
                "Bytes": 123123
            },
            {
                "Sender": 4,
                "Receiver": 5,
                "Bytes": 123123123123
            },
            {
                "Sender": 4,
                "Receiver": 6,
                "Bytes": 43995619
            },
            {
                "Sender": 4,
                "Receiver": 7,
                "Bytes": 823902
            },
            {
                "Sender": 5,
                "Receiver": 0,
                "Bytes": 52302944
            },
            {
                "Sender": 5,
                "Receiver": 1,
                "Bytes": 11820707
            },
            {
                "Sender": 5,
                "Receiver": 2,
                "Bytes": 23220812
            },
            {
                "Sender": 5,
                "Receiver": 3,
                "Bytes": 123123123123
            },
            {
                "Sender": 5,
                "Receiver": 4,
                "Bytes": 38104169
            },
            {
                "Sender": 5,
                "Receiver": 5,
                "Bytes": 5433223
            },
            {
                "Sender": 5,
                "Receiver": 6,
                "Bytes": 1027855
            },
            {
                "Sender": 5,
                "Receiver": 7,
                "Bytes": 1455038
            },
            {
                "Sender": 6,
                "Receiver": 0,
                "Bytes": 4636646
            },
            {
                "Sender": 6,
                "Receiver": 1,
                "Bytes": 12330615
            },
            {
                "Sender": 6,
                "Receiver": 2,
                "Bytes": 3741502
            },
            {
                "Sender": 6,
                "Receiver": 3,
                "Bytes": 123123123123
            },
            {
                "Sender": 6,
                "Receiver": 4,
                "Bytes": 219557981
            },
            {
                "Sender": 6,
                "Receiver": 5,
                "Bytes": 3391134
            },
            {
                "Sender": 6,
                "Receiver": 6,
                "Bytes": 123123123123
            },
            {
                "Sender": 6,
                "Receiver": 7,
                "Bytes": 104803858
            },
            {
                "Sender": 7,
                "Receiver": 0,
                "Bytes": 12262082
            },
            {
                "Sender": 7,
                "Receiver": 1,
                "Bytes": 2535301
            },
            {
                "Sender": 7,
                "Receiver": 2,
                "Bytes": 2735266
            },
            {
                "Sender": 7,
                "Receiver": 3,
                "Bytes": 22877396
            },
            {
                "Sender": 7,
                "Receiver": 4,
                "Bytes": 3142736
            },
            {
                "Sender": 7,
                "Receiver": 5,
                "Bytes": 3213889
            },
            {
                "Sender": 7,
                "Receiver": 6,
                "Bytes": 341987
            },
            {
                "Sender": 7,
                "Receiver": 7,
                "Bytes": 132123
            },
            {
                "Sender": 8,
                "Receiver": 0,
                "Bytes": 234
            },
            {
                "Sender": 8,
                "Receiver": 2,
                "Bytes": 234
            }
        ]
        //https://api.myjson.com/bins/188eho 7hw5g https://api.myjson.com/bins/dopr8
        this.http.get('https://api.myjson.com/bins/dopr8').subscribe(activity => {
            this.heatMapDataSet = activity.json();
            this.histroGramChart();
        });
    }

    histroGramChart() {
        //https://api.myjson.com/bins/fkyjo
        //https://api.myjson.com/bins/7hw5g
        this.http.get('https://api.myjson.com/bins/ghzl8').subscribe(activity => {
            this.histogramDataSet = activity.json();
        });
    }

    treeMapChart() {

        this.http.get('https://api.myjson.com/bins/8j8ac').subscribe(activity => {
            this.treeMapChartSet = activity.json();
            this.treeMapShowStatus = true;
        });
    }

    usageChart() {
        var width = 300;
        var height = 300;
        var svg = d3.select("#generateGraph"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var format = d3.format(",d");

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var pack = d3.pack()
            .size([width, height])
            .padding(1.5);
        var jsonData = [{
            "id": "Block1-Flat-101-0",
            "value": 56.63298119757329
        }, {
            "id": "Block1-Flat-101-1",
            "value": 74.37366805536479
        }, {
            "id": "Block1-Flat-101-2",
            "value": 68.24353381966657
        }, {
            "id": "Block1-Flat-101-3",
            "value": 64.05421506904483
        }, {
            "id": "Block1-Flat-101-4",
            "value": 31.155789103154383
        }, {
            "id": "Block1-Flat-101-5",
            "value": 58.30109022522291
        }, {
            "id": "Block1-Flat-101-6",
            "value": 95.22744567267817
        }, {
            "id": "Block1-Flat-101-7",
            "value": 92.65933387574651
        }, {
            "id": "Block1-Flat-101-8",
            "value": 94.17975485094836
        }, {
            "id": "Block1-Flat-101-9",
            "value": 90.6055182703745
        }, {
            "id": "Block1-Flat-101-10",
            "value": 94.02129450831659
        }, {
            "id": "Block1-Flat-101-11",
            "value": 30.535641249803373
        }, {
            "id": "Block1-Flat-101-12",
            "value": 9.304030749468273
        }, {
            "id": "Block1-Flat-101-13",
            "value": 41.078394592097396
        }, {
            "id": "Block1-Flat-101-14",
            "value": 7.761954796337344
        }, {
            "id": "Block1-Flat-101-15",
            "value": 8.46144279216689
        }, {
            "id": "Block1-Flat-101-16",
            "value": 57.614729063414565
        }, {
            "id": "Block1-Flat-101-17",
            "value": 70.187166486876
        }, {
            "id": "Block1-Flat-101-18",
            "value": 83.66518903950484
        }, {
            "id": "Block1-Flat-101-19",
            "value": 54.19991296537729
        }, {
            "id": "Block1-Flat-101-20",
            "value": 63.03840928183309
        }, {
            "id": "Block1-Flat-101-21",
            "value": 89.07384852381472
        }, {
            "id": "Block1-Flat-101-22",
            "value": 12.389481608542159
        }, {
            "id": "Block1-Flat-101-23",
            "value": 135.03168331008575
        }, {
            "id": "Block1-Flat-101-24",
            "value": 15.107208263172828
        }, {
            "id": "Block1-Flat-101-25",
            "value": 80.26235994171564
        }, {
            "id": "Block1-Flat-101-26",
            "value": 74.9359424254268
        }, {
            "id": "Block1-Flat-101-27",
            "value": 92.1091286789481
        }, {
            "id": "Block1-Flat-101-28",
            "value": 41.90167668095767
        }, {
            "id": "Block1-Flat-101-29",
            "value": 24.41591043666311
        }, {
            "id": "Block1-Flat-101-30",
            "value": 18.980478559589262
        }, {
            "id": "Block1-Flat-101-31",
            "value": 72.97824888583601
        }, {
            "id": "Block1-Flat-101-32",
            "value": 32.33764009272538
        }, {
            "id": "Block1-Flat-101-33",
            "value": 70.3742242220071
        }, {
            "id": "Block1-Flat-101-34",
            "value": 80.9845877728746
        }, {
            "id": "Block1-Flat-101-35",
            "value": 24.02427879512023
        }, {
            "id": "Block1-Flat-101-36",
            "value": 47.40923577921672
        }, {
            "id": "Block1-Flat-101-37",
            "value": 32.42416557399445
        }, {
            "id": "Block1-Flat-101-38",
            "value": 158.74749169113139
        }, {
            "id": "Block1-Flat-101-39",
            "value": 35.30682566906087
        }, {
            "id": "Block1-Flat-101-40",
            "value": 94.5936536946105
        }, {
            "id": "Block1-Flat-101-41",
            "value": 5.660713381113509
        }, {
            "id": "Block1-Flat-101-42",
            "value": 59.22241425939648
        }, {
            "id": "Block1-Flat-101-43",
            "value": 77.49002572882195
        }, {
            "id": "Block1-Flat-101-44",
            "value": 16.53549261200489
        }, {
            "id": "Block1-Flat-101-45",
            "value": 16.48885761832752
        }, {
            "id": "Block1-Flat-101-46",
            "value": 61.94003818442585
        }, {
            "id": "Block1-Flat-101-47",
            "value": 72.28974559205335
        }, {
            "id": "Block1-Flat-101-48",
            "value": 68.31992900158716
        }, {
            "id": "Block1-Flat-101-49",
            "value": 812.90708401826022
        }, {
            "id": "Block1-Flat-101-50",
            "value": 53.553744569091364
        }, {
            "id": "Block1-Flat-101-51",
            "value": 77.45805068979871
        }, {
            "id": "Block1-Flat-101-52",
            "value": 3.5938583715641004
        }, {
            "id": "Block1-Flat-101-53",
            "value": 91.17023096432771
        }, {
            "id": "Block1-Flat-101-54",
            "value": 54.85982898370721
        }, {
            "id": "Block1-Flat-101-55",
            "value": 29.916894770406532
        }, {
            "id": "Block1-Flat-101-56",
            "value": 68.6317036508496
        }, {
            "id": "Block1-Flat-101-57",
            "value": 77.83821010302051
        }, {
            "id": "Block1-Flat-101-58",
            "value": 17.422049411776133
        }, {
            "id": "Block1-Flat-101-59",
            "value": 36.094314044358725
        }, {
            "id": "Block1-Flat-101-60",
            "value": 9.878006591034719
        }, {
            "id": "Block1-Flat-101-61",
            "value": 93.68293499923483
        }, {
            "id": "Block1-Flat-101-62",
            "value": 78.645787954173
        }, {
            "id": "Block1-Flat-101-63",
            "value": 57.99829369029988
        }, {
            "id": "Block1-Flat-101-64",
            "value": 69.51405234751758
        }, {
            "id": "Block1-Flat-101-65",
            "value": 34.11841238070655
        }, {
            "id": "Block1-Flat-101-66",
            "value": 197.40851484499277
        }, {
            "id": "Block1-Flat-101-67",
            "value": 52.59274957106449
        }, {
            "id": "Block1-Flat-101-68",
            "value": 12.25640862162865
        }, {
            "id": "Block1-Flat-101-69",
            "value": 15.969129541589172
        }, {
            "id": "Block1-Flat-101-70",
            "value": 32.161939682437534
        }, {
            "id": "Block1-Flat-101-71",
            "value": 99.710776112164
        }, {
            "id": "Block1-Flat-101-72",
            "value": 47.93567137169937
        }, {
            "id": "Block1-Flat-101-73",
            "value": 85.79807160690493
        }, {
            "id": "Block1-Flat-101-74",
            "value": 45.434028312545884
        }, {
            "id": "Block1-Flat-101-75",
            "value": 17.1968519822602
        }, {
            "id": "Block1-Flat-101-76",
            "value": 60.153040746149784
        }, {
            "id": "Block1-Flat-101-77",
            "value": 62.81808527184396
        }, {
            "id": "Block1-Flat-101-78",
            "value": 72.48240956334988
        }, {
            "id": "Block1-Flat-101-79",
            "value": 16.26509583846317
        }, {
            "id": "Block1-Flat-101-80",
            "value": 76.36329681218919
        }, {
            "id": "Block1-Flat-101-81",
            "value": 93.14181317839524
        }, {
            "id": "Block1-Flat-101-82",
            "value": 57.29818558507466
        }, {
            "id": "Block1-Flat-101-83",
            "value": 58.17904593566908
        }, {
            "id": "Block1-Flat-101-84",
            "value": 7.76082136965389
        }, {
            "id": "Block1-Flat-101-85",
            "value": 84.3231903871893
        }, {
            "id": "Block1-Flat-101-86",
            "value": 24.106531866605657
        }, {
            "id": "Block1-Flat-101-87",
            "value": 35.410985001435265
        }, {
            "id": "Block1-Flat-101-88",
            "value": 54.860621206257576
        }, {
            "id": "Block1-Flat-101-89",
            "value": 58.04677803594899
        }, {
            "id": "Block1-Flat-101-90",
            "value": 4.9785974107708615
        }, {
            "id": "Block1-Flat-101-91",
            "value": 96.77892615383979
        }, {
            "id": "Block1-Flat-101-92",
            "value": 100.2110080040093
        }, {
            "id": "Block1-Flat-101-93",
            "value": 19.590579354416494
        }, {
            "id": "Block1-Flat-101-94",
            "value": 43.8756993977872
        }, {
            "id": "Block1-Flat-101-95",
            "value": 55.511163238064896
        }, {
            "id": "Block1-Flat-101-96",
            "value": 72.71130407674691
        }, {
            "id": "Block1-Flat-101-97",
            "value": 97.46113032061511
        }, {
            "id": "Block1-Flat-101-98",
            "value": 21.172125239854875
        }, {
            "id": "Block1-Flat-101-99",
            "value": 150.95187537724183
        }];

        generateData(jsonData);

        function generateData(d) {
            try {
                var root = d3.hierarchy({
                        children: d
                    })
                    .sum(function(d) {
                        return d.value;
                    })
                    .each(function(d) {
                        if (id = d.data.id) {
                            var id, i = id.lastIndexOf(".");
                            d.id = id;
                            d.package = id.slice(0, i);
                            d.class = id.slice(i + 1);
                        }
                    });
                console.log("123123", root)
                var chars = '0123456789ABCDEF'.split('');

                var randomColor = function() {
                    var color = '#';
                    for (var i = 0; i < 6; i++)
                        color += chars[Math.floor(Math.random() * 16)];
                    return color;
                };
                var node = svg.selectAll(".node")
                    .data(pack(root).leaves())
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });

                node.append("circle")
                    .attr("id", function(d) {
                        return d.id;
                    })
                    .attr("r", function(d) {
                        return d.r;
                    })
                    .style("fill", function(d) {
                        return color(d.package);
                    });

                node.append("clipPath")
                    .attr("id", function(d) {
                        return "clip-" + d.id;
                    })
                    .append("use")
                    .attr("xlink:href", function(d) {
                        return "#" + d.id;
                    });

                node.append("text")
                    .attr("clip-path", function(d) {
                        return "url(#clip-" + d.id + ")";
                    })
                    .selectAll("tspan")
                    .data(function(d) {
                        return d.class.split(/(?=[A-Z][^A-Z])/g);
                    })
                    .enter().append("tspan")
                    .attr("x", 0)
                    .attr("y", function(d, i, nodes) {
                        return 13 + (i - nodes.length / 2 - 0.5) * 10;
                    })
                    .text(function(d) {
                        return d;
                    })
                    .style("fill", "#000");

                node.append("title")
                    .text(function(d) {
                        return d.id + "\n" + format(d.value);
                    });
            } catch (error) {
                console.log("Caught the error", error);
            }
        }

    }

    SLchart() {
        this.http.get('https://api.myjson.com/bins/ht54c').subscribe(activity => {
            this.sparklinesSetData = activity.json();
        });

    }

}