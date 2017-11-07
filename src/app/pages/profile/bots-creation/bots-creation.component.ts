import { AfterViewInit, Component, ElementRef, OnInit,
         Input, Output, EventEmitter, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'vr-create-bot',
  templateUrl: './bots-creation.component.html',
  styleUrls: ['./bots-creation.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class BotsCreationComponent implements OnInit  {
  public msgSent= false;
  public msgErr= false;
  // @Input() inputArray: any[];
  // @Output() closeEvent = new EventEmitter<string>();

  requestForm: FormGroup;
  myForm: FormGroup;
  submitted = false;
  profile: any;
  bot: any;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private auth: AuthService
  ) { }

  callParent() {
    // this.closeEvent.next();
  }

  onSubmit() {
    console.log("*************************************************************")
    this.submitted = true;
    this.save();

  }

  ngOnInit(): void {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    this.buildForm();
  }

  save(): void {
    let formValues = this.requestForm.value;
    formValues.createdBy = this.profile.sub.split("|")[1];
    console.log(formValues);
    this.appService.createBot(this.requestForm.value)
      .then(res => {
        if(res._body != "false") {
          console.log(res);
          this.callParent();

          this.msgSent = true;
          setTimeout(function () {
            this.msgSent = false;
            console.log(this.msgSent);
          }.bind(this),3000);


        }  else {
          console.log(res);
          this.msgErr = true;
          setTimeout(function () {
            this.msgErr = false;
          }.bind(this),3000);

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
      'active': [ true, [] ]

    });
    this.requestForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
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
