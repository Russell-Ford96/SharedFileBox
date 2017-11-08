import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit,
  Input, Output, EventEmitter, ViewChild
} from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { AppService } from '../../../app.service';
import * as fromRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';


@Component({
  selector: 'vr-create-bot',
  templateUrl: './bots-creation.component.html',
  styleUrls: ['./bots-creation.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotsCreationComponent implements OnInit {
  public msgSent = false;
  public msgErr = false;
  // @Input() inputArray: any[];
  // @Output() closeEvent = new EventEmitter<string>();

  requestForm: FormGroup;
  myForm: FormGroup;
  submitted = false;
  profile: any;
  bot: any;
  items: any[];
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
    private cd: ChangeDetectorRef
  ) {
  }



  callParent() {
    // this.closeEvent.next();
  }


  onSubmit() {
    console.log("*************************************************************")
    this.submitted = true;
    this.save();

  }

  ngOnInit(): void {
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
    this.buildForm();

  }

  save(): void {
    let formValues = this.requestForm.value;
    formValues.createdBy = this.profile.sub.split("|")[1];
    console.log(formValues);
    this.appService.createBot(this.requestForm.value)
      .then(res => {
        if (res._body != "false") {
          console.log(res);
          this.callParent();

          this.msgSent = true;
          setTimeout(function() {
            this.msgSent = false;
            console.log(this.msgSent);
          }.bind(this), 3000);


        } else {
          console.log(res);
          this.msgErr = true;
          setTimeout(function() {
            this.msgErr = false;
          }.bind(this), 3000);

        }
      });
  }

  buildForm(): void {
    this.requestForm = this.fb.group({
      'name': ['', [
        Validators.required
      ]
      ],
      'url': ['', [
        Validators.required
      ]
      ],
      itemArray: this.fb.array([]),
      'thanks': ['', [
        Validators.required
      ]
      ],
      'active': [true, []]

    });
    this.requestForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
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
