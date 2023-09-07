import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent {
  detailData: any;
  groupData: any;
  showAlert = false;
  alertMsg = '';
  alertColor = 'primary';

  constructor(
    private groupDatas: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.groupData = this.groupDatas.allGroupData;
  }

  cancel() {
    this.router.navigate(['/']);
  }

  currencyFormat = (num: number) => {
    return num ? String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '-'
  };

  ngOnInit() {
    this.groupDatas.getAllGroupData()
    .pipe(first())
    .subscribe({
      next: (_value) => {
        this.route.paramMap
          .subscribe(
            param => {
              const detailData: any = this.groupDatas.getDetailData(Number(param.get('id')))
              if(detailData){
                this.groupData.map((group: any, i: number) => {
                  +group.id === +detailData.group && (detailData.group_name = group.name)
                })
                detailData.basicSalary = this.currencyFormat(detailData.basicSalary)
                this.detailData = detailData;
              } else {
                this.alertMsg = 'Data Not Found!'
                this.alertColor = 'danger'
                this.showAlert = true
                setTimeout(() => {
                  this.router.navigateByUrl('/');
                }, 500);
              }
          });
        },
        error: error => {
          console.log(error)
        }
      });
  }
}
