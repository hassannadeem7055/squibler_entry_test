import { Injectable } from '@angular/core';
import { SectionModel } from '../models/section-model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushpulldataService {

  readonly API_DJANGO_URL = "http://127.0.0.1:8000/"
  readonly PUSH_URL = this.API_DJANGO_URL + "push";
  readonly PULL_URL = this.API_DJANGO_URL + "pull";
  
  constructor(private http: HttpClient) {
  }

  data:SectionModel[]  = [];
  /*data:SectionModel[]  = [
    {
      section_name: "TOP",
      section_uuid: SectionModel.gen_uuid(),
      subsections: [
        {
          section_name: "SUB TOP 1",
          section_uuid: SectionModel.gen_uuid(),
          subsections: []
        },
        {
          section_name: "SUB TOP 2",
          section_uuid: SectionModel.gen_uuid(),
          subsections: []
        },

      ],
    },
    {
      section_name: "MID",
      section_uuid: SectionModel.gen_uuid(),
      subsections: [
        {
          section_name: "SUB MID 1",
          section_uuid: SectionModel.gen_uuid(),
          subsections: [
            {
              section_name: "SUB-SUB MID 1",
              section_uuid: SectionModel.gen_uuid(),
              subsections: []
            },
            {
              section_name: "SUB-SUB MID 2",
              section_uuid: SectionModel.gen_uuid(),
              subsections: []
            },
          ]
        },
        {
          section_name: "SUB MID 2",
          section_uuid: SectionModel.gen_uuid(),
          subsections: []
        }]
    }
  ];*/


  pullDataFromService():Observable<SectionModel[]> {
    return this.http.get<SectionModel[]>(this.PULL_URL);
  }
  pushDataToService(data: SectionModel[]){
    this.http.post(this.PUSH_URL,{
      "_":data
    }).toPromise().then(data =>{
      console.log(data);
    });
  }
  
}
