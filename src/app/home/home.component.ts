import { Component } from '@angular/core';
import {
  Datatable,
  Popconfirm,
  Tooltip,
  initTE,
} from "tw-elements";
import { EmployeeService } from '../services/employee.service';
import { first } from 'rxjs/operators';
import { Datas } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  employeeData: Datas | null | undefined;
  generateRows: any;
  idRow: any;
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'primary';
  inSubmission = false;
  successDelete = false;
  nowSearch: string | undefined | null;

  constructor(
    private datas: EmployeeService,
    private router: Router
  ) {
    this.nowSearch = localStorage.getItem('search');
    this.datas.dataObservable.subscribe((res) => this.employeeData = res);
  }

  ngAfterViewInit() {
    initTE({ Popconfirm });
  }

  getAll() {
    this.datas.getAllData()
      .pipe(first())
      .subscribe({
        next: (_value) => {
        },
        error: error => {
          console.log(error)
        }
    });
    this.successDelete = false;
  }

  generateCustomAction (data: any) {
    let generated;
    [data].map((rows: any) => {
      generated = rows.map((row: any, i: number) => {
        row.action =`
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="dark"
              data-te-toggle="tooltip"
              title="Detail Employee"
              data-id="${row.id}"
              class="detail-btn inline-block rounded-full border border-info p-1.5 mr-1 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>


            </button>
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="dark"
              data-te-toggle="tooltip"
              title="Edit Employee"
              data-id="${row.id}"
              class="edit-btn inline-block rounded-full border border-warning p-1.5 mr-1 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFF00" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>

            </button>
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              data-id="${row.id}"
              data-te-toggle="popconfirm"
              data-te-popconfirm-mode="modal"
              data-te-class-btnConfirm="ok-delete"
              class="delete-btn inline-block rounded-full border border-danger bg-danger text-white p-1.5 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>

            </button>`
            return row;
          })
          
        })

      return generated;
  }

  ngOnInit() {
    initTE({ Datatable, Tooltip,});

    if(!this.employeeData){
      this.getAll()
    } else {
      let customData = this.generateCustomAction(this.employeeData);
      const data = {
        columns: [
          {
            label: 'Username',
            field: 'username',
            sort: true
          },
          {
            label: 'First name',
            field: 'firstName',
            sort: true
          },
          {
            label: 'Last Name',
            field: 'lastName',
            sort: true
          },
          {
            label: 'Email',
            field: 'email',
            sort: true
          },
          {
            label: 'Birth Date',
            field: 'birthDate',
            sort: true
          },
          {
            label: 'Status',
            field: 'status',
            sort: true
          },
          {
            label: 'Basic Salary',
            field: 'basicSalary',
            sort: true
          },
          { label: "Action", field: "action", sort: false },
        ],
        rows: customData || []
      };

      const instance = new Datatable(document.getElementById('datatable'), data);
      const advancedSearchInput: any = document.getElementById('advanced-search-input');
      const searchButton = document.getElementById("advanced-search-button");
      const datatable= document.getElementById('datatable');

      datatable?.addEventListener('render.te.datatable', (e) => {
        action()
      });

      const action = () => {
        document.querySelectorAll(".detail-btn").forEach((btn: any) => {
          btn.addEventListener("click", () => {
            this.router.navigateByUrl('/detail/'+btn.attributes["data-id"].value)
          });
        });
        
        document.querySelectorAll(".edit-btn").forEach((btn: any) => {
          btn.addEventListener("click", () => {
            this.router.navigateByUrl('/edit/'+btn.attributes["data-id"].value)
          });
        });

        document.querySelectorAll(".delete-btn").forEach((btn: any) => {
          btn.addEventListener("click", () => {
            setTimeout(() => {
              const myPopconfirm = document.getElementById('popconfirm-button-confirm');
              myPopconfirm?.addEventListener('click', (e) => {
              const deleted = this.datas.deleteData(btn.attributes["data-id"].value)
              if(deleted) {
                this.alertMsg = 'Success Delete Employee!'
                this.alertColor = 'info'
                this.showAlert = true
                this.successDelete = true
                instance.update({rows: this.generateCustomAction(deleted)})
                } else {
                  this.alertMsg = 'An expected error occured, please try again later!'
                  this.alertColor = 'danger'
                  this.inSubmission = true
                  this.showAlert = true
                }
              });
            }, 10)
          });
        });
      }

      const search = (value: any) => {
        localStorage.setItem('search', value);
        let [phrase, columns] = value.split(" in:").map((str: any) => str.trim());
        if (columns) {
          columns = columns.split(",").map((str: any) => str.toLowerCase().trim());
        }
        instance.search(phrase, columns);
        action()
      };
          
      searchButton?.addEventListener("click", (e: any) => {
        search(advancedSearchInput?.value);
      });

      advancedSearchInput.addEventListener("keydown", (e: any) => {
        if (e.keyCode === 13) {
          search(e.target.value);
        }
      });

      action()

      if(this.nowSearch){
        search(this.nowSearch)
      }
    }
  }

  openAdd($event: Event){
    $event.preventDefault();
    this.router.navigate(['/add']);
  }
}
