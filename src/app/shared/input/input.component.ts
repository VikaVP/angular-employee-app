import { Component, OnInit, Input as InputCore } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Ripple,
  Datepicker,
  Input,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @InputCore() control: FormControl = new FormControl()
  @InputCore() type = 'text'
  @InputCore() placeholder = ''
  @InputCore() format = ''
  @InputCore() name = ''

  constructor() { }

  ngOnInit(): void {
    initTE({ Ripple, Datepicker, Input, });
  }

}