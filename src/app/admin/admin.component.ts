import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'request',
  templateUrl: 'admin.component.html',
  providers:[AppService]
})
export class AdminComponent implements  OnInit{

  TableData: any;
  pageID = 0;
  showRequestForm = false;
  itemsPerPage:Number;
  maxPage:any;



  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.data
      .subscribe((data: { docRequests: any }) => {
        this.TableData = data.docRequests;
             });

    this.appService.getMaxPage()
      .then(maxPage => {
        this.maxPage = JSON.parse(maxPage._body);

      });

  }

  toggleShowRequest(): void {
    this.showRequestForm = !this.showRequestForm;
  }

  updateTable(pageID:number){

    this.pageID=pageID;

      this.appService.getDocRequests(this.pageID)
      .then(docRequests => {
        this.TableData=JSON.parse(docRequests._body);
        this.itemsPerPage=this.TableData.length;


      });







  }

}
