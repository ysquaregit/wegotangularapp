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
    options: Object;
    RTSChartOptions:Object;
    RTSChartFinalData:Array<any> = [];
    navActive = 'pie';
    Ganttoptions: Object;

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
                //this.treeMapChart();
                break;
            case 'RTS':
                this.RTSChart();
                break;
            case 'SL': 
                //this.SLchart();
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
        this.options = {
            chart: { 
                type: 'pie'
            },
            title : {
                text: 'pie chart'
            },
            series: [{
                name: 'Brands',
                data: [{
                    name: 'Chrome',
                    y: 61.41,
                }, {
                    name: 'Internet Explorer',
                    y: 11.84
                }, {
                    name: 'Firefox',
                    y: 10.85
                }]
            }]
        };
    }

    RTSChart() {
        let headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.http.get('https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/activity.json').subscribe(activity => {

            activity.json().datasets.forEach((dataset,i) => {
                this.RTSChartOptions = {
                    chart: {
                        type: dataset.type,           
                        zoomType: 'x',
                        height: 300,  
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
                    // xAxis: {
                    //     crosshair: true,
                    //     type: 'datetime',
                    //     dateTimeLabelFormats: {
                    //         year: '%Y'
                    //     }
                    // },
                    yAxis: [{
                        title: {
                            text: dataset.Name
                        },
                        height: 200,
                        lineWidth: 2,
                        top: 0,
                    }],
                    legend: {
                            align: 'center',
                            verticalAlign: 'top',
                            layout: 'vertical',
                            x: 30,
                            y: 0,
            
                        itemStyle: {
                            color: '#ffffff',
                            fontSize: '14px'
                        }
                    },
                    plotOptions: {
                        series: {
                            pointStart: 2010,
                            color: '#2B908F'
                        }
                    },
                    series: [{
                        name: dataset.Name,
                        data: dataset.data,
                        yAxis : 0,
                    }]
                };  
                this.RTSChartFinalData.push(this.RTSChartOptions);
            });
        });
    }

    ganttChart() {
        var today_date = new Date(),
        day = 1000 * 60 * 60 * 24;

        // Set to 00:00:00:000 today
        today_date.setUTCHours(0);
        today_date.setUTCMinutes(0);
        today_date.setUTCSeconds(0);
        today_date.setUTCMilliseconds(0);
        var today = today_date.getTime();
        this.Ganttoptions = {
            title: {
                text: 'Gantt Chart Test'
            },
            xAxis: {
                currentDateIndicator: true,
                min: today - 3 * day,
                max: today + 18 * day
            },
        
            /*
            plotOptions: {
                gantt: {
                    pathfinder: {
                        type: 'simpleConnect'
                    }
                }
            },
            */
        
            series: [{
                name: 'Offices',
                data: [{
                    taskName: 'New offices',
                    id: 'new_offices',
                    start: today - 2 * day,
                    end: today + 14 * day
                }, {
                    taskName: 'Prepare office building',
                    id: 'prepare_building',
                    parent: 'new_offices',
                    start: today - (2 * day),
                    end: today + (6 * day),
                    completed: {
                        amount: 0.2
                    }
                }, {
                    taskName: 'Inspect building',
                    id: 'inspect_building',
                    dependency: 'prepare_building',
                    parent: 'new_offices',
                    start: today + 6 * day,
                    end: today + 8 * day
                }, {
                    taskName: 'Passed inspection',
                    id: 'passed_inspection',
                    dependency: 'inspect_building',
                    parent: 'new_offices',
                    start: today + 9.5 * day,
                    milestone: true
                }, {
                    taskName: 'Relocate',
                    id: 'relocate',
                    dependency: 'passed_inspection',
                    parent: 'new_offices',
                    start: today + 10 * day,
                    end: today + 14 * day
                }, {
                    taskName: 'Relocate staff',
                    id: 'relocate_staff',
                    parent: 'relocate',
                    start: today + 10 * day,
                    end: today + 11 * day
                }, {
                    taskName: 'Relocate test facility',
                    dependency: 'relocate_staff',
                    parent: 'relocate',
                    start: today + 11 * day,
                    end: today + 13 * day
                }, {
                    taskName: 'Relocate cantina',
                    dependency: 'relocate_staff',
                    parent: 'relocate',
                    start: today + 11 * day,
                    end: today + 14 * day
                }]
            }, {
                name: 'Product',
                data: [{
                    taskName: 'New product launch',
                    id: 'new_product',
                    start: today - day,
                    end: today + 18 * day
                }, {
                    taskName: 'Development',
                    id: 'development',
                    parent: 'new_product',
                    start: today - day,
                    end: today + (11 * day),
                    completed: {
                        amount: 0.6,
                        fill: '#e80'
                    }
                }, {
                    taskName: 'Beta',
                    id: 'beta',
                    dependency: 'development',
                    parent: 'new_product',
                    start: today + 12.5 * day,
                    milestone: true
                }, {
                    taskName: 'Final development',
                    id: 'finalize',
                    dependency: 'beta',
                    parent: 'new_product',
                    start: today + 13 * day,
                    end: today + 17 * day
                }, {
                    taskName: 'Launch',
                    dependency: 'finalize',
                    parent: 'new_product',
                    start: today + 17.5 * day,
                    milestone: true
                }]
            }]
        };
    }



    heatMapChart() {
        var margin = {top: 20, right: 0, bottom: 0, left: 0},
            width = 960,
            height = 500 - margin.top - margin.bottom,
            formatNumber = d3.format(",d"),
            transitioning;
        console.log("margin",margin)

        var x = d3.scaleLinear()
            .domain([0, width])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([0, height])
            .range([0, height]);
        console.log("d3",d3)
        var treemap = d3.treemap()
        // treemap.children(function(d, depth) { return depth ? null : d._children; })
        // treemap.sort(function(a, b) { return a.value - b.value; })
        // treemap.ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
        // treemap.round(false);

        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .style("margin-left", -margin.left + "px")
            .style("margin.right", -margin.right + "px")
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("shape-rendering", "crispEdges");

        var grandparent = svg.append("g")
            .attr("class", "grandparent");

        grandparent.append("rect")
            .attr("y", -margin.top)
            .attr("width", width)
            .attr("height", margin.top);

        grandparent.append("text")
            .attr("x", 6)
            .attr("y", 6 - margin.top)
            .attr("dy", ".75em");
            console.log("TEST JSON",grandparent)

            d3.json("https://codepen.io/boars/pen/7958d57f25d20fae4e606732adbccf73.js").then((root) => {
                
                initialize(root);
                accumulate(root);
                layout(root);
                display(root);
              
                function initialize(root) {
                  root.x = root.y = 0;
                  root.dx = width;
                  root.dy = height;
                  root.depth = 0;
                }
              
                // Aggregate the values for internal nodes. This is normally done by the
                // treemap layout, but not here because of our custom implementation.
                // We also take a snapshot of the original children (_children) to avoid
                // the children being overwritten when when layout is computed.
                function accumulate(d) {
                  return (d._children = d.children)
                      ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
                      : d.value;
                }
              
                // Compute the treemap layout recursively such that each group of siblings
                // uses the same size (1×1) rather than the dimensions of the parent cell.
                // This optimizes the layout for the current zoom state. Note that a wrapper
                // object is created for the parent node for each group of siblings so that
                // the parent’s dimensions are not discarded as we recurse. Since each group
                // of sibling was laid out in 1×1, we must rescale to fit using absolute
                // coordinates. This lets us use a viewport to zoom.
                function layout(d) {
                  if (d._children) {
                    // treemap(d._children);
                    d._children.forEach((c)=> {
                      c.x = d.x + c.x * d.dx;
                      c.y = d.y + c.y * d.dy;
                      c.dx *= d.dx;
                      c.dy *= d.dy;
                      c.parent = d;
                      layout(c);
                    });
                  }
                }
              
                function display(d) {
                  grandparent
                      .datum(d.parent)
                      .on("click", transition)
                    .select("text")
                      .text(name(d));
              
                  var g1 = svg.insert("g", ".grandparent")
                      .datum(d)
                      .attr("class", "depth");
              
                  var g = g1.selectAll("g")
                      .data(d._children)
                    .enter().append("g");
              
                  g.filter(function(d) { return d._children; })
                      .classed("children", true)
                      .on("click", transition);
              
                  g.selectAll(".child")
                      .data(function(d) { return d._children || [d]; })
                    .enter().append("rect")
                      .attr("class", "child")
                      .call(rect);
              
                  g.append("rect")
                      .attr("class", "parent")
                      .call(rect)
                    .append("title")
                      .text(function(d) { return formatNumber(d.value); });
              
                  g.append("text")
                      .attr("dy", ".75em")
                      .text(function(d) { return d.name; })
                      .call(text);
              
                  function transition(d) {
                    if (transitioning || !d) return;
                    transitioning = true;
              
                    var g2 = display(d),
                        t1 = g1.transition().duration(750),
                        t2 = g2.transition().duration(750);
              
                    // Update the domain only after entering new elements.
                    x.domain([d.x, d.x + d.dx]);
                    y.domain([d.y, d.y + d.dy]);
              
                    // Enable anti-aliasing during the transition.
                    svg.style("shape-rendering", null);
              
                    // Draw child nodes on top of parent nodes.
                    svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });
              
                    // Fade-in entering text.
                    g2.selectAll("text").style("fill-opacity", 0);
              
                    // Transition to the new view.
                    t1.selectAll("text").call(text).style("fill-opacity", 0);
                    t2.selectAll("text").call(text).style("fill-opacity", 1);
                    t1.selectAll("rect").call(rect);
                    t2.selectAll("rect").call(rect);
              
                    // Remove the old node when the transition is finished.
                    t1.remove().each("end", function() {
                      svg.style("shape-rendering", "crispEdges");
                      transitioning = false;
                    });
                  }
              
                  return g;
                }
              
                function text(text) {
                  text.attr("x", function(d) { return x(d.x) + 6; })
                      .attr("y", function(d) { return y(d.y) + 6; });
                }
              
                function rect(rect) {
                  rect.attr("x", function(d) { return x(d.x); })
                      .attr("y", function(d) { return y(d.y); })
                      .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
                      .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
                }
              
                function name(d) {
                  return d.parent
                      ? name(d.parent) + "." + d.name
                      : d.name;
                }
            });

    }

    usageChart() {
        
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
    
            var node = svg.selectAll(".node")
                .data(pack(root).leaves())
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
            node.append("circle")
                .attr("id", function(d) { return d.id; })
                .attr("r", function(d) { return d.r; })
                .style("fill", function(d) { return color(d.package); });
    
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
                .text(function(d) { return d; });
    
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

}
