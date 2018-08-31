import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as d3 from 'd3';
import * as $ from 'jquery/dist/jquery.min.js';

export type dataType = {region:any,subregion:any,children:any,key:any,value:any};
@Component({
    selector: 'app-visuals-treemap-chart',
    templateUrl: './treemap-chart.component.html',
    styleUrls: ['./treemap-chart.component.css']
})
export class appVisualTreemapChartComponent implements OnInit {
    @Input() data: Array<any> = [];
    options: Object;
    bytes: number;
    fromdateValue: Date;
    todateValue: Date;
    
    constructor() {
        
    }

    ngOnInit() {
        var self = this;
        this.newD3();
        
    }

    generateAmcharts() {
      console.log("self",self);
      const appVisualTreemapChartComponent = this;
      console.log("self",appVisualTreemapChartComponent);

    }

    testMain() {
      var pathJson = 
      {"name":"Sample data","children":[{"name":"Site 1","size":500,"children":[{"name":"Block 1","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 2","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 3","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 4","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 5","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 6","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 7","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 8","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 10","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 11","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 12","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 13","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 14","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 14","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 15","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 16","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 17","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 18","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 19","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 20","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 21","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 22","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 23","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]},{"name":"Block 24","size":40,"children":[{"name":"Flat 101","size":100},{"name":"Flat 102","size":10},{"name":"Flat 103","size":25},{"name":"Flat 104","size":40},{"name":"Flat 105","size":25},{"name":"Flat 106","size":40},{"name":"Flat 201","size":20},{"name":"Flat 202","size":30},{"name":"Flat 203","size":25},{"name":"Flat 204","size":40},{"name":"Flat 205","size":25},{"name":"Flat 206","size":40},{"name":"Flat 301","size":80},{"name":"Flat 302","size":5},{"name":"Flat 303","size":25},{"name":"Flat 304","size":20},{"name":"Flat 305","size":25},{"name":"Flat 306","size":20},{"name":"Flat 401","size":25},{"name":"Flat 402","size":40},{"name":"Flat 403","size":80},{"name":"Flat 404","size":5},{"name":"Flat 405","size":25},{"name":"Flat 406","size":20}]}]}]}
       var w = 1280 - 80,
      h = 800 - 180,
      x = d3.scale.linear().range([0, w]),
      y = d3.scale.linear().range([0, h]),
      color = d3.scale.category10(),
      root,
      node;
      var treemap = d3.layout.treemap()
          .round(false)
          .size([w, h])
          .sticky(true)
          .padding([10, 0, 0, 0])
          .value(function<dataType>(d) { return d.size; });
      var svg = d3.select("#chart").append("div")
          .attr("class", "chart")
          .style("width", w + "px")
          .style("height", h + "px")
        .append("svg:svg")
          .attr("width", w)
          .attr("height", h)
        .append("svg:g")
          .attr("transform", "translate(.5,.5)");
      
        node = root = pathJson;
        
        var nodes = treemap.nodes(root)
            .filter(function(d) { return !d.children; });
        var cell = svg.selectAll("g")
            .data(nodes)
            .enter().append("svg:g")
            .attr("class", "cell")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .on("click", function(d) { return zoom(node == d.parent ? root : d.parent,this); });
        cell.append("svg:rect")
            .attr("width", function(d) { return d.dx - 1; })
            .attr("height", function(d) { return d.dy - 1; })
            .style("fill", function<dataType>(d) { return color(d.parent.name); });
        cell.append("svg:text")
            .attr("x", function(d) { return d.dx / 2; })
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function<dataType>(d) { return d.name +'('+d.size+' K/l)'; })
            .style("opacity", function<dataType>(d) { d.w = this.getComputedTextLength();console.log(d.dx +' '+d.w); if(d.w/d.dx > 10) { return 1 } else {return 0}});
        d3.select(window).on("click", function(e) { zoom(root,e); });
        d3.select("select").on("change", function(e) {
          treemap.value(this.value == "size" ? size : count).nodes(root);
          zoom(node,e);
        });
      
      
      function size(d) {
        return d.size;
      }
      function count(d) {
        return 1;
      }
      function zoom(d,e) {
        console.log("Zoom e",e)
        //alert(d.name);
        var kx = w / d.dx, ky = h / d.dy;
        x.domain([d.x, d.x + d.dx]);
        y.domain([d.y, d.y + d.dy]);
        var t = svg.selectAll("g.cell").transition()
            .duration(750)
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
        t.select("rect")
            .attr("width", function(d) { return kx * d.dx - 1; })
            .attr("height", function(d) { return ky * d.dy - 1; })
        t.select("text")
            .attr("x", function(d) { return kx * d.dx / 2; })
            .attr("y", function(d) { return ky * d.dy / 2; })
            .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });
            //.style("font-size", function(d) { return kx * d.dx > d.w ? "20px" : "12px";});
        node = d;
        console.log(d3.event)
        
        $( "#chart" ).on( "click", function(e) {
          e.stopPropagation();
        });
        $( "#chart" ).trigger( "click" );
      }
    }

    newD3() {
      var w = 1280 - 80,
          h = 800 - 180,
          x = d3.scale.linear().range([0, w]),
          y = d3.scale.linear().range([0, h]),
          color = d3.scale.category20c(),
          root,
          node;

      var treemap = d3.layout.treemap()
          .round(false)
          .size([w, h])
          .sticky(true)
          .value(function < dataType > (d) {
              return d.size;
          });

      var svg = d3.select("#chart").append("div")
          .attr("class", "chart")
          .style("width", w + "px")
          .style("height", h + "px")
          .append("svg:svg")
          .attr("width", w)
          .attr("height", h)
          .append("svg:g")
          .attr("transform", "translate(.5,.5)");

      d3.json("https://api.myjson.com/bins/18hcek", function(data) {
          node = root = data;

          var nodes = treemap.nodes(root)
              .filter(function(d) {
                  return !d.children;
              });
          console.log("nodes",nodes)
          var cell = svg.selectAll("g")
              .data(nodes)
              .enter().append("svg:g")
              .attr("class", "cell")
              .attr("transform", function(d) {
                  return "translate(" + d.x + "," + d.y + ")";
              })
              .on("click", function(d) {
                  return zoom(node == d.parent ? root : d.parent);
              });

          cell.append("svg:rect")
              .attr("width", function(d) {
                  return d.dx - 1;
              })
              .attr("height", function(d) {
                  return d.dy - 1;
              })
              .style("fill", function < dataType > (d) {
                  return color(d.parent.name);
              });

          cell.append("svg:text")
              .attr("x", function(d) {
                  return d.dx / 2;
              })
              .attr("y", function(d) {
                  return d.dy / 2;
              })
              .attr("dy", ".35em")
              .attr("text-anchor", "middle")
              .text(function < dataType > (d) {
                  return d.name +'('+d.size+'k/l)';
              })
              .style("font-size","12px")
              .style("opacity", function< dataType >(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });

          d3.select(window).on("click", function() {
              zoom(root);
          });

          d3.select("select").on("change", function() {
              treemap.value(this.value == "size" ? size : count).nodes(root);
              zoom(node);
          });
      });

      function size(d) {
          return d.size;
      }

      function count(d) {
          return 1;
      }

      function zoom(d) {
          var kx = w / d.dx,
              ky = h / d.dy;
          x.domain([d.x, d.x + d.dx]);
          y.domain([d.y, d.y + d.dy]);

          var t = svg.selectAll("g.cell").transition()
              .duration(750)
              .attr("transform", function(d) {
                  return "translate(" + x(d.x) + "," + y(d.y) + ")";
              });

          t.select("rect")
              .attr("width", function(d) {
                  return kx * d.dx - 1;
              })
              .attr("height", function(d) {
                  return ky * d.dy - 1;
              })

          t.select("text")
              .attr("x", function(d) {
                  return kx * d.dx / 2;
              })
              .attr("y", function(d) {
                  return ky * d.dy / 2;
              })
              .style("opacity", function(d) {
                  return kx * d.dx > d.w ? 1 : 0;
              });

          node = d;
          $("#chart").on("click", function(e) {
              e.stopPropagation();
          });
          $("#chart").trigger("click");
      }
    }

    
}
