import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Message} from 'primeng/primeng';
import {MessageService} from "../../services/data.service";
import {PingService} from "../../services/ping.service";

@Component({
    selector: 'app-nav-comp',
    templateUrl: './nav-comp.component.html',
    styleUrls: ['./nav-comp.component.css']
})
export class NavCompComponent implements OnInit {
    datevar;
    userName = '';
    private msgs: Message[] = [];
    ping: number = 0;
    private isEnabled: Boolean;

    constructor(private messageService: MessageService, private _pingService: PingService, private router: Router) {
        this.datevar = new Date();
        this.messageService.getDisableNac().subscribe(message => {
            this.isEnabled = message;
        });
    }

    ngOnInit() {
        this.userName = sessionStorage.getItem('name');
    }


    logout() {
        sessionStorage.removeItem('sid');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('uid');
        this.router.navigate(['/']);
        window.location.reload();
    }


    noInvoice() {
        this.msgs.push({
            severity: 'Warning',
            summary: 'No Data',
            detail: 'No Previous Month Data available for generating Invoices.'
        });
    }

    about() {
        alert('v2.054');
    }

    notenabled() {
        alert('Navigation is Disabled due to No Internet Connectivity');
    }
}
