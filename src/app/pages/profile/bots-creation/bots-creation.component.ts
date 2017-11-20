import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit,
  Input, Output, EventEmitter, OnChanges
} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { AppService } from '../../../app.service';
import * as fromRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { Bot } from '../bot.model';


@Component({
  selector: 'vr-create-bot',
  templateUrl: './bots-creation.component.html',
  styleUrls: ['./bots-creation.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotsCreationComponent implements OnInit, OnChanges {
  public msgSent = false;
  public msgErr = false;
   @Input() bot: Bot;
   @Output() botChange = new EventEmitter<Bot>();
   @Output() closeForm = new EventEmitter<boolean>();
   @Output() onLoading = new EventEmitter<boolean>();
   showProgressBar: boolean;



  requestForm: FormGroup;
  secondFormGroup: FormGroup;
  submitted = false;
  profile: any;

  items: {name: String , file: boolean, position: number }[];
  item: {name: String , file: boolean, position: number }; // if file = false the is a question


  layoutGap = {
    'lt-md': '16px',
    'gt-md': '24px'
  };

  flexWidth = {
    'lt-sm': 'auto',
    'gt-sm': `calc(50% - ${this.layoutGap['lt-md']}`,
    'gt-md': `calc(50% - ${this.layoutGap['gt-md']}`
  };

  layout: string;

  layoutColumnOnBoxed = 'row';

  isLoading(loading:boolean){
    this.onLoading.emit(loading);
  }

  getType() {
    if (this.item.file) {
      return 'File'
    } else {
      return 'Question'
    }
  }

  getNumItems() {

    if (this.requestForm.controls['itemArray']) {
      const arrayControl = <FormArray>this.requestForm.controls['itemArray'];
      return arrayControl.length;
    } else {
      return 0;
    }

  }

  getItems() {
    return this.requestForm.get('itemArray').value;
  }

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private auth: AuthService,
    private store: Store<fromRoot.State>,
    private cd: ChangeDetectorRef,
    public snackBar: MatSnackBar
  ) {
    console.log("############## bot-creation ############");
    console.log(this.bot);
    this.showProgressBar =  false;

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action , {
      duration: 1700,
    });
  }




  callParent() {
    // this.closeEvent.next();
  }
  saveBot(botName: HTMLInputElement){

  }

  onSubmit() {
    console.log("************** OnSubmit **************")
    this.submitted = true;


    if(this.bot._id != ''){
      console.log("********** Upload **********");
     this.update();
    }else{
      console.log("********** save **********")
     this.save();
    }


  }

  buildForm(bot:Bot): void {
    console.log(bot);
    this.requestForm = this.fb.group({
      'name': [bot.name, [
        Validators.required
      ]
      ],
      'url': [bot.url, [
        Validators.required
      ]
      ],
      itemArray: this.fb.array(bot.itemArray),
      'thanks': [bot.thanks, [
        Validators.required
      ]
      ],
      'active': [bot.active, []],
      '_id':[bot._id,[]]

    });
    this.requestForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  ngOnChanges(){
    console.log("------------ ngOnChanges --------------");
    console.log(this.bot);

    this.buildForm(this.bot);

  }

  ngOnInit(): void {
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.store.select(fromRoot.getLayout).subscribe((layout) => {
      this.layout = layout;

      if (layout === 'gamma') {
        this.layoutColumnOnBoxed = 'column';
      } else {
        this.layoutColumnOnBoxed = 'row';
      }

      this.cd.markForCheck();
    });

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }

    this.item = { name: '', file: false, position: 0 };
    this.buildForm(this.bot);

  }

  update(): void {
    this.showProgressBar = true;
    this.isLoading(true);
    let formValues = this.requestForm.value;
    formValues.createdBy = this.profile.sub.split("|")[1];
    console.log(formValues);
    this.bot = formValues;
    console.log("****** this is the bot updated");
    console.log(this.bot);
    this.appService.updateBot(this.requestForm.value)
      .then(res => {
        console.log("RESPUESTA DEL BACKEND");
        if (res._body != "false") {
          console.log(res);
          this.openSnackBar("Bot was updated successfully", "Update");
          this.botChange.emit(this.bot);
          // setTimeout(() => this.closeForm.emit(true), 1000);


        } else {
          console.log(res);
          this.openSnackBar(res._body, "Update");

        }
        this.showProgressBar = false;
        this.isLoading(false);
      });

  }

  save(): void {
    this.showProgressBar = true;
    this.isLoading(true);
    let formValues = this.requestForm.value;
    formValues.createdBy = this.profile.sub.split("|")[1];
    console.log(formValues);
    this.appService.createBot(this.requestForm.value)
      .then(res => {

        if (res._body != "false") {
          console.log(res);
          this.botChange.emit(this.bot);
          this.openSnackBar("Bot saved", "Save");
          //this.callParent();

          // this.msgSent = true;
          // setTimeout(function() {
          //   this.msgSent = false;
          //   console.log(this.msgSent);
          // }.bind(this), 3000);


        } else {
          console.log(res);
          // this.msgErr = true;
          // setTimeout(function() {
          //   this.msgErr = false;
          // }.bind(this), 3000);

        }
        this.showProgressBar = false;
        this.isLoading(false);
      });

  }

  // buildForm(): void {
  //   this.requestForm = this.fb.group({
  //     'name': ['', [
  //       Validators.required
  //     ]
  //     ],
  //     'url': ['', [
  //       Validators.required
  //     ]
  //     ],
  //     itemArray: this.fb.array([]),
  //     'thanks': ['', [
  //       Validators.required
  //     ]
  //     ],
  //     'active': [true, []]
  //
  //   });
  //   this.requestForm.valueChanges
  //     .subscribe(data => this.onValueChanged(data));
  //   this.onValueChanged(); // (re)set validation messages now
  // }

  initItemField(item: {name: String , file: boolean, position: number }) {
    console.log(item.name);
    //this.item.position = position;
    return this.fb.group({
      name: [item.name, Validators.required],
      file: [item.file, Validators.required],
      position: [item.position, Validators.required]
    });
  }

  clearItem(){
    this.item.name = '';
    this.item.file = false;
    this.item.position = 0;
  }

  addInput(): void {
    const arrayControl = <FormArray>this.requestForm.controls['itemArray'];

    console.log("***************** itemArray ********************")
    console.log(this.requestForm.get('itemArray').value);

    this.item.position = (( this.requestForm.get('itemArray').value).length + 1);

    arrayControl.push(this.initItemField(this.item));

    let arraySorted = this.requestForm.get('itemArray').value;

    arraySorted.sort((a,b): number => {
      if(a.position < b.position ) return -1;
      if(a.position > b.position ) return 1;
      return 0
    })

    this.clearItem();

    console.log(arraySorted);

    console.log(this.requestForm.get('itemArray').value);
  }

  delInput(index: number): void {
    const arrayControl = <FormArray>this.requestForm.controls['itemArray'];
    arrayControl.removeAt(index);
  }

  onValueChanged(data?: any) {
    if (!this.requestForm) { return; }
    const form = this.requestForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  formErrors = {
    'name': '',
    'url': ''
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.'
    },
    'url': {
      'required': 'Url is required.'
    }
  };

}
