import {Component, OnInit,ViewEncapsulation, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../globals';
import {UtilityService} from "../../services/utility.service";
import {Headers, Http} from "@angular/http";
import {MessageService} from "../../services/data.service";
import {environment} from "../../../environments/environment";
import {Message} from 'primeng/primeng';
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
    siteConfigArray: Array<any> = [];
    today: Date;
    msgs: Message[] = [];
    mode = 'determinate';
    value = 50;
    bufferValue = 75;
    items: Array<any> = [];
    options: Array<any> = [];
    RTSChartOptions:Object;
    RTSChartFinalData:Array<any> = [];
    navActive = 'pie';
    Ganttoptions: Object;
    heatMapDataSet: Array<any> = [];
    histogramDataSet:Array<any> = []
    treeMapChartSet:Array<any> = [];
    sparklinesSetData:Array<any> = [];
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
            y: 61.41,
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
        let headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.http.get('https://api.myjson.com/bins/awsj8').subscribe(activity => {
            var chartColor;
            activity.json().datasets.forEach((dataset,i) => {
                if(dataset.name == "Raw") {
                    chartColor = "#89CFF0";
                }
                else if(dataset.name == "Treated") {
                    chartColor = "#32CD32";
                }
                else {
                    chartColor = "rgba(67,67,72,0.3)";
                }
                this.RTSChartOptions = {
                    chart: {
                        type: dataset.type,           
                        zoomType: 'x',
                        height: 300
                    },
                    title: {
                        text: dataset.name,       
                    },
                    tooltip: {
                        shared: true,  
                        xDateFormat: '%m/%d/%Y',  
                        valueDecimals: 2,
                        crosshairs: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        style: {
                            color: '#F0F0F0'
                        }
                    },          
                    xAxis: {
                        crosshair: true,
                        dateTimeLabelFormats: {
                            minute: '%H:%M'
                        },
                        labels: {
                            format: '{value} m'
                        }
                    },
                    yAxis: [{
                        title: {
                            text: dataset.Name
                        },
                        height: 200,
                        lineWidth: 2,
                        top: 0,
                        labels: {
                            format: '{value} K/l'
                        }
                    }],
                    // legend: {
                    //         align: 'center',
                    //         verticalAlign: 'bottom',
                    //         layout: 'vertical',
                    //         x: 30,
                    //         y: 0,
            
                    //     itemStyle: {
                    //         color: '#ffffff',
                    //         fontSize: '14px'
                    //     }
                    // },
                    plotOptions: {
                        series: {
                            pointStart: 0,
                            color: '#2B908F'
                        }
                    },
                    series: [{
                        name: dataset.Name,
                        data: dataset.data,
                        yAxis : 0,
                        color: chartColor,//Highcharts.getOptions().colors[i],
                        fillOpacity: 0.3
                    }]
                };  
                this.RTSChartFinalData.push(this.RTSChartOptions);
            });
        });
    }

    ganttChart() {
        var category_json = [{"name":"Pump 9","data":[{"x":1374019200000,"y":0,"label":"Pump 9","from":1374019200000,"to":1400630400000},{"x":1400630400000,"y":0,"from":1374019200000,"to":1400630400000},[1412596800000,null],{"x":1424563200000,"y":0,"label":"Pump 9","from":1424563200000,"to":1434931200000},{"x":1434931200000,"y":0,"from":1424563200000,"to":1434931200000}]},{"name":"Pump 8","data":[{"x":1374019200000,"y":1,"label":"Pump 8","from":1374019200000,"to":1400630400000},{"x":1400630400000,"y":1,"from":1374019200000,"to":1400630400000},[1412596800000,null],{"x":1424563200000,"y":1,"label":"Pump 8","from":1424563200000,"to":1434931200000},{"x":1434931200000,"y":1,"from":1424563200000,"to":1434931200000}]},{"name":"Pump 7","data":[{"x":1374019200000,"y":2,"label":"Pump 7","from":1374019200000,"to":1400630400000},{"x":1400630400000,"y":2,"from":1374019200000,"to":1400630400000},[1412596800000,null],{"x":1424563200000,"y":2,"label":"Pump 7","from":1424563200000,"to":1434931200000},{"x":1434931200000,"y":2,"from":1424563200000,"to":1434931200000}]},{"name":"Pump 6","data":[{"x":1374019200000,"y":3,"label":"Pump 6","from":1374019200000,"to":1400630400000},{"x":1400630400000,"y":3,"from":1374019200000,"to":1400630400000},[1412596800000,null],{"x":1424563200000,"y":3,"label":"Pump 6","from":1424563200000,"to":1434931200000},{"x":1434931200000,"y":3,"from":1424563200000,"to":1434931200000}]},{"name":"Pump 5","data":[{"x":1374019200000,"y":4,"label":"Pump 5","from":1374019200000,"to":1400630400000},{"x":1400630400000,"y":4,"from":1374019200000,"to":1400630400000},[1412596800000,null],{"x":1424563200000,"y":4,"label":"Pump 5","from":1424563200000,"to":1434931200000},{"x":1434931200000,"y":4,"from":1424563200000,"to":1434931200000}]},{"name":"Pump 4","data":[{"x":1376784000000,"y":5,"label":"Pump 4","from":1376784000000,"to":1434931200000},{"x":1434931200000,"y":5,"from":1376784000000,"to":1434931200000}]},{"name":"Pump 3","data":[{"x":1308182400000,"y":6,"label":"Pump 3","from":1308182400000,"to":1334966400000},{"x":1334966400000,"y":6,"from":1308182400000,"to":1334966400000},[1355486400000,null],{"x":1376006400000,"y":6,"label":"Pump 3","from":1376006400000,"to":1434931200000},{"x":1434931200000,"y":6,"from":1376006400000,"to":1434931200000}]},{"name":"Pump 2- Should be null","data":[]},{"name":"Pump 1","data":[{"x":1277078400000,"y":8,"label":"Pump 1","from":1277078400000,"to":1434844800000},{"x":1434844800000,"y":8,"from":1277078400000,"to":1434844800000}]}];
        
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'ganttChartContainer'
            },

            title: {
                text: 'On / Off Status'
            },

            xAxis: {
                type: 'time'
            },

            yAxis: {

             categories: ['Pump 1',
                          'Pump 2',
                          'Pump 3',
                          'Pump 4',
                          'Pump 5',
                          'Pump 6',
                          'Pump 7',
                          'Pump 8',
                          'Pump 9'],
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
                    text: 'Criteria'
                },
                minPadding: 0.2,
                maxPadding: 0.2,
                fontSize:'15px'
                
            },

            legend: {
                enabled: false
            },
            tooltip: {
                // formatter: function() {
                //     return '<b>'+ tasks[this.y].name + '</b><br/>' +
                //         Highcharts.dateFormat('%m-%d-%Y', this.point.options.from)  +
                //         ' - ' + Highcharts.dateFormat('%m-%d-%Y', this.point.options.to); 
                // }
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

            series: category_json

        });		 
    }



    heatMapChart() {
        //https://api.myjson.com/bins/fkyjo
        //https://api.myjson.com/bins/7hw5g
        var testData = [
            {
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
        //https://api.myjson.com/bins/188eho
        this.http.get('https://api.myjson.com/bins/7hw5g').subscribe(activity => {
            this.heatMapDataSet = testData;
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

        var color = d3.scaleOrdinal(d3.schemeCategory20c);

        var pack = d3.pack()
            .size([width, height])
            .padding(1.5);

        

        d3.csv("http://localhost:4200/assets/datauser.csv").then((d) => {
            console.log("DATA promise",d)
            // d.value = +d.value;
            // if (d.value) return d;
            try {
                var root = d3.hierarchy({children: d})
                .sum(function(d) { return d.value; })
                .each(function(d) {
                    if (id = d.data.id) {
                    var id, i = id.lastIndexOf(".");
                    d.id = id;
                    d.package = id.slice(0, i);
                    d.class = id.slice(i + 1);
                    }
                });
            console.log("123123",root)
            var chars = '0123456789ABCDEF'.split('');

            var randomColor = function () {
            var color = '#';
            for (var i = 0; i < 6; i++)
            color += chars[Math.floor(Math.random() * 16)];
            return color;
            };
            var node = svg.selectAll(".node")
                .data(pack(root).leaves())
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
            node.append("circle")
                .attr("id", function(d) { return d.id; })
                .attr("r", function(d) { return d.r; })
                .style("fill", randomColor());
    
            node.append("clipPath")
                .attr("id", function(d) { return "clip-" + d.id; })
                .append("use")
                .attr("xlink:href", function(d) { return "#" + d.id; });
    
            node.append("text")
                .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
                .selectAll("tspan")
                .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
                .enter().append("tspan")
                .attr("x", 0)
                .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
                .text(function(d) { return d; })
                .style("fill", "#f00");
    
            node.append("title")
                .text(function(d) { return d.id + "\n" + format(d.value); });
            }
            catch(error) {
                console.log("Caught the error",error);
            }
        });
        // }, function(error, classes) {
        //     console.log("error classes",classes)
        // if (error) throw error;
        
        
        // });
    }

    SLchart() {
        this.http.get('https://api.myjson.com/bins/ht54c').subscribe(activity => {
            this.sparklinesSetData = activity.json();
        });

    }

}
