import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as d3 from 'd3';
import { Headers, Http } from "@angular/http";
// import * as d3Hierarchy from 'd3-hierarchy';
import * as $ from 'jquery/dist/jquery.min.js';
import * as Highcharts from 'highcharts/highcharts.js';
import * as highchartsHeatmap from 'highcharts/modules/heatmap';
import * as highchartMore from 'highcharts/highcharts-more.src.js';
import { color } from 'd3';
import xrange from "highcharts/modules/xrange";
@Component({
    selector: 'app-visuals-stp-chart',
    templateUrl: './stp-chart.component.html',
    styleUrls: ['./stp-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class appVisualstpChartComponent implements OnInit {
    @Input() data: Array<any> = [];
    options: Object;
    checkDate: Date;
    fromdateValue: Date;
    todateValue: Date;
    histogramDataSet: Array<any> = []
    testArray: Array<any> = []
    RTSCHARTStatus:false
    constructor(private http: Http) {

    }

    ngOnInit() {
        console.log("STP",this.data)
        this.RTSChart()
    }

    generateSTPChart(data) {
        
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
        // Get the data. The contents of the data file can be viewed at
        // $.getJSON('https://api.myjson.com/bins/qex4k',
        //     function (activity) {
                
        //     }
        // );
        generateChart(this.data);
        function generateChart(activity) {
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
    }


}
