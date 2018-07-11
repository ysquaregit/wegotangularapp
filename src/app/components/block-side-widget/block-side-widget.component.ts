import {Component, OnInit} from '@angular/core';
import {Globals} from "../../globals";

@Component({
    selector: 'app-block-side-widget',
    templateUrl: './block-side-widget.component.html',
    styleUrls: ['./block-side-widget.component.css']
})
export class BlockSideWidgetComponent implements OnInit {

    siteName = this.global.currentSiteName;

    constructor(private global: Globals) {
    }

    ngOnInit() {
    }

}
