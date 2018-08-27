import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as d3 from 'd3';
import * as d3Hierarchy from 'd3-hierarchy';
import * as $ from 'jquery/dist/jquery.min.js';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as Highcharts from 'highcharts/highcharts.js';
import * as highchartMore from 'highcharts/highcharts-more.src.js';
import Tree from 'highcharts/modules/treemap';

// am4core.useTheme(am4themes_animated);

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
        //this.main();
        this.generateAmcharts();
        
    }

    generateAmcharts() {
      $.getJSON('https://api.myjson.com/bins/8damo', function (data) {

  var points = [],
    regionP,
    regionVal,
    regionI = 0,
    countryP,
    countryI,
    causeP,
    causeI,
    region,
    country,
    cause,
    causeName = {
      'Communicable & other Group I': 'Communicable diseases',
      'Noncommunicable diseases': 'Non-communicable diseases',
      'Injuries': 'Injuries'
    };

  for (region in data) {
    if (data.hasOwnProperty(region)) {
      regionVal = 0;
      regionP = {
        id: 'id_' + regionI,
        name: region,
        color: Highcharts.getOptions().colors[regionI]
      };
      countryI = 0;
      for (country in data[region]) {
        if (data[region].hasOwnProperty(country)) {
          countryP = {
            id: regionP.id + '_' + countryI,
            name: country,
            parent: regionP.id
          };
          points.push(countryP);
          causeI = 0;
          for (cause in data[region][country]) {
            if (data[region][country].hasOwnProperty(cause)) {
              causeP = {
                id: countryP.id + '_' + causeI,
                name: cause,
                parent: countryP.id,
                value: Math.round(+data[region][country][cause])
              };
              regionVal += causeP.value;
              points.push(causeP);
              causeI = causeI + 1;
            }
          }
          countryI = countryI + 1;
        }
      }
      regionP.value = Math.round(regionVal / countryI);
      points.push(regionP);
      regionI = regionI + 1;
    }
  }
  console.log("points",points)
  new Highcharts.Chart({
    chart:{
      renderTo: 'chartdiv',
    },
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      allowDrillToNode: true,
      animationLimit: 1000,
      dataLabels: {
        enabled: false
      },
      levelIsConstant: false,
      levels: [{
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 5
      }],
      data: points
    }],
    subtitle: {
      text: ''
    },
    title: {
      text: ''
    }
  });

});

    }

    main() {
        var data = {
          "name": "Total Site Consumption",
          "children": [
            {
              "name": "Block 1",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 100,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 107,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 321,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 245,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 2",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 130,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 117,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 124,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 450,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 215,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 430,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 322,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 241,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 153,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 322,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 410,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 122,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 415,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 341,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 530,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 410,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 442,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 450,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 410,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 255,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 3",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 147,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 164,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 480,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 344,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 295,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 440,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 392,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 293,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 104,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 322,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 410,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 152,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 475,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 391,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 530,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 490,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 462,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 430,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 493,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 400,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 295,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 4",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 190,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 103,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 164,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 304,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 235,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 470,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 302,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 203,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 184,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 122,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 312,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 480,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 162,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 485,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 301,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 530,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 492,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 400,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 493,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 403,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 421,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 249,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 5",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 140,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 137,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 124,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 490,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 384,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 215,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 460,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 312,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 223,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 184,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 192,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 322,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 470,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 192,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 425,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 331,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 509,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 427,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 425,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 412,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 429,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 427,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 265,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 6",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 150,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 137,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 174,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 490,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 304,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 275,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 429,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 372,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 144,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 332,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 422,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 112,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 425,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 325,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 467,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 490,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 492,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 430,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 440,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 275,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 7",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 190,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 147,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 124,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 490,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 304,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 304,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 304,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 304,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 304,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 432,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 8",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 321,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 245,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 243,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 9",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 467,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 467,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 467,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 467,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 467,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 354,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 10",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 346,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 232,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 245,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 11",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 346,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 107,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 346,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 354,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 12",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 289,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 289,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 289,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 289,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 343,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 343,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 343,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 476,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 13",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 264,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 264,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 264,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 264,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 453,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 324,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 14",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 107,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 324,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 345,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 15",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 435,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 435,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 435,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 435,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 439,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 16",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 439,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 170,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 435,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 345,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 435,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 17",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 107,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 500,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 18",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 107,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 265,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 487,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 321,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 356,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 356,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 356,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 356,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 356,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 19",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 498,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 498,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 498,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 387,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 387,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 20",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 365,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 365,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 336,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 21",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 107,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 336,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 245,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 22",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 107,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 243,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 476,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 465,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 500,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 354,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 23",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 132,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 321,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 432,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 413,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 256,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 354,
                  "children": []
                }
              ]
            },
            {
              "name": "Block 24",
              "value": null,
              "children": [
                {
                  "name": "Flat 101",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 102",
                  "value": 107,
                  "children": []
                },
                {
                  "name": "Flat 103",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 104",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 105",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 106",
                  "value": 354,
                  "children": []
                },
                {
                  "name": "Flat 201",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 202",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 203",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 204",
                  "value": 154,
                  "children": []
                },
                {
                  "name": "Flat 205",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 206",
                  "value": 342,
                  "children": []
                },
                {
                  "name": "Flat 301",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 302",
                  "value": 456,
                  "children": []
                },
                {
                  "name": "Flat 303",
                  "value": 489,
                  "children": []
                },
                {
                  "name": "Flat 304",
                  "value": 321,
                  "children": []
                },
                {
                  "name": "Flat 305",
                  "value": 489,
                  "children": []
                },
                {
                  "name": "Flat 306",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 401",
                  "value": 489,
                  "children": []
                },
                {
                  "name": "Flat 402",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 403",
                  "value": 489,
                  "children": []
                },
                {
                  "name": "Flat 404",
                  "value": 423,
                  "children": []
                },
                {
                  "name": "Flat 405",
                  "value": 420,
                  "children": []
                },
                {
                  "name": "Flat 406",
                  "value": 489,
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
                        .eachBefore(function(d) { d.id = (d.parent ? d.parent.id + "." : "") + d.data.name; })
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
                .text(function(d) { return d.data.name + " (" + formatNumber(d.value) + " K/l)"; });
          
            children.append("text")
                .attr("class", "ctext")
                .text(function(d) { return d.data.name; })
                .call(text2);
          
            g.append("rect")
                .attr("class", "parent")
                .call(rect);
          
            
              var t = g.append("text")
                .attr("class", "ptext")
                .attr("font-size","1em")
                .attr("dy", ".75em")
              
              t.append("tspan")
                .text(function(d) { return d.data.name +' ('+ formatNumber(d.value)+' K/l)'});
              // t.append("tspan")
              //   .attr("dy", "1.0em")
              //   .attr("font-size","1em")
              //   .text(function(d) { return formatNumber(d.value); });
              t.call(text);
              
              g.selectAll("rect")
                .style("fill", function(d) { return color(d.data.name); });
              
              
          
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
                  ? name(d.parent) + " / " + d.data.name + " (" + formatNumber(d.value) + ")"
                  : d.data.name + " (" + formatNumber(d.value) + ")";
            }
    }

    
}
