import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/user';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {


    user: User = new User();

    constructor(private router: Router, private auth: AuthService) {
    }

    onLogin(): void {
        this.auth.login(this.user)
            .then((user) => {
                //console.log(user);
                if (user.json().success) {
                    //console.log(user.json());
                    sessionStorage.setItem('token', user.json().token);
                    sessionStorage.setItem('uid', user.json().uid);
                    this.router.navigateByUrl('/homepage');
                } else {
                    alert('Login Failed');
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }
}
