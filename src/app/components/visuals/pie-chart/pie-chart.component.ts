import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

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
        console.log("Pie chart data",this.data);
        this.options = {
            chart: { 
                type: 'pie',
                margin: [50, 0, 0, 20],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title : {
                text: 'pie chart'
            },
            series: [{
                name: 'Water Sources(K/l)',
                data: this.data
            }],
            plotOptions: {
                pie: {
                    size:'100%',
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        };
    }

}
