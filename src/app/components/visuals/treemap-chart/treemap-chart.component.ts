import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as d3 from 'd3';
import * as d3Hierarchy from 'd3-hierarchy';
import * as $ from 'jquery/dist/jquery.min.js';

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
        console.log("treemap data",this.data);
        //var data = d3.nest().key(function(d) { return d.region; }).key(function(d) { return d.subregion; }).entries(this.data);
        this.main();
        
    }

    main() {
        var data = {
          "shortName": "Total Site Consumption",
          "children": [
            {
              "shortName": "Block 1",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 100,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 107,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 321,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 245,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 2",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 130,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 117,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 124,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 450,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 215,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 430,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 322,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 241,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 153,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 322,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 410,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 122,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 415,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 341,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 530,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 410,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 442,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 450,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 410,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 255,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 3",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 147,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 164,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 480,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 344,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 295,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 440,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 392,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 293,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 104,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 322,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 410,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 152,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 475,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 391,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 530,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 490,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 462,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 430,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 493,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 400,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 295,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 4",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 190,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 103,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 164,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 304,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 235,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 470,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 302,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 203,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 184,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 122,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 312,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 480,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 162,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 485,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 301,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 530,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 492,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 400,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 493,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 403,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 421,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 249,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 5",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 140,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 137,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 124,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 490,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 384,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 215,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 460,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 312,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 223,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 184,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 192,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 322,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 470,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 192,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 425,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 331,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 509,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 427,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 425,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 412,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 429,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 427,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 265,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 6",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 150,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 137,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 174,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 490,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 304,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 275,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 429,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 372,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 144,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 332,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 422,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 112,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 425,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 325,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 467,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 490,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 492,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 430,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 440,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 275,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 7",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 190,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 147,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 124,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 490,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 304,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 304,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 304,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 304,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 304,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 432,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 8",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 321,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 245,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 243,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 9",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 467,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 467,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 467,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 467,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 467,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 354,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 10",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 346,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 232,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 245,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 11",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 346,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 107,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 346,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 354,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 12",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 289,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 289,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 289,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 289,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 343,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 343,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 343,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 476,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 13",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 264,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 264,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 264,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 264,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 453,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 324,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 14",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 107,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 324,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 345,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 15",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 435,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 435,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 435,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 435,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 439,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 16",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 439,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 170,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 435,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 345,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 435,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 17",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 107,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 500,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 18",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 107,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 265,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 487,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 321,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 356,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 356,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 356,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 356,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 356,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 19",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 498,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 498,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 498,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 387,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 387,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 20",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 365,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 365,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 336,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 21",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 107,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 336,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 245,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 22",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 107,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 243,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 476,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 465,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 500,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 354,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 23",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 132,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 321,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 432,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 413,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 256,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 354,
                  "children": []
                }
              ]
            },
            {
              "shortName": "Block 24",
              "size": null,
              "children": [
                {
                  "shortName": "Flat 101",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 102",
                  "size": 107,
                  "children": []
                },
                {
                  "shortName": "Flat 103",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 104",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 105",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 106",
                  "size": 354,
                  "children": []
                },
                {
                  "shortName": "Flat 201",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 202",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 203",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 204",
                  "size": 154,
                  "children": []
                },
                {
                  "shortName": "Flat 205",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 206",
                  "size": 342,
                  "children": []
                },
                {
                  "shortName": "Flat 301",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 302",
                  "size": 456,
                  "children": []
                },
                {
                  "shortName": "Flat 303",
                  "size": 489,
                  "children": []
                },
                {
                  "shortName": "Flat 304",
                  "size": 321,
                  "children": []
                },
                {
                  "shortName": "Flat 305",
                  "size": 489,
                  "children": []
                },
                {
                  "shortName": "Flat 306",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 401",
                  "size": 489,
                  "children": []
                },
                {
                  "shortName": "Flat 402",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 403",
                  "size": 489,
                  "children": []
                },
                {
                  "shortName": "Flat 404",
                  "size": 423,
                  "children": []
                },
                {
                  "shortName": "Flat 405",
                  "size": 420,
                  "children": []
                },
                {
                  "shortName": "Flat 406",
                  "size": 489,
                  "children": []
                }
              ]
            }
          ]
        };
          
          //https://bl.ocks.org/JacquesJahnichen/42afd0cde7cbf72ecb81
          //https://bl.ocks.org/ganeshv/6a8e9ada3ab7f2d88022
          //https://gist.github.com/tkafka/6d00c44d5ae52182f548a18e8db44811
          var margin = {top: 20, right: 0, bottom: 0, left: 0},
          width = 950, //640
          height = 530,
          formatNumber = d3.format(",d"),
          transitioning;
          
          var x = d3.scaleLinear()
          .domain([0, width])
          .range([0, width]);
          
          var y = d3.scaleLinear()
          .domain([0, height - margin.top - margin.bottom])
          .range([0, height - margin.top - margin.bottom]);
          
          
          var color = d3.scaleOrdinal()
          .range(d3.schemeCategory10
              .map(function(c) { c = d3.rgb(c); c.opacity = 1; return c; }));
          
          //var color = d3.scaleOrdinal(d3.schemeCategory20.map(fader));
          
          var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); };
          
          var format = d3.format(",d");
          
          var treemap;
          
          var svg, grandparent;
          
          updateDrillDown();
          
          function updateDrillDown() {
              
              if (svg) {
                  svg.selectAll("*").remove();
              } else {
          
                  
                  
          //		 var treemap = d3.layout.treemap()
          //	      .children(function(d, depth) { return depth ? null : d._children; })
          //	      .sort(function(a, b) { return a.value - b.value; })
          //	      .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
          //	      .round(false);
                
                svg = d3.select("#domainDrillDown").append("svg")
                    .attr("width", width - margin.left - margin.right)
                    .attr("height", height - margin.bottom - margin.top)
                    .style("margin-left", -margin.left + "px")
                    .style("margin.right", -margin.right + "px")
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .style("shape-rendering", "crispEdges");		
                  
                  
                   
                    grandparent = svg.append("g")
                        .attr("class", "grandparent");
                    
                    grandparent.append("rect")
                        .attr("y", -margin.top)
                        .attr("width", width)
                        .attr("height", margin.top);
                    
                    grandparent.append("text")
                        .attr("x", 6)
                        .attr("y", 6 - margin.top)
                        .attr("dy", ".75em");		 
                   
                   treemap = d3.treemap()
                      //.tile(d3.treemapResquarify)
                      .size([width, height])
                      .round(false)
                      .paddingInner(1);
              }
                            
                    var root = d3.hierarchy(data)
                        .eachBefore(function(d) { d.id = (d.parent ? d.parent.id + "." : "") + d.data.shortName; })
                        .sum((d) => d.size)
                        .sort(function(a, b) {
                        console.log('initial root sort a ' + a.value + ' b ' + b.value);
                          return b.height - a.height || b.value - a.value; });
                    
                    initialize(root);
                    accumulate(root);
                    layout(root);
                    treemap(root);
                    display(root);
          
          };
          
          
          
          function initialize(root) {
              root.x = root.y = 0;
              root.x1 = width;
              root.y1 = height;
              root.depth = 0;
            }
          
            // Aggregate the values for internal nodes. This is normally done by the
            // treemap layout, but not here because of our custom implementation.
            // We also take a snapshot of the original children (_children) to avoid
            // the children being overwritten when when layout is computed.
            function accumulate(d) {
                console.log('accumulate called ' + d.data.name);
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
          //    treemap.nodes({_children: d._children});
          //	  treemap(d);
              d._children.forEach(function(c) {
                c.x0 = d.x0 + c.x0 * d.x1;
                c.y0 = d.y0 + c.y0 * d.y1;
                c.x1 *= d.x1;
                c.y1 *= d.y1;
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
          console.log()
            g.filter(function(d) { return d._children; })
                .classed("children", true)
                .on("click", transition);
          
            var children = g.selectAll(".child")
                .data(function(d) { return d._children || [d]; })
              .enter().append("g");
          
            children.append("rect")
                .attr("class", "child")
                .call(rect)
              .append("title")
                .text(function(d) { return d.data.shortName + " (" + formatNumber(d.value) + " K/l)"; });
          
            children.append("text")
                .attr("class", "ctext")
                .text(function(d) { return d.data.shortName; })
                .call(text2);
          
            g.append("rect")
                .attr("class", "parent")
                .call(rect);
          
            
              var t = g.append("text")
                .attr("class", "ptext")
                .attr("font-size","1em")
                .attr("dy", ".75em")
              
              t.append("tspan")
                .text(function(d) { return d.data.shortName +' ('+ formatNumber(d.value)+' K/l)'});
              // t.append("tspan")
              //   .attr("dy", "1.0em")
              //   .attr("font-size","1em")
              //   .text(function(d) { return formatNumber(d.value); });
              t.call(text);
              
              g.selectAll("rect")
                .style("fill", function(d) { return color(d.data.shortName); });
              
              
          
            function transition(d) {
              if (transitioning || !d) return;
              transitioning = true;
          
              var g2 = display(d),
                  t1 = g1.transition().duration(750),
                  t2 = g2.transition().duration(750);
          
              
              
              
              // Update the domain only after entering new elements.
              x.domain([d.x0, d.x0 + d.x1]);
              y.domain([d.y0, d.y0 + d.y1]);
          
              // Enable anti-aliasing during the transition.
              svg.style("shape-rendering", null);
          
              // Draw child nodes on top of parent nodes.
              svg.selectAll(".depth").sort(function(a, b) { 
                  console.log('.depth sort a ' + a.depth + ' b ' + b.depth);
                  return a.depth - b.depth; });
          
              // Fade-in entering text.
              g2.selectAll("text").style("fill-opacity", 0);
          
              // Transition to the new view.
              t1.selectAll("text").call(text).style("fill-opacity", 0);
              t2.selectAll("text").call(text).style("fill-opacity", 1);
              t1.selectAll("rect").call(rect);
              t2.selectAll("rect").call(rect);
          
              // Remove the old node when the transition is finished.
              t1.remove().on("end", function() {
                svg.style("shape-rendering", "crispEdges");
                transitioning = false;
              });
            }
          
            return g;
          }
          
          function text(text) {
              text.selectAll("tspan")
                  .attr("x", function(d) { return x(d.x0) + 6; })
              text.attr("x", function(d) { return x(d.x0) + 6; })
                  .attr("y", function(d) { return y(d.y0) + 10; })
                  .style("opacity", function(d) {
                      console.log("text opacity setting textlength " + this.getComputedTextLength() + " d size " + (x(d.x0 + d.x1) - x(d.x0)));
                      return this.getComputedTextLength() < x(d.x0 + d.x1) - x(d.x0) ? 1 : 0; 
                  });
            }
          
            function text2(text) {
              text.attr("x", function(d) { return x(d.x0 + d.x1) - this.getComputedTextLength() - 6; })
                  .attr("y", function(d) { return y(d.y0 + d.y1) - 6; })
                  .style("opacity", function(d) { return this.getComputedTextLength() < x(d.x0 + d.x1) - x(d.x0) ? 1 : 0; });
            }
          
            function rect(rect) {
              rect.attr("x", function(d) { return x(d.x0); })
                  .attr("y", function(d) { return y(d.y0); })
                  .attr("width", function(d) {
                      console.log('id ' + d.id+' rect width ' + (d.x1 - d.x0));
                      return x(d.x0 + d.x1) - x(d.x0); 
                      //return (d.x1 -d.x0);
                
                      })
                  .attr("height", function(d) { 
                      console.log('id ' + d.id+' rect height ' + (d.y1 - d.y0) + ' ordinal ' + (y(d.y1 +d.y0)  - y(d.y0)));
                      return y(d.y0 + d.y1) - y(d.y0);
                      //return y(d.y1 - d.y0);
                
                      });
            }
          
            function name(d) {
              return d.parent
                  ? name(d.parent) + " / " + d.data.shortName + " (" + formatNumber(d.value) + ")"
                  : d.data.shortName + " (" + formatNumber(d.value) + ")";
            }
    }

    
}
