import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-popup',
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.css'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({transform: 'scale3d(.7, .7, .7)'}),
                animate(200)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'scale3d(.7, .7, .7)'}))
            ])
        ])
    ]
})
export class PopupComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}