import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from '../app.service';

@Injectable()
export class AutobotResolve implements Resolve<any> {
    constructor(
        private appService: AppService,
        private router: Router
    ){console.log("route.params.url constructor"); }




    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        var url = route.params.url;
        console.log("route.params.url ", route.params.url);
        return this.appService.getBotByUrl(url)
            .then(bot => {
                return JSON.parse(bot._body);
            });
    }
}
