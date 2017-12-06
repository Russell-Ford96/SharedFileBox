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
  botAvatar: string;
  @Input() bot: Bot;
  @Output() botChange = new EventEmitter<Bot>();
  @Output() closeForm = new EventEmitter<boolean>();

   // @Output() onLoading = new EventEmitter<boolean>();
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

  setLoading(loading:boolean){
    //this.onLoading.emit(loading);
    this.appService.setLoading(loading);
    this.cdr.detectChanges();
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
    private cdr: ChangeDetectorRef,
    public snackBar: MatSnackBar
  ) {



  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action , {
      duration: 1700,
    });
  }




  callParent() {
    // this.closeEvent.next();
  }

  onSubmit() {
    this.submitted = true;
    if(this.bot._id != ''){
     this.update();
    }else{
     this.save();
    }


  }

  onSelectAvatar(avatar){
    console.log(avatar);
     this.botAvatar = avatar;
  }

  buildForm(bot:Bot): void {
    console.log("buildForm");
    console.log(bot);
    this.botAvatar = bot.avatar;
    this.requestForm = this.fb.group({
      'name': [bot.name, [
        Validators.required
      ]
      ],
      'url': [bot.url, [
        Validators.required
      ]
      ],
      'description': [bot.description, []
      ],
      'avatar': [bot.avatar, []
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

//    this.buildForm(this.bot);

  }

  ngOnInit(): void {

    this.store.select(fromRoot.getLayout).subscribe((layout) => {
      this.layout = layout;

      if (layout === 'gamma') {
        this.layoutColumnOnBoxed = 'column';
      } else {
        this.layoutColumnOnBoxed = 'row';
      }

      this.cdr.markForCheck();
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
    this.setLoading(true);
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    let formValues = this.requestForm.value;
    formValues.createdBy = this.profile.sub.split("|")[1];
    formValues.avatar = this.botAvatar;
    console.log('this.botAvatar ',this.requestForm.value);
    this.bot = formValues;
    this.appService.updateBot(this.requestForm.value)
      .then(res => {
        if (res._body != "false") {
          this.openSnackBar("Bot was updated successfully", "Update");
          this.botChange.emit(this.bot);

        } else {

          this.openSnackBar(res._body, "Update");

        }
        this.showProgressBar = false;
        this.setLoading(false);
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      });

  }

  save(): void {
    this.setLoading(true);
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    let formValues = this.requestForm.value;
    console.log(formValues);
    formValues.createdBy = this.profile.sub.split("|")[1];
    formValues.avatar = this.botAvatar;
    console.log('this.botAvatar ',this.requestForm.value);
    this.appService.createBot(this.requestForm.value)
      .then(res => {

        if (res._body != "false") {

          this.requestForm.value._id = res._body.split('"').join('');
          this.bot = this.requestForm.value;
          console.log(this.bot);
          this.botChange.emit(this.bot);

          this.openSnackBar("Bot saved", "Save");

          this.buildForm(this.bot);
          this.botChange.emit(this.bot);

        } else {
          console.log(res);
        }
        this.showProgressBar = false;
        this.setLoading(false);
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      });

  }

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

    this.item.position = (( this.requestForm.get('itemArray').value).length + 1);

    arrayControl.push(this.initItemField(this.item));

    let arraySorted = this.requestForm.get('itemArray').value;

    arraySorted.sort((a,b): number => {
      if(a.position < b.position ) return -1;
      if(a.position > b.position ) return 1;
      return 0
    })

    this.clearItem();
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
    'url': '',
    'thanks': ''
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.'
    },
    'url': {
      'required': 'Url is required.'
    },
    'thanks': {
      'required': 'Thanks is required.'
    }
  };

}
