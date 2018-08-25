import {Component, EventEmitter, Input, OnInit, Output,ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as d3 from 'd3';
import * as d3Hierarchy from 'd3-hierarchy';
import * as $ from 'jquery/dist/jquery.min.js';
import * as Highcharts from 'highcharts/highcharts.js';
import * as highchartsHeatmap from 'highcharts/modules/heatmap';
import * as highchartMore from 'highcharts/highcharts-more.src.js';

@Component({
    selector: 'app-visuals-sparkline-chart',
    templateUrl: './sparkline-chart.component.html',
    styleUrls: ['./sparkline-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class appVisualsparklineComponent implements OnInit {
    @Input() data: Array<any> = [];
    options: Object;
    checkDate:Date;
    fromdateValue: Date;
    todateValue: Date;
    histogramDataSet:Array<any>=[]
    testArray:Array<any>=[]
    constructor() {
        
    }

    ngOnInit() {
        console.log("Sparklines data")
        this.sparklinesGenerator();
        var newJSON = 
        [{"name":"A","data":[{"bin":0,"count":Math.random()*1000},{"bin":10,"count":Math.random()*1000},{"bin":20,"count":Math.random()*1000},{"bin":30,"count":Math.random()*1000},{"bin":40,"count":Math.random()*1000},{"bin":50,"count":Math.random()*1000}]}]
            this.histogramDataSet = newJSON;//activity.json();
        this.testArray = ["123","234","543","345","645"]
    }

    sparklinesGenerator() {
        $('.js-report-sparkline').each(function(sparklineId) {
            var th = $(this)
                var data = $.parseJSON(
                    th.data("sparkline-data", th.text())
                       .text('')
                       .data("sparkline-data")
                ),
        
                w = 200,
                h = 100,
        
                xMargin = 30,
                yMargin = 15,
        
                y = d3.scaleLinear()
                            .domain([d3.min(data), d3.max(data)])
                            .range([yMargin, h - yMargin]),
                x = d3.scaleLinear()
                            .domain([0, data.length - 1])
                            .range([xMargin, w - xMargin]),
        
                gradientY = d3.scaleLinear()
                                    .domain([d3.min(data), d3.max(data)])
                                    .range([th.data("range-low-color"), th.data("range-high-color")]),
        
                percentageMargin = 100 / data.length,
                percentageX = d3.scaleLinear()
                                      .domain([0, data.length - 1])
                                      .range([percentageMargin, 100 - percentageMargin]),
        
                container = d3.select(this),
        
                tooltip = container
                    .append("div")
                    .attr("class", "chart-tooltip"),
        
                vis = container
                    .append("svg:svg")
                    .attr("width", w)
                    .attr("height", h)
        
                var g = vis.append("svg:g")
                        .attr("stroke", "url(#sparkline-gradient-" + sparklineId + ")")
                        .attr("fill", "url(#sparkline-gradient-" + sparklineId + ")"),
        
                line = d3.line()
                    .x(function(d, i) { return x(i); })
                    .y(function(d) { return h - y(d); })
                    .curve(d3.curveCardinal),
        
                points = g.selectAll(".point")
                    .data(data)
                    .enter().append("svg:circle")
                    .attr("class", "point")
                    .attr("cx", function(d, i) { return x(i) })
                    .attr("cy", function(d, i) { return h - y(d) })
                    .attr("r", function(d, i) { return (i === (data.length - 1) || i === 0) ? 2 : 2; });
        
            g.append("svg:path").attr("d", line(data));
        
            th.find(".chart-tooltip").data({
                calcY: y,
                calcX: x
            });
        
            vis.append("svg:defs")
                .append("svg:linearGradient")
                .attr("id", "sparkline-gradient-" + sparklineId)
                .attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%")
                .attr("gradientUnits", "userSpaceOnUse")
                .selectAll(".gradient-stop")
                .data(data)
                .enter()
                .append("svg:stop").attr('offset', function(d, i) {
                    return ((percentageX(i))) + "%";
                }).attr("style", function(d) {
                    return "stop-color:" + gradientY(d) + ";stop-opacity:1";
                });
        
            var rect = g.selectAll(".bar-rect")
                .data(data)
                .enter().append("svg:rect")
                .attr("class", "bar-rect")
                .attr("x", function(d, i) { return x(i) - (w / data.length / 2) })
                .attr("y", 0)
                .attr("width", w / data.length)
                .attr("height", h)
                .on("mouseenter", function(d, i) {
                    // Calculate left position
                    var $tooltip = $(this).closest(".js-report-sparkline").find(".chart-tooltip")
                                          .html(formatTooltip(d, i)),
                        tooltipLeft = $tooltip.data("calcX")(i) - ($tooltip.width() / 2),
                        tooltipTop = h - $tooltip.data("calcY")(d) - 40;
        
                    // Position it again
                    $tooltip.css({
                                left: tooltipLeft + "px",
                                top: tooltipTop + "px"
                            }).show();
        
                    // Add hover class to the targeted point
                    $(this).parent().parent().find('.point:eq(' + i + ')').attr('class', 'point hover');
                }).on("mouseleave", function(d, i) {
                    var $tooltip = $(this).closest(".js-report-sparkline").find(".chart-tooltip");
        
                    // Hide the tooltip
                    $tooltip.hide();
        
                    // Remove hover class from the targeted point
                    $(this).parent().parent().find('.point:eq(' + i + ')').attr('class', 'point');
                });
        
            // Helper function to calculate the HTML content of the tooltip
            // Tooltip may contain any HTML
            function formatTooltip(d, i) {
                return '<div class="title">' + d + '</div>'
            }
        });
        setTimeout(() => {
           this.generateHistoGramData();
        }, 3000);
        
    }

    generateHistoGramData() {
        
        
        Highcharts.chart('Hcontainer1', {
            chart:{
                width:200,
                height:100
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12'],
                title:{
                    'text':'Hours'
                },
                padding:0,
                visible:false
            },
            yAxis:{
                visible:false
            },
            legend: {
                enabled:false
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding:0
                }
            },
            series: [{
                type: 'column',
                data: [5, 2, 4, 3, 3,1,3,2]
            }]
        });
        Highcharts.chart('Hcontainer2', {
            chart:{
                width:200,
                height:100
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12'],
                title:{
                    'text':'Hours'
                },
                padding:0,
                visible:false
            },
            yAxis:{
                visible:false
            },
            legend: {
                enabled:false
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding:0
                }
            },
            series: [{
                type: 'column',
                data: [2, 3, 5, 7, 2,3,1]
            }]
        });
        Highcharts.chart('Hcontainer3', {
            chart:{
                width:200,
                height:100
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12'],
                title:{
                    'text':'Hours'
                },
                padding:0,
                visible:false
            },
            yAxis:{
                visible:false
            },
            legend: {
                enabled:false
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding:0
                }
            },
            series: [{
                type: 'column',
                data: [9, 2, 5, 7, 4,1,3]
            }]
        });
        Highcharts.chart('Hcontainer4', {
            chart:{
                width:200,
                height:100
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12'],
                title:{
                    'text':'Hours'
                },
                padding:0,
                visible:false
            },
            yAxis:{
                visible:false
            },
            legend: {
                enabled:false
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding:0
                }
            },
            series: [{
                type: 'column',
                data: [3, 2, 1, 3, 4,1,7]
            }]
        });
        Highcharts.chart('Hcontainer5', {
            chart:{
                width:200,
                height:100
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12'],
                title:{
                    'text':'Hours'
                },
                padding:0,
                visible:false
            },
            yAxis:{
                visible:false
            },
            legend: {
                enabled:false
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding:0
                }
            },
            series: [{
                type: 'column',
                data: [3, 2, 1, 3, 4,1,3]
            }]
        });
    }

}
