import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import * as moment from 'moment';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { ROUTE_TRANSITION } from './../../app.animation';
import { AppService } from '../../app.service';
import { AppSocketService } from '../../app.socket.service';
import { RequestData } from './requestdata';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router'
import { AuthService } from "../../auth/auth.service";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { AnonymousSubscription } from "rxjs/Subscription";

@Component({
  selector: 'vr-table-pagination',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' },
  providers: [AppService]
})
export class RequestComponent implements OnInit {

  public displayedColumns = ['refnumb', 'email', 'phone', 'shortmessage', 'checkdocs'];
  public requestDatabase: RequestDatabase | null;
  public dataSource: RequestDataSource | null;
  public dataChange: BehaviorSubject<RequestData[]> = new BehaviorSubject<RequestData[]>([]);
  userid: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private appService: AppService,
    private auth: AuthService,
    private socketService: AppSocketService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {

  }

  onDetectChanges(){
    if (!this.cdr['destroyed']) {
      this.cdr.detectChanges();
    }
  }


  ngOnInit() {

    this.requestDatabase = new RequestDatabase(this.appService, this.auth);
    this.dataSource = new RequestDataSource(this.requestDatabase, this.paginator);

    // This service is to update the data in real time through socket
    this.socketService
      .getMessages()
      .subscribe((message: any) => {
        console.log(message);
        console.log(" *********** On Request Component ********** ");
        this.requestDatabase.getData();
        this.onDetectChanges();
      });

  }



  moreDetails(refnumb: string) {
    this.router.navigate(['/request/detail/', refnumb]);
    // console.log(refnumb);
  }

}

export class RequestDataSource extends DataSource<RequestData>{

  constructor(private _reqDatabase: RequestDatabase,
    private _paginator: MatPaginator,
  ) {
    super();
  }



  connect(): Observable<RequestData[]> {
    const displayDataChanges = [
      this._reqDatabase.dataChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      let data = this._reqDatabase.data.slice();

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);

    })
  }

  disconnect() { }

}

export class RequestDatabase {

  userid: string;
  timerSubscription: AnonymousSubscription;

  public dataChange: BehaviorSubject<RequestData[]> = new BehaviorSubject<RequestData[]>([]);

  get data(): RequestData[] {
    return this.dataChange.value;
  }

  constructor(private appService: AppService,
    private auth: AuthService,
  ) {

    this.getData();

  }

  getData() {
    if (this.auth.userProfile) {
      this.userid = this.auth.userProfile.sub.split("|")[1];
      this.requestByUser(this.userid);
    } else {
      this.auth.getProfile((err, profile) => {
        this.userid = profile.sub.split("|")[1];
        this.requestByUser(this.userid);

      });
    }
  }

  requestByUser(id: string) {
    this.userid = id;
    this.appService.getAllRequestData(id).subscribe(data => {


      //this.subscribeToData(this.userid);
      data.sort(function compare(a, b) {
        var dateA = +new Date(a.datetime);
        var dateB = +new Date(b.datetime);
        return dateA - dateB;
      }).reverse();

      this.dataChange.next(data);

      for (let i = 0; i < data.length; i++) {
        let documentArray = data[i].docArray;
        let requestedDocuments = 0;
        requestedDocuments = documentArray.length;
        let numReceivedDocs = 0;
        var checkdocs = false;

        for (let doc of documentArray) {

          if (doc.attachment != undefined) {
            numReceivedDocs++;
          }

        }
        if (requestedDocuments == numReceivedDocs) {
          checkdocs = true;
        }


        data[i].checkdocs = checkdocs;


      }
    });
  }

  public subscribeToData(id: string) {
    this.userid = id;
    //this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.requestByUser(this.userid));
  }
}
