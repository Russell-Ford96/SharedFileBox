import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AppService } from '../app.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent {
  // public uploader: FileUploader = new FileUploader({ url: 'http://localhost:5000/api/upload', itemAlias: "single", autoUpload: true
  public uploader: FileUploader = new FileUploader({ url: 'http://10.34.24.238:5000/api/upload', itemAlias: "single", autoUpload: true
  });

  id: any;
  docRequest: any;
  fileIndex: number;
  avatarService = '../../assets/avatar-chica.png';
  messageList = [
    { avatar:'../../assets/avatar-chica.png',
      name:'Eva',
      msj:'Hello, thank you very much for using our services',
      show: false},
    { avatar:'../../assets/avatar-chica.png',
      name:'Eva',
      msj:'Please upload the requested documents to complete your application.',
      show: false
    }
  ];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) {
    this.id = route.params.map(p => p.id);
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { docRequest: any }) => {
        this.docRequest = data.docRequest;
        for (var doc in this.docRequest.docArray) {
          this.docRequest.docArray[doc].docIndex = doc;
          this.docRequest.docArray[doc].show = false;
        }
      });
    console.log(this.docRequest);
    console.log(this.messageList);

    this.uploader.onBeforeUploadItem = (item: any) => {
      item.withCredentials = false;
      this.uploader.options.additionalParameter = {
        index: item.formData[0].index,
        _id: item.formData[1]._id
      };
      this.docRequest.docArray[item.formData[0].index].attachment = "uploaded";
    };

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      //here we push the index of the file into formdata because it's the only place i could find that would hold the value.
      file.formData.push({ "index": this.fileIndex });
      file.formData.push({ "_id": this.docRequest._id });
      console.log("FILE ON AFTER ADDING"+file);
    };

    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("item uploaded: " + response);
      if(this.uploader.isUploading){
        console.log("All item uploaded");
      }

    };
    this.messageSimulation();
  }

  updateFileIndex(index: number) {
    this.fileIndex = index;
  }

  messageSimulation(){
    setTimeout(() => {
      this.messageList[0].show = true;
    },1000);
    setTimeout(() => {
      this.messageList[1].show = true;
    },3000);

    setTimeout(() => {
      for (var doc in this.docRequest.docArray) {
          this.docRequest.docArray[doc].show = true;
      }
    },4000);



  }

}
