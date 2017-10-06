import {Component} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable }           from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AppService } from '../app.service';



@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {

  constructor() {
    debugger;
  }

}
