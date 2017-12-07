import {ROUTE_TRANSITION} from '../../../app.animation';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AppService} from '../../../app.service';
import {AuthService} from '../../../auth/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'vr-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }

})

export class RequestDetailComponent implements OnInit{

  requestData : any;
  refnumb: any;
  createdBy: any;
  filePath: any;
  documnetArray: any;
  url: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService) {}


  ngOnInit() {

      this.activatedRoute.params.subscribe((params: Params) => {
      this.refnumb = params['refnumb'];
      //console.log(this.refnumb);
    });

    this.appService.getRefNumbRequest(this.refnumb)
      .then(results => {
        this.requestData = JSON.parse(results._body);
        console.log(this.requestData);
        const foo = this.requestData;

        this.createdBy= foo.createdBy;
        this.refnumb= foo.refnumb;
        this.documnetArray = foo.docArray;
        for(let i = 0 ; i < this.documnetArray.length; i++){
          const obj = this.documnetArray[i];
          this.filePath = obj.fileName;
          this.documnetArray[i].url = "http://localhost:5000/api/getimage/" + this.createdBy + '/' + this.refnumb + '/' + this.filePath;

         // console.log(obj);
        }


       //this.url = "http://localhost:5000/api/getimage/" + this.createdBy + '/' + this.refnumb + '/' + this.filePath;

       // this.appService.getImage(url)



      });




  }

  theData(){
    return this.requestData;
  }




}


