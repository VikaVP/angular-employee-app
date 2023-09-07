import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee-app';
  user: User | null | undefined;

  constructor(private authService: AuthService){
    this.authService.user.subscribe(data => (this.user = data))
  }

  logout() {
    this.authService.logout();
  }
}
