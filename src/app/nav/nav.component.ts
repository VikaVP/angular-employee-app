import { Component } from '@angular/core';
import { Carousel, Dropdown, initTE } from 'tw-elements';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  name: string | undefined;

  constructor(
    public auth: AuthService,
  ) {
    this.name = this.auth.currentUser?.username;
  }
  
  ngOnInit() {
    initTE({ Carousel, Dropdown });
  }
}
