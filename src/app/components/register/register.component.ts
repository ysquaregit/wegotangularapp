import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/user';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user: any ={};

    constructor(private router: Router, private auth: AuthService) {
    }

    onRegister(): void {
        var userjson ={
            name : this.user.email, 
            password : this.user.password
        }
        this.auth.register(userjson)
            .then((user) => {
                sessionStorage.setItem('token', user.json().auth_token);
                this.router.navigateByUrl('/dashboard');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
