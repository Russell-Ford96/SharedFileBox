import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from '../app.service';

@Injectable()
export class RequestResolve implements Resolve<any> {
  constructor(
    private appService: AppService,
    private router: Router,
  ){ }

  resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {

    return this.appService.getDocRequests(0)
      .then(docRequests => JSON.parse(docRequests._body));
  }


}
