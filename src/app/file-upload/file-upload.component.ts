import {Component} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable }           from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AppService } from '../app.service';



@Component({
    selector:'app-file-upload',
    templateUrl: './file-upload.component.html',
  styles: [`
        .search-row {
            background: #FAFAFA;
            height: 45px;
            border-bottom: 2px solid #e5e5e5
        }
        .btn-selected {
            border-bottom: 8px solid #00ACE7 !important;
            font: 16px carnas;
            font-weight: bold;
        }
        .search-bar {
            background: #e5e5e5;
            border-radius: 5px
        }
        .custom-btn {
            height: 45px;
        }
        .buttons-row {
            background: #FAFAFA;
        }
        /* mobile */
        @media only screen and (max-width: 600px) {
            .buttons-row {
                margin-top: 5px;
                text-align: center;
            }
            .custom-btn {
                width: 40%;
                border-radius: 0px;
                border: 1px solid #B3B3B3;
                margin: 0;
                background: #FAFAFA;
            }
            .received-btn {
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
            }
            .sent-btn {
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
            }
            .logo {
                align: center;
            }
        }
        /* desktop */
        @media only screen and (min-width: 600px) {
            .buttons-row {
                border-bottom: 1px solid #CCCCCC;
            }
            .custom-btn {
                width: 10%;
                background: #FAFAFA;
                border: none;
                border-radius: 0px;
            }
            .logo {
                padding-top: 10px;
                padding-left: 10px;
            }
        }

        #container{

            width: 95%;
            margin:100px auto;

            box-shadow: 0 0 3px rgba(0,0,0, 0.1);

        }
        #filedrop{
            background: #FAFAFA;
        }
    `]
})
export class FileUploadComponent {
    public uploader:FileUploader = new FileUploader({url:'http://localhost:5000/api/upload', itemAlias: "single" });
    id: any;
    docRequest: any;
    fileIndex: number;

    constructor(
        private appService: AppService,
        private route: ActivatedRoute
    ) {
        this.id  = route.params.map(p => p.id);
    }

    ngOnInit() {
        this.route.data
              .subscribe((data: { docRequest: any }) => {
                this.docRequest = data.docRequest;
                  for(var doc in this.docRequest.docArray) {
                      this.docRequest.docArray[doc].docIndex = doc;
                  }
              });
                console.log(this.docRequest);

        this.uploader.onBeforeUploadItem = (item: any) => {
          item.withCredentials = false;
          this.uploader.options.additionalParameter = {
            index: item.formData[0].index,
            _id: item.formData[1]._id
          };
            this.docRequest.docArray[item.formData[0].index].attachment = "uploaded";
        };

           //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = (file)=> { 
            file.withCredentials = false; 
            //here we push the index of the file into formdata because it's the only place i could find that would hold the value.
            file.formData.push({"index": this.fileIndex});  
            file.formData.push({"_id": this.docRequest._id});
            console.log(file); 
        };

           //overide the onCompleteItem property of the uploader so we are 
           //able to deal with the server response.
           this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
               console.log("item uploaded: " + response);
            };
        }
    updateFileIndex(index: number) {
        this.fileIndex = index;
    }

}
