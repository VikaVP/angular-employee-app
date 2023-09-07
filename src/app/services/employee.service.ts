import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Datas, GroupDatas } from '../model/data.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private data: BehaviorSubject<Datas | null>;
  public dataObservable: Observable<Datas | null>;
  private groupData: BehaviorSubject<GroupDatas | null>;
  public groupDataObservable: Observable<GroupDatas | null>;

  constructor(
    private http: HttpClient
  ) { 
    this.data = new BehaviorSubject<Datas | null>(JSON.parse(localStorage.getItem('data')!));
    this.dataObservable = this.data.asObservable();
    this.groupData = new BehaviorSubject<GroupDatas | null>(JSON.parse(localStorage.getItem('groupData')!));
    this.groupDataObservable = this.groupData.asObservable();
  }

  public get allData(): Datas | null {
    return this.data.value;
  }

  public get allGroupData(): GroupDatas | null {
    return this.groupData.value;
  }

  getAllData() {
    return this.http.get<Datas>('../../assets/static/datas.json').pipe(map((data: any) => {
      localStorage.setItem('data', JSON.stringify(data));
      this.data.next(data);

      return data;
    }));
  }

  getAllGroupData() {
    return this.http.get<GroupDatas>('../../assets/static/groups.json').pipe(map((data: any) => {
      localStorage.setItem('groupData', JSON.stringify(data));
      this.groupData.next(data);

      return data;
    }));
  }

  addData(datas: any) {
    let dataSaved = JSON.parse(localStorage.getItem('data')!) || [];
    dataSaved.push(datas);
    localStorage.setItem('data', JSON.stringify(dataSaved));
    this.data.next(dataSaved);

    return true;
  }

  editData(datas: any) {
    let dataSaved = JSON.parse(localStorage.getItem('data')!) || [];
    let newData = dataSaved.map((dt: any, i: number) => {
      if(dt.id === datas.id){
        dt = datas;
      }
      return dt
    })
    localStorage.setItem('data', JSON.stringify(newData));
    this.data.next(newData);

    return true;
  }

  getDetailData(id: any) {
    let detail = null;
    let dataSaved = JSON.parse(localStorage.getItem('data')!) || [];
    dataSaved.map((dt: any, i: number) => {
      if(dt.id === id){
        detail = dt
      }
    })

    return detail;
  }

  deleteData(id: any) {
    let dataSaved = JSON.parse(localStorage.getItem('data')!) || [];
    let deleted = dataSaved.filter((dt: any, i: number) => +dt.id !== +id);
    localStorage.setItem('data', JSON.stringify(deleted));
    this.data.next(deleted);
    
    return deleted;
  }
}
