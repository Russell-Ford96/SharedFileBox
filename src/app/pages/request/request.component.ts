import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { ROUTE_TRANSITION } from './../../app.animation';
import {AppService} from '../../app.service';
import {RequestData} from './requestdata';
import {ActivatedRoute, Router} from '@angular/router';
import { RouterLink } from '@angular/router'
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'vr-table-pagination',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' },
  providers : [AppService]
})
export class RequestComponent implements OnInit {

  public displayedColumns = ['refnumb', 'email', 'phone','shortmessage','checkdocs'];
  public requestDatabase : RequestDatabase | null;
  public dataSource : RequestDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private appService: AppService,
            private auth: AuthService,
            private router: Router) {}

  ngOnInit() {
    this.requestDatabase = new RequestDatabase(this.appService, this.auth);
    this.dataSource = new RequestDataSource(this.requestDatabase, this.paginator);
  }

  moreDetails(refnumb: string){
    this.router.navigate(['/request/detail/' ,   refnumb]);
   // console.log(refnumb);
  }

}

export class RequestDataSource extends DataSource<RequestData>{

  constructor(private _reqDatabase: RequestDatabase, private _paginator: MdPaginator) {
    super();
  }

  connect(): Observable<RequestData[]> {
    const displayDataChanges = [
      this._reqDatabase.dataChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._reqDatabase.data.slice();

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    })
  }

  disconnect() {}

}

export class RequestDatabase{

  userid: string;

  public dataChange: BehaviorSubject<RequestData[]> = new BehaviorSubject<RequestData[]>([]);
  get data(): RequestData[] { return this.dataChange.value; }

  constructor(
    private appService: AppService,
    private auth: AuthService

  ) {

    if(this.auth.userProfile){
      this.userid = this.auth.userProfile.sub.split("|")[1];
      this.requestByUser(this.userid);
    }else{
      this.auth.getProfile((err, profile) => {
        this.userid = profile.sub.split("|")[1];
        this.requestByUser(this.userid);

      });
     }

  }

  requestByUser(id: string ){
    this.userid = id;

    this.appService.getAllRequestData(id).subscribe(data =>{
      this.dataChange.next(data);

      for(let i=0;i<data.length; i++){
        let documentArray= data[i].docArray;
        let requestedDocuments=0;
        requestedDocuments = documentArray.length;
        let numReceivedDocs = 0;
        var checkdocs= false;

        for (let doc of documentArray) {

          if (doc.attachment != undefined) {
            numReceivedDocs++;
          }

        }
        if(requestedDocuments==numReceivedDocs){
          checkdocs = true;
        }


        data[i].checkdocs= checkdocs;


      }
    });

  }
}
