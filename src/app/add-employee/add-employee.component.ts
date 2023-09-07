import { Component } from '@angular/core';
import {
  Ripple,
  Datepicker,
  Select,
  Input,
  initTE,
} from "tw-elements";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'primary';
  inSubmission = false;
  groupData: any;

  constructor(
    private groupDatas: EmployeeService,
    private router: Router,
  ) {
    this.groupData = this.groupDatas.allGroupData;
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])

  username = new  FormControl('', [
    Validators.required,
    Validators.pattern(/^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/)
  ])

  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  birthDate = new FormControl('', [
    Validators.required,
  ])

  basicSalary = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]/)
  ])

  status = new FormControl('', [
    Validators.required,
  ])

  group = new FormControl('', [
    Validators.required,
  ])

  description = new FormControl('', [
    Validators.required,
  ])

  addForm = new FormGroup({
    email: this.email,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    birthDate: this.birthDate,
    basicSalary: this.basicSalary,
    status: this.status,
    group: this.group,
    description: this.description
  })

  add(){
    const submit = this.groupDatas.addData({...this.addForm.value, photo: '', id: Date.now()})
    if(submit){
      this.showAlert = true
      this.alertMsg = 'Success Add Employee!'
      this.alertColor = 'info'
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 500);
    } else {
      this.showAlert = true
      this.alertMsg = 'An expected error occured, please try again later!'
      this.alertColor = 'danger'
      this.inSubmission = true
    }
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    if(!this.groupData){
      this.groupDatas.getAllGroupData()
            .pipe(first())
            .subscribe({
                next: (_value) => {
                },
                error: error => {
                  console.log(error)
                }
            });
    }
  }

  ngAfterViewInit() {
    initTE({ Select, Ripple, Datepicker, Input, });

    const datepickerWithLimits = document.getElementById('datepicker-with-limits');
    new Datepicker(datepickerWithLimits, {
      max: new Date()
    });
  }
}
