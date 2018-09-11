import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-visuals-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css']
})
export class appVisualPieChartComponent implements OnInit {
    @Input() data: Array<any> = [];
    options: Object;
    fromdateValue: Date;
    todateValue: Date;

    constructor() {

    }

    ngOnInit() {
        console.log("Pie chart data", this.data);
        this.options = {
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Pie Chart'
            },
            series: [{
                name: 'Water Sources(K/l)',
                data: this.data
            }],
            plotOptions: {
                pie: {
                    size: '100%',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <br> Water Sources(K/l): {point.y}'
                    },
                    slicedOffset: 20,
                    allowPointSelect: false,
                    cursor: 'pointer'
                }
            }
        };
    }

}
