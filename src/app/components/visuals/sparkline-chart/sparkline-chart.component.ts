import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as d3 from 'd3';
import { Headers, Http } from "@angular/http";
// import * as d3Hierarchy from 'd3-hierarchy';
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
    checkDate: Date;
    fromdateValue: Date;
    todateValue: Date;
    histogramDataSet: Array<any> = []
    testArray: Array<any> = []
    constructor(private http: Http) {

    }

    ngOnInit() {
        console.log("Sparklines data")
        this.sparklinesGenerator();
        this.http.get('https://api.myjson.com/bins/eylx0').subscribe(activity => {
            this.histogramDataSet = activity.json();
        });
        console.log(this.data);
    }

    sparklinesGenerator() {
        setTimeout(() => {

        }, 1000);

        setTimeout(() => {
            $('.js-report-sparkline').each(function (sparklineId) {
                var th = $(this)
                var data = $.parseJSON(
                    th.data("sparkline-data", th.text())
                        .text('')
                        .data("sparkline-data")
                ),

                    w = 300,
                    h = 90,

                    xMargin = 30,
                    yMargin = 15,

                    y = d3.scale.linear()
                        .domain([d3.min(data), d3.max(data)])
                        .range([yMargin, h - yMargin]),
                    x = d3.scale.linear()
                        .domain([0, data.length - 1])
                        .range([xMargin, w - xMargin]),
    
                    gradientY = d3.scale.linear()
                        .domain([d3.min(data), d3.max(data)])
                        .range([th.data("range-low-color"), th.data("range-high-color")]),

                    percentageMargin = 100 / data.length,
                    percentageX = d3.scale.linear()
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

                    line = d3.svg.line()
                        .interpolate("cardinal")
                        .x(function (d, i) { return x(i); })
                        .y(function <dataType>(d) { return h - y(d); }),

                    points = g.selectAll(".point")
                        .data(data)
                        .enter().append("svg:circle")
                        .attr("class", "point")
                        .attr("cx", function (d, i) { return x(i) })
                        .attr("cy", function <dataType>(d, i) { return h - y(d) })
                        .attr("r", function (d, i) { return (i === (data.length - 1) || i === 0) ? 2 : 2; });

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
                    .append("svg:stop").attr('offset', function (d, i) {
                        return ((percentageX(i))) + "%";
                    }).attr("style", function <dataType>(d) {
                        return "stop-color:" + gradientY(d) + ";stop-opacity:1";
                    });

                var rect = g.selectAll(".bar-rect")
                    .data(data)
                    .enter().append("svg:rect")
                    .attr("class", "bar-rect")
                    .attr("x", function (d, i) { return x(i) - (w / data.length / 2) })
                    .attr("y", 0)
                    .attr("width", w / data.length)
                    .attr("height", h)
                    .on("mouseenter", function (d, i) {
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
                    }).on("mouseleave", function (d, i) {
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
            this.generateHistoGramData();
        }, 3000);

    }

    generateHistoGramData() {

        this.data.forEach((data,i) => {
            $(function () {
                new Highcharts.Chart({
                    chart: {
                        width: 200,
                        height: 85,
                        renderTo: 'Hcontainer_'+i
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        title: {
                            'text': 'Hours'
                        },
                        padding: 0,
                        visible: false
                    },
                    yAxis: {
                        visible: false
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
                        data: data.finalweek
                    }]
                });
            });
        })

    }

}
