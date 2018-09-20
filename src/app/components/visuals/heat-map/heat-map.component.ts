import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Headers, Http } from "@angular/http";
import * as d3 from 'd3';
// import * as d3Hierarchy from 'd3-hierarchy';
import * as $ from 'jquery/dist/jquery.min.js';
import * as Highcharts from 'highcharts/highcharts.js';
import * as highchartsHeatmap from 'highcharts/modules/heatmap';
import * as highchartMore from 'highcharts/highcharts-more.src.js';

@Component({
    selector: 'app-visuals-heat-map',
    templateUrl: './heat-map.component.html',
    styleUrls: ['./heat-map.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class appVisualHeatMapComponent implements OnInit {
    @Input() data: Array<any> = [];
    options: Object;
    bytes: number;
    histogramDataSet: Array<any> = [];
    selfData: {};
    fromdateValue: Date;
    todateValue: Date;



    constructor(private http: Http) {

    }

    ngOnInit() {
        // this.histroGramChart();
        this.selfData = this;
        this.heatMap(this.data, '#appHeatMap', this.selfData);
        this.http.get('https://api.myjson.com/bins/enlb8').subscribe(activity => {
            this.histogramDataSet = activity.json();
        });
    }

    getRandomInt() {
        return Math.floor(Math.random() * 101)
    }


    heatMap(dataFile, elementID, selfDataSet) {
        
        var chartData = [];
        var monthSet = [];
        var matrixX = [];
        var martixY = [];
        var martixOutput = [];

        dataFile.forEach(element => {
            if(monthSet.indexOf(element['Month-Year']) == -1) {
                monthSet.push(element['Month-Year'])
            }
        });
        for (let matY = 0; matY < monthSet.length; matY++) {
            for (let matX = 1; matX < 32; matX++) {
                martixOutput.push([
                    matX, 
                    matY, 
                    dataFile[matX].Value,
                    dataFile[matX].data
                ])
            }
        }
        var chartData = martixOutput;
        let heatMapContainer = $('#heatMapContainer').width()
        
        $(function () {
            new Highcharts.Chart({
                chart: {
                    type: 'heatmap',
                    renderTo: 'container',
                    width: heatMapContainer
                },
                title: {
                    text: '',
                    align: 'left',
                    x: 60
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical'
                },
                yAxis: {
                    categories: monthSet,
                    min: 0,
                    max: 11,
                    reversed: true,
                    gridLineWidth: 0,
                    lineWidth: 0.5,
                    lineColor: 'rgba(0,0,0,0.75)',
                    title: {
                        text: 'Month',
                        rotation: 270
                    }
                },
                xAxis: {
                    min: 1,
                    max: 31,
                    opposite: true,
                    tickInterval: 1,
                    labels: {
                        step: 1,
                        style: {
                            fontSize: '8px'
                        }
                    },
                    gridLineWidth: 0,
                    lineWidth: 0.5,
                    lineColor: 'rgba(0,0,0,0.75)',
                    tickWidth: 0.5,
                    tickLength: 3,
                    tickColor: 'rgba(0,0,0,0.75)',
                    title: {
                        text: 'Day'
                    }
                },
                colorAxis: {
                    minColor: '#FFFFFF',
                    min: 1,
                    max: 60
                },

                series: [{
                    data: chartData,
                    borderWidth: 2,
                    tooltip: {
                        headerFormat: '<br/>',
                        pointFormat: '<b>{point.value} K/L</b>'
                    },
                    events: {
                        click: function (event) {
                            var userJSON = [];
                            martixOutput.forEach(element => {
                                if(element[0] == event.point.x && element[1] == event.point.y) {
                                    selfDataSet.histroGramChart(element[3])
                                }
                            });
                            
                            setTimeout(() => {
                                selfDataSet.histogramDataSet.push(userJSON[0]);
                            }, 500);
                        }
                    }
                }]
            });
        });


    }
    histroGramChart(data) {

            Highcharts.chart('Heacontainer1', {
                chart: {
                    width: 500,
                    height: 230
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
                    title: {
                        'text': 'Hours'
                    },
                    padding: 0,
                    visible: true,
                    tickInterval: 1,
                    min: 0
                },
                yAxis: {
                    visible: true
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        pointPadding: 0,
                        groupPadding: 0
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '<strong>Value: </strong>' + this.x;
                    }
                },
                series: [{
                    type: 'column',
                    data: data
                }]
            });

    }


}
