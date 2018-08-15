import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as d3 from 'd3';
import * as d3Hierarchy from 'd3-hierarchy';

@Component({
    selector: 'app-visuals-histogram-chart',
    templateUrl: './histogram-chart.component.html',
    styleUrls: ['./histogram-chart.component.css']
})
export class appVisualHistogramChartComponent implements OnInit {
    @Input() data: Array<any> = [];
    options: Object;
    bytes: number;
    constructor() {
        
    }

    ngOnInit() {
        console.log("Histogram data",this.data);
        this.histogram(this.data);
    }

    histogram(json) {
        var maxBin = 40;
        var binInc = 10;

        // transform data that is already binned into data
        // that is better for use in D3
        // we want to create something like this:
        // [
        //  { "x": 0,  "y": 30000 },
        //  { "x": 10, "y": 80000 },
        //  ...
        // ]
        // 
        for( var i = 0; i < json.length; i++) {
            
            // use the name of the group to initialize the array
            var group = json[i].name;
            var data = [];
            
            // we have a max bin for our histogram, must ensure
            // that any bins > maximum bin are rolled into the 
            // last bin that we have
            var binCounts = {};
            for( var j = 0; j < json[i].data.length; j++) {
            var xValue = json[i].data[j].bin;
            // bin cannot exceed the maximum bin
            xValue = ( xValue > maxBin ? maxBin : xValue);
            var yValue = json[i].data[j].count;
            
            if(binCounts[xValue] === undefined) {
                binCounts[xValue] = 0;
            }
            binCounts[xValue] += yValue;
            }
            
            // add the bin counts in
            for( var bin in binCounts) {
            data.push({"x": bin, "y": binCounts[bin]});
            }
            
            // add the histogram
            this.createHistogram(data, maxBin, binInc, group.toUpperCase())
        }
    }

    createHistogram(data, maxBin, binInc, title) {
        // A formatter for counts.
        var formatCount = d3.format(",.0f");
        var totalWidth = 800;
        var totalHeight = 600;
        var margin = {top: 40, right: 60, bottom: 50, left: 70},
            width = totalWidth - margin.left - margin.right,
            height = totalHeight - margin.top - margin.bottom;
        
        var binArray = [];
        for (var i = 0; i <= maxBin + binInc; i += binInc) {
            binArray.push(i);
        }
        var binTicks = [];
        for (var i = 0; i < maxBin + binInc; i += binInc) {
            binTicks.push(i);
        }
        
        var x = d3.scaleLinear()
            .domain([0, maxBin + binInc])
            .range([0, width]);
        var binWidth = width / (binArray.length - 1) - 1;
        
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d.y; })])
            .range([height, 0]);
        
        // var xAxis = d3.svg.axis()
        //     .scale(x)
        //     .orient("bottom")
        //     .tickValues(binTicks);
        var xAxis = d3.axisBottom(x).tickValues(binTicks);
        var yAxis = d3.axisLeft(y);
        // var yAxis = d3.svg.axis()
        //     .scale(y)
        //     .orient("left");
        
        var svg = d3.select("#appHistoGramChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var bar = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.x); })
            .attr("width", binWidth)
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { return height - y(d.y); })
            .on("mouseover", function(d) {
                var barWidth = parseFloat(d3.select(this).attr("width"));
                var xPosition = parseFloat(d3.select(this).attr("x")) + (barWidth / 2);
                var yPosition = parseFloat(d3.select(this).attr("y")) - 10;
                
                svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .text(d.y);
            })
            .on("mouseout", function(d) {
                d3.select('#tooltip').remove();
            });
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
            
        svg.append("g")
            .attr("class", "y axis")
            //.attr("transform", "translate(0," + height + ")")
            .call(yAxis);
            
        // Add axis labels
        svg.append("text")
            .attr("class", "x label")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 15) + ")")
            //.attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text("Time (minutes)");
            
        svg.append("text")
            .attr("class", "y label")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text("Count");
            
        // Add title to chart
        svg.append("text")
            .attr("class", "title")
            .attr("transform", "translate(" + (width / 2) + " ," + (-20) + ")")
            //.attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text(title);  
    };

}
