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
@Component({
    selector: 'app-visuals-usage-chart',
    templateUrl: './usage-chart.component.html',
    styleUrls: ['./usage-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class appVisualUsageChartComponent implements OnInit {
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
        console.log("Usage data")
        console.log("this.data",this.data)
        this.generateUsageChart(this.data)
    }

    generateUsageChart(data) {
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
        
        
        generateUsageChart(this.data);
        function generateUsageChart(root) {
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
                            .style("left", ((<any>d3.event).pageX - 150) + "px")
                            .style("top", ((<any>d3.event).pageY - 20) + "px");
                    }
                })
                .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });

            node.append("text")
                .attr("dy", ".3em")
                .style("text-anchor", "middle")
                .style("pointer-events", "none")
                .text(function <dataType>(d) { return d.className.substring(0, d.r / 3); });
        }

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

}
