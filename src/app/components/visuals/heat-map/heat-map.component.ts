import {Component, EventEmitter, Input, OnInit, Output,ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Headers, Http} from "@angular/http";
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
    histogramDataSet:Array<any> = [];
    selfData:{};
    fromdateValue: Date;
    todateValue: Date;
    
    
    
    constructor(private http: Http) {
        
    }

    ngOnInit() {
        this.histroGramChart();
        this.selfData = this;
        console.log("Heat map data",this.data);
        this.heatMap(this.data, '#appHeatMap',this.selfData);
    }

    getRandomInt() {
        return Math.floor(Math.random() * 101)
    }
    

    heatMap(dataFile, elementID,selfDataSet) {
        // let monthSet = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
        // // Constants
        // var margin = {
        //   top: 80,
        //   right: 0,
        //   bottom: 10,
        //   left: 80
        // };
        // var width = 520;
        // var height = 520;
      
      
        // // Create and attach top level svg
        // var svg = d3.select(elementID)
        //   .append('svg')
        //   .attr('width', width + margin.left + margin.right)
        //   .attr('height', height + margin.top + margin.bottom)
        //   .append("g")
        //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
        // svg.append("text")
        //   .attr("class", "chartTitle")
        //   .attr("text-anchor", "middle")
        //   .attr("transform", "translate(260,-60)")
        //   .text("Months");
      
        // svg.append("text")
        //   .attr("class", "chartTitle")
        //   .attr("text-anchor", "middle")
        //   .attr("transform", "translate(" + -margin.left / 2 + "," + height / 2 + ")rotate(-90)")
        //   .text("Days");
      
        // var legendHeight = 20;
        // var legendWidth = width + margin.left + margin.right;
        // var legendId = 'legendGradient';
      
        // var legend = d3.select(elementID).append("div").append("svg:svg")
        //   .attr("width", legendWidth)
        //   .attr("height", legendHeight);
      
      
        // var gradientID = elementID + "-gradient";
        // if (gradientID.substring(0, 1) == '#') {
        //   gradientID = gradientID.substr(1, gradientID.length);
        // }
        // // var gradient = svg.append("svg:defs")
        // //   .append("svg:linearGradient")
        // //   .attr("id", gradientID)
        // //   .attr("x1", "0%")
        // //   .attr("y1", "0%")
        // //   .attr("x2", "100%")
        // //   .attr("y2", "0%")
        // //   .attr("spreadMethod", "pad");
      
        // // gradient.append("svg:stop")
        // //   .attr("offset", "0%")
        // //   .attr("stop-color", "#5ff4ff")
        // //   .attr("stop-opacity", 1);
      
        // // gradient.append("svg:stop")
        // //   .attr("offset", "100%")
        // //   .attr("stop-color", "#c42bd4")
        // //   .attr("stop-opacity", 1);
      
      
        // legend.append("svg:rect")
        //   .attr("width", legendWidth)
        //   .attr("height", legendHeight)
        //   .style("fill", "url(#" + gradientID + ")")
        //   .attr("transform", "translate(" + margin.left + ",0)");
      
        // var cellValue = d3.select('body').append("div")
        //   .style("position", "absolute")
        //   .style("opacity", 1e-6)
        //   .attr("class", "tooltip");
      
        // // Map the ranks to a bands
        // var x = d3.scaleBand().rangeRound([0, width]);
      
        // var z = d3.scaleLinear().range([0, 1]).clamp(true);
      
        // var c = d3.scaleLinear().range(["#5ff4ff", "#c42bd4"]);
      
        // function formatBytes(bytes) {
        //   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        //   if (bytes == 0) return '0 Bytes';
        //   var i = 0;
        //   i = Math.floor(Math.log(bytes) / Math.log(1024));
        //   return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
        // }
      
        // // Build a space delimited parser and parse the CSV`s
        // initChart(dataFile,selfDataSet)
        // function initChart(rows,selfSet) {
        //     var rankCount = Math.sqrt(rows.length);
      
        //     var xScale = d3.scaleLinear()
        //       .domain([0, rankCount])
        //       .range([0, width]);
      
        //     var yScale = d3.scaleLinear()
        //       .domain([0, rankCount])
        //       .range([height, 0]);
      
        //     var matrix = [];
        //     var row_idx = 0;
        //     console.log("rankCount",rankCount)
        //     for (var i = 0; i < rankCount; i++) {
        //       matrix[i] = [];
        //       for (var j = 0; j < 12; j++) {
        //         matrix[i][j] = [];
        //       }
        //     }
        //     console.log("rowsrows",rows)
        //     rows.forEach(function(row, i) {
        //       console.log("row.Receiver",row.Receiver)
        //       console.log("row.Sender",row.Sender)
        //         matrix[row['X-Value']][row['Y-Value']] = {
        //           "sender": row['Y-Value'],
        //           "receiver": row['X-Value'],
        //           "bytes": row.Value
        //         };
              
        //     });
        //     console.log("matrix",matrix)
      
        //     // Apply color gradient domain
        //     var extent = d3.extent(rows, function(d) {
        //       return d.Bytes;
        //     });
        //     var min = extent[0];
        //     var max = extent[1];
        //     c.domain([min, (min + max) / 2, max]);
      
        //     legend.append("text")
        //       .attr("class", "legendText")
        //       .attr("text-anchor", "end")
        //       .attr("y", legendHeight - 5)
        //       .attr("x", legendWidth - margin.right - 10)
        //       .text(formatBytes(max));
      
        //     legend.append("text")
        //       .attr("class", "legendText")
        //       .attr("y", legendHeight - 5)
        //       .attr("x", margin.left + 10)
        //       .text(formatBytes(min));
      
      
        //     // Apply the rankCount as the domain for x
        //     x.domain(d3.range(rankCount));
      
        //     svg.append("rect")
        //       .attr("class", "background")
        //       .attr("width", width)
        //       .attr("height", height)
        //       .style("fill", "#eee");
      
        //     var row = svg.selectAll(".row")
        //       .data(matrix)
        //       .enter().append("g")
        //       .attr("class", "row")
        //       .attr("transform", function(d, i) {
        //         console.log("matrixrows",i)
        //         return "translate(0," + x(i) + ")";
        //       })
        //       .each(rowFunc);
      
        //     function rowFunc(rowObject) {
        //       var cell = d3.select(this).selectAll(".cell")
        //         .data(rowObject)
        //         .enter().append("rect")
        //         .attr("class", "cell")
        //         .attr("x", function(d, i) {
        //           if(i< 12) {
        //             console.log("cell",i)
        //             return x(i);
        //           }
                  
        //         })
        //         .attr("width", x.bandwidth())
        //         .attr("height", x.bandwidth())
        //         .style("fill-opacity", function(d) {
        //           return z(d.bytes);
        //         })
        //         .style("fill", function(d) {
        //           console.log("d.bytes",d.bytes)
        //           if(d.bytes) {
        //             return c(d.bytes);
        //           }
                  
        //         })
        //         .on("click",function(data) {
        //           var userJSON = [];
        //           console.log("selfSet",selfSet)
        //           userJSON = 
        //     [{"name":"A","data":[{"bin":0,"count":Math.random()*1000},{"bin":10,"count":Math.random()*1000},{"bin":20,"count":Math.random()*1000},{"bin":30,"count":Math.random()*1000},{"bin":40,"count":Math.random()*1000},{"bin":50,"count":Math.random()*1000}]}]
        //     selfSet.histogramDataSet = [];//activity.json();
        //     setTimeout(() => {
        //       selfSet.histogramDataSet.push(userJSON[0]);
        //     }, 500);
            
        //         })
        //         .on("mousemove", mouseMove)
        //         .on("mouseover", mouseOver)
        //         .on("mouseout", mouseOut);
        //     }
      
        //     function mouseOver(evt) {
        //       cellValue.transition()
        //         .duration(300)
        //         .style('opacity', 1);
        //     }
      
        //     function mouseOut(evt) {
        //       cellValue.transition()
        //         .duration(300)
        //         .style('opacity', 1e-6);
        //       d3.selectAll(".row text").classed("active", false);
        //       d3.selectAll(".column text").classed("active", false);
        //     }
      
        //     function mouseMove(evt) {
        //       cellValue.text("Rank " + evt.sender + " to " + evt.receiver + ": " + formatBytes(evt.bytes));
        //       cellValue.style("left", (d3.event.pageX) + "px");
        //       cellValue.style("top", (d3.event.pageY) + "px");
        //       d3.selectAll(".row text").classed("active", function(d, i) {
        //         return evt.sender == i;
        //       });
        //       d3.selectAll(".column text").classed("active", function(d, i) {
        //         return evt.receiver == i;
        //       })
        //     }
      
        //     row.append("line")
        //       .attr("x2", width)
        //       .attr("stroke", "#fff");
      
        //     row.append("text")
        //       .attr("x", -6)
        //       .attr("y", x.bandwidth() / 2)
        //       .attr("dy", ".32em")
        //       .attr("text-anchor", "end")
        //       .text(function(d, i) {
        //         return i;
        //       });
      
        //     var column = svg.selectAll(".column")
        //       .data(matrix)
        //       .enter().append("g")
        //       .attr("class", "column")
        //       .attr("transform", function(d, i) {
        //         if(i <= 11) {
        //             return "translate(" + x(i) + ")rotate(-90)";
        //         }
        //       });
      
        //     column.append("line")
        //       .attr("x1", -width)
        //       .attr("stroke", "#fff");
      
        //     column.append("text")
        //       .attr("x", 6)
        //       .attr("y", x.bandwidth() / 2)
        //       .attr("dy", ".32em")
        //       .attr("text-anchor", "start")
        //       .attr("transform", "translate(5)rotate(20)")
        //       .text(function(d, i) {
        //         if(i <= 11) {
        //             return monthSet[i] + " 2017"
        //         }
        //         // return i;
        //       });
              
        // }
        // var data = document.getElementById('csv').innerHTML.split("\n");
        var chartData = [];
        var monthSet = ["Aug 2017","Sept 2017","Oct 2017","Nov 2017","Dec 2017","Jan 2018","Feb 2018","Mar 2018","Apr 2018","May 2018","Jun 2018","July 2018"];
        // $.each(data, function(i, point) {
        //   var row  = point.split(',');
        //   var date = row[0].split('-');
        //   var x    = parseInt(date[2]);
        //   var y    = parseInt(date[1]) -1;
        //   var val  = parseFloat(row[2]);
        //   chartData.push([x,y,val]);
        // });
        var matrixX = [];
        var martixY = [];
        var martixOutput = [];
        
        for(let matX = 0; matX < 32;matX++) {
            for(let matY = 0;matY < 13; matY++) {
                martixOutput.push([matX,matY,this.getRandomInt()])
            }
        }
        console.log("martixOutput",JSON.stringify(martixOutput))
        console.log(chartData);
        var chartData = martixOutput;
        let heatMapContainer = $('#heatMapContainer').width()
        // Highcharts.wrap(Highcharts.seriesTypes.heatmap.prototype, 'translate', function (proceed) {
        //     proceed.apply(this, [].slice.call(arguments, 1));
    
        //     Highcharts.each(this.points, function (point) {
        //         // Adapt here the size and position of each cell
        //         point.shapeArgs.height /= 2;
        //         point.shapeArgs.y += point.shapeArgs.height / 2;
        //     });
        // });
        $(function () {
          new Highcharts.Chart({
            chart: {
              type: 'heatmap',
              renderTo: 'container',
              width:heatMapContainer
            },
            title: {
              text: '',
              align: 'left',
              x: 60
            },
            legend: {
              align: 'right',
              verticalAlign:'middle',
              layout: 'vertical'
            },
            yAxis: {
              categories: monthSet,    
              min: 0,
              max: 11,
              reversed: true,
              gridLineWidth:0,
              lineWidth:0.5,
              lineColor: 'rgba(0,0,0,0.75)',
              title: {
                text: 'Month',
                rotation: 270
              }
            },
            xAxis: {
              min: 1,
              max: 31,
              opposite:true,
              tickInterval:1,
              labels: { 
                step: 1,
                style: {
                  fontSize:'8px'
                }
              },
              gridLineWidth:0,
              lineWidth:0.5,
              lineColor: 'rgba(0,0,0,0.75)',
              tickWidth:0.5,
              tickLength:3,
              tickColor: 'rgba(0,0,0,0.75)',
              title: {
                text: 'Day'
              }
            },
            colorAxis: {
              // stops: [
              //   /* [0, '#20255A'],
              //   [0.5, '#4B8EE2'],
              //   [0.9, '#AAEBFF']  */ 
              //   [0, '#AAEBFF'],
              //   [0.5, '#4B8EE2'],
              //   [0.9, '#20255A']
              // ],
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
                  console.log("selfSet",selfDataSet)
                  userJSON = 
            [{"name":"A","data":[{"bin":0,"count":Math.random()*1000},{"bin":10,"count":Math.random()*1000},{"bin":20,"count":Math.random()*1000},{"bin":30,"count":Math.random()*1000},{"bin":40,"count":Math.random()*1000},{"bin":50,"count":Math.random()*1000}]}]
            selfDataSet.histogramDataSet = [];//activity.json();
            setTimeout(() => {
              selfDataSet.histogramDataSet.push(userJSON[0]);
            }, 500);
                }
            }
            }]
          });
        });

        
      }
      histroGramChart() {
        //https://api.myjson.com/bins/fkyjo
        //https://api.myjson.com/bins/7hw5g
        this.http.get('https://api.myjson.com/bins/ghzl8').subscribe(activity => {
            var newJSON = 
            [{"name":"A","data":[{"bin":0,"count":Math.random()*1000},{"bin":10,"count":Math.random()*1000},{"bin":20,"count":Math.random()*1000},{"bin":30,"count":Math.random()*1000},{"bin":40,"count":Math.random()*1000},{"bin":50,"count":Math.random()*1000}]}]
            this.histogramDataSet = newJSON;//activity.json();

            Highcharts.chart('Heacontainer1', {
              chart:{
                  width:500,
                  height:300
              },
              title: {
                  text: ''
              },
              xAxis: {
                  categories: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
                  title:{
                      'text':'Hours'
                  },
                  padding:0,
                  visible:true,
                  tickInterval:1,
                  min:0
              },
              yAxis:{
                  visible:true
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
              tooltip: {
                  formatter: function() {
                    return '<strong>Value: </strong>'+ this.x;
                  }
              },
              series: [{
                  type: 'column',
                  data: [5, 2, 4, 3, 3,1,3,2,5,6,7,7,4,5,6,3,5,7,8,9,9,7,5,4,3]
              }]
          });
        });

    }
      

}
