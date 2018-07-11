import {Injectable} from '@angular/core';

@Injectable()
export class Globals {
    role = 'test';
    currentSiteID: Number = 1;
    currentSiteName: String;
    currentUID: Number = 3;
    blocksArray: any [] = [];
    blockApartData: any [] = [];
    nonetwork: Boolean = false;
    bpumpfeature = false;
}
