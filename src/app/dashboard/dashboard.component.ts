import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import { AuthService } from "../auth/auth.service";
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
    userid: string;


  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

    ngOnInit() {
        if (this.auth.userProfile) {
              this.userid = this.auth.userProfile.sub.split("|")[1];
                this.appService.getDocRequests(0, this.userid)
                    .then(docRequests =>{ 
                        this.TableData = JSON.parse(docRequests._body)
                        this.CountReceivedDocs();
                    });
                this.appService.getMaxPage(this.userid)
                  .then(maxPage => {
                      console.log(maxPage);
                    this.maxPage = (maxPage._body);
                  });
        } else {
          this.auth.getProfile((err, profile) => {
                this.userid = profile.sub.split("|")[1];
                this.appService.getDocRequests(0, this.userid)
                    .then(docRequests =>{ 
                        this.TableData = JSON.parse(docRequests._body)
                        this.CountReceivedDocs();
                    });
                this.appService.getMaxPage(this.userid)
                  .then(maxPage => {
                      console.log(maxPage);
                    this.maxPage = (maxPage._body);
                  });
          });
        }


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

        this.appService.getDocRequests(this.pageID, this.userid)
               .then(docRequests => {
                    this.TableData = JSON.parse(docRequests._body);
                    this.itemsPerPage = this.TableData.length;
                    this.CountReceivedDocs();
                });
    }


}
