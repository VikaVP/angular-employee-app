import { Component } from '@angular/core';
import {
  Ripple,
  Datepicker,
  Select,
  Input,
  initTE,
} from "tw-elements";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { first } from 'rxjs/operators';
import { Datas } from '../model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'primary';
  inSubmission = false;
  groupData: any;
  detailData: Datas | undefined;

  constructor(
    private groupDatas: EmployeeService,
    private route: ActivatedRoute,
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

  editForm = new FormGroup({
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

  edit(){
    const submit = this.groupDatas.editData({...this.detailData, ...this.editForm.value})
    if(submit){
      this.showAlert = true
      this.alertMsg = 'Success Edit Employee!'
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
    this.route.paramMap
      .subscribe(
        param => {
          const detailData: any = this.groupDatas.getDetailData(Number(param.get('id')))
          if(detailData){
            this.detailData = detailData;
            this.username.setValue(detailData.username)
            this.email.setValue(detailData.email)
            this.group.setValue(detailData.group)
            this.status.setValue(detailData.status)
            this.firstName.setValue(detailData.firstName)
            this.lastName.setValue(detailData.lastName)
            this.birthDate.setValue(detailData.birthDate)
            this.description.setValue(detailData.description)
            this.basicSalary.setValue(detailData.basicSalary)
          } else {
            this.showAlert = true
            this.alertMsg = 'Data Not Found!'
            this.alertColor = 'danger'
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 500);
          }
      });
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
