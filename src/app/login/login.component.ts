import { Component } from '@angular/core';
import {
  Ripple,
  Input,
  initTE,
} from "tw-elements";
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  inSubmission = false
  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'primary'

  async login() {
    this.showAlert = true
    const { email, password } = this.credentials
    if(email && password){
      this.auth.login(email, password)
            .pipe(first())
            .subscribe({
                next: (value) => {
                    if(value){
                      this.alertMsg = 'Success! Welcome in Employee App'
                      this.alertColor = 'info'
                      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                      this.router.navigateByUrl(returnUrl);
                    } else {
                      this.alertMsg = 'Email or password was wrong, please check again!'
                      this.alertColor = 'danger'
                      this.inSubmission = true
                    }
                },
                error: error => {
                  console.log(error)
                  this.alertMsg = 'An expected error occured, please try again later!'
                  this.alertColor = 'danger'
                  this.inSubmission = true
                }
            });
    }
    
  }
  ngOnInit () {
    initTE({ Ripple, Input });
  }
}
