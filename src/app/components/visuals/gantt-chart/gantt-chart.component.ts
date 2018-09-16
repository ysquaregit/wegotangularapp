import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as Highcharts from 'highcharts/highcharts.js';


@Component({
    selector: 'app-visuals-gantt-chart',
    templateUrl: './gantt-chart.component.html',
    styleUrls: ['./gantt-chart.component.css']
})
export class appVisualganttChartComponent implements OnInit {
    @Input() data: Array<any> = [];
    options: Object;
    fromdateValue: Date;
    todateValue: Date;
    ganttChartObj: Object;
    selfData:  Object;
    constructor() {
        
    }

    ngOnInit() {
        this.selfData = this;
        this.generateGanttChart()
    }

    generateGanttChart() {
        this.ganttChartObj = {
            chart: {
                type: 'xrange',
                width: 900,
                height: 500,
                zoomType: 'xy'
            },
            title: {
                text: 'Pumps Yield'
            },
            xAxis: {
                type: 'datetime',
                top: 50,
                title: {
                    text: 'Hours'
                },
                tickInterval: 360 * 1000, 
                dateTimeLabelFormats: { //force all formats to be hour:minute:second
                    second: '%H:%M',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%H:%M',
                    week: '%H:%M',
                    month: '%H:%M',
                    year: '%H:%M'
                 }
            },
            yAxis: {
                title: {
                    text: 'Sources'
                },
                categories: ['Pump 1', 'Pump 2', 'Pump 3', 'Pump 4', 'Pump 5', 'Pump 6'],
                reversed: true
            },
            tooltip: {
                enabled: true,
                formatter: function () {
                    return '<b>' + this.point.options.label + '</b><br/>' + '<b> Yield value :' + this.point.options.yieldValue + ' K/l</b><br/>'
                }
            },

            series: [{
                name: 'Pumps On / Off Status',
                borderColor: 'gray',
                pointWidth: 20,
                data: this.data,
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        // return this.point.options.yieldPercentage + "%";
                        console.log(this.point.options)
                        console.log(new Date(this.point.options.x2).getTime())

                        var difference = new Date(this.point.options.x2).getTime() - new Date(this.point.options.x).getTime()

                        var daysDifference = Math.floor(difference/1000/60/60/24);
                        difference -= daysDifference*1000*60*60*24

                        var hoursDifference = Math.floor(difference/1000/60/60);
                        difference -= hoursDifference*1000*60*60

                        var minutesDifference = Math.floor(difference/1000/60);
                        difference -= minutesDifference*1000*60

                        var secondsDifference = Math.floor(difference/1000);
                        if(hoursDifference < 10) {
                            var hd = "0"+ hoursDifference;
                        }
                        else{
                            var hd= " "+hoursDifference
                        }

                        if(minutesDifference < 10) {
                            var md = "0"+ minutesDifference;
                        }
                        else{
                            var md= " "+minutesDifference
                        }
                        // console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');
                        return hd +":"+  md +" ("+this.point.options.yieldValue+")";
                    }
                }
            }]
        };
    }

    timeDifference(date1,date2) {
        var difference = date1.getTime() - date2.getTime();

        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24

        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60

        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60

        var secondsDifference = Math.floor(difference/1000);

        console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');
    }

}
