import { Component, Input, OnInit } from '@angular/core';
import {
  Alert,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
  @Input() color = 'primary'

  get bgColor() {
    return `bg-${this.color}`
  }

  constructor() { }

  ngOnInit(): void {
    initTE({ Alert });
  }
}
