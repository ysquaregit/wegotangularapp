import {Injectable} from "@angular/core";

@Injectable()
export class UtilityService {
    isLogged(): Promise<boolean> {
        if (typeof (Storage) !== 'undefined') {
            //console.log(sessionStorage.getItem('token'));
            if (sessionStorage.getItem('token')) {
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
}