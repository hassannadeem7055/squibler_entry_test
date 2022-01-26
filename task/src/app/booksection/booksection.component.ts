import { Component, HostListener, OnInit, Pipe, PipeTransform, ElementRef } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { SectionModel } from '../models/section-model';
import { PushpulldataService } from '../services/pushpulldata.service';

// recursively
function insertNodeHead(newvalue: string, currNode: SectionModel[]): any{
  currNode.push({
      section_name: newvalue,
      section_uuid: SectionModel.gen_uuid(),
      subsections: []
    });
  return true;
}
function InsertNode(uuid: string, newvalue: string, currNode: SectionModel[]): any {
  for (let i = 0; i < currNode.length; i++) {
    if (uuid == currNode[i].section_uuid) {
      currNode[i].subsections.push(
        {
          section_name: newvalue,
          section_uuid: SectionModel.gen_uuid(),
          subsections: []
        },
      );
      return true;
    }
    else {
      InsertNode(uuid, newvalue, currNode[i].subsections);
    }
  }
}

function DeleteNode(uuid: string, currNode: SectionModel[]): any {
  for (let i = 0; i < currNode.length; i++) {
    if (uuid == currNode[i].section_uuid) {
      delete currNode[i]
      return true;
    }
    else {
      DeleteNode(uuid, currNode[i].subsections);
    }
  }
}

function UpdateNode(uuid: string, newvalue: string, currNode: SectionModel[]): any {
  for (let i = 0; i < currNode.length; i++) {
    if (uuid == currNode[i].section_uuid) {
      currNode[i].section_name = newvalue;
      return true;
    }
    else {
      UpdateNode(uuid, newvalue, currNode[i].subsections);
    }
  }
}


function removeEmptyEntries(arr: any[]) {
  let temp: any[] = [] 
  for (let i of arr){
    i && temp.push(i); // copy each non-empty value to the 'temp' array
  }
  arr = temp;
  for (let i=0; i<arr.length; i++){
    arr[i].subsections = removeEmptyEntries(arr[i].subsections);
  }
  return arr;
}

@Component({
  selector: 'app-booksection',
  templateUrl: './booksection.component.html',
  styleUrls: ['./booksection.component.css'],
  providers: [PushpulldataService],
})
export class BooksectionComponent implements OnInit {
  isConnected: ProgressBarMode = "indeterminate"; //true if connection to DJANGO (MongoDB) is active
  pagetitle = "Squibler Sections"
  public list: SectionModel[] = [];
  selected_uuid = "";
  textInput = "";
  tmp: any[] = [];

  constructor(private pushpulldataservice: PushpulldataService) {
  };

  onSelect(event: any): void {
    let selNode: any;
    event.preventDefault();
    event.stopPropagation();
    this.selected_uuid = event.target.id;
    console.log(this.selected_uuid);
  }

  CreateSection(): void {
    console.log("CREATE SEC");
    if (this.selected_uuid != ""){
      console.log(InsertNode(this.selected_uuid, this.textInput, this.list));
      //  push data to backend (DJANGO)
      this.pushpulldataservice.pushDataToService(this.list);
      this.selected_uuid = "";
    } else {
      console.log(insertNodeHead(this.textInput, this.list));
      //  push data to backend (DJANGO)
      this.pushpulldataservice.pushDataToService(this.list);
      this.selected_uuid = "";
    }
  }

  DeleteSection(): void {
    console.log("DELETE SEC");
    if (this.selected_uuid != ""){
      DeleteNode(this.selected_uuid, this.list);
      this.list = removeEmptyEntries(this.list);
      this.pushpulldataservice.pushDataToService(this.list);
      this.selected_uuid = "";
    }
  }

  UpdateSection(): void {
    console.log("UPDATE SEC");
    if (this.selected_uuid != ""){
      UpdateNode(this.selected_uuid, this.textInput, this.list);
      this.pushpulldataservice.pushDataToService(this.list);
    }
  }

  getFormInput(textInput: any): void {
    this.textInput = textInput;
  }

  ngOnInit(): void {
    this.pushpulldataservice.pullDataFromService()
    .subscribe(data => this.list = data);
  }

}
