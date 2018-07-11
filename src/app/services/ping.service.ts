import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Subject} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class PingService {
    pingStream: Subject<number> = new Subject<number>();
    ping: number = 0;
    url: string = "http://w2.venaqua.com";

    constructor(private _http: Http) {

    }
}