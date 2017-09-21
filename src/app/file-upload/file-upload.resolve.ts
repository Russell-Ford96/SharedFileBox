import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from '../app.service';

@Injectable()
export class FileUploadResolve implements Resolve<any> {
    constructor(
        private appService: AppService,
        private router: Router,
    ){ }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        var id = route.params.id;
        return this.appService.getDocRequest(id)
            .then(docRequest => {
                return JSON.parse(docRequest._body); 
            });
    }
}
