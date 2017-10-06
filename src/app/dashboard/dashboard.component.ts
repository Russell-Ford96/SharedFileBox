import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {count} from "rxjs/operator/count";

@Component({
  selector: 'request',
  templateUrl: 'dashboard.component.html',
  providers:[AppService]
})
export class DashboardComponent implements OnInit {

  TableData: any;
  pageID = 0;
  showRequestForm = false;
  itemsPerPage: Number;
  maxPage: any;
  requestedDocuments: any;


  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.data
      .subscribe((data: { docRequests: any }) => {
          this.TableData = data.docRequests;
        this.CountReceivedDocs();

    });

    this.appService.getMaxPage()
      .then(maxPage => {
        this.maxPage = JSON.parse(maxPage._body);


      });

  }

  toggleShowRequest(): void {
    this.showRequestForm = !this.showRequestForm;
  }

 CountReceivedDocs(){
   let index = 0;
   for(let request of this.TableData) {
     let documentarray = request.docArray;
     let requestedDocuments=0;
     this.requestedDocuments = documentarray.length;
     let numReceivedDocs = 0;

     for (let doc of documentarray) {

       if (doc.attachment != undefined) {
         numReceivedDocs++;
       }

     }
     this.TableData[index].numReceivedDocs = numReceivedDocs;
     this.TableData[index].requestedDocuments= requestedDocuments;
     index++;


   }

 }

  updateTable(pageID : number ) {

    this.pageID = pageID;

    this.appService.getDocRequests(this.pageID)
      .then(docRequests => {
        this.TableData = JSON.parse(docRequests._body);
        this.itemsPerPage = this.TableData.length;
        this.CountReceivedDocs();


      });

  }


}
