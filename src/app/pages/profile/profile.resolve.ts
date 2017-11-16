import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from '../../app.service';

@Injectable()
export class  ProfileResolve implements Resolve<any>{

  constructor(private appService: AppService){}

  // resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
  //     var id = route.params.id;
  //     return this.appService.getDocRequest(id)
  //         .then(docRequest => {
  //             return JSON.parse(docRequest._body);
  //         });
  // }

  resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {

    console.log("ProfileResolver");
    return this.appService.getAllBotData()
          .then( bots => {
            return bots;
          });
      }
}
