import {Component} from "@angular/core";
import {FileUploader} from 'ng2-file-upload';



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
export class FileUploadComponent{

  public uploader:FileUploader = new FileUploader({url:'localhost:5000/api/upload'});
}
