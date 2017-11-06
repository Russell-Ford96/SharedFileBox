import * as _ from 'lodash';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
import {AppService} from '../../../app.service';


@Component({
  selector: 'vr-message-form',
  templateUrl: 'message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }

})
export class MessageComponent implements OnInit {
  public msgSent= false;
  public msgErr= false;
  @Input() inputArray: any[];
  @Output() closeEvent = new EventEmitter<string>();

  requestForm: FormGroup;
  myForm: FormGroup;
  submitted = false;
  profile: any;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private auth: AuthService
  ) { }

  callParent() {
    this.closeEvent.next();
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

  onSubmit() {
    this.submitted = true;
    this.save();

  }
  save(): void {
    let formValues = this.requestForm.value;
    formValues.createdBy = this.profile.sub.split("|")[1];
    this.appService.createRequest(this.requestForm.value)
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
      'refnumb': ['', [
        Validators.required,
        Validators.minLength(50),
        this.validateAN,
      ]
      ],

      'email': ['', [
        Validators.required,
        this.validateEmail,
      ]
      ],
      'phone': ['', [
        Validators.required,
        this.validatePhone,
      ]
      ],
      'shortmessage': ['', [
        Validators.required
      ]
      ],
      'detailedmessage': ['', [
        Validators.required
      ]
      ],
      docArray: this.fb.array([this.initDocField()]),
      'thanks': ['', [
        Validators.required
      ]
      ],
    });
    this.requestForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  initDocField() {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  addInput(): void {
    const arrayControl = <FormArray>this.requestForm.controls['docArray'];
    arrayControl.push(this.initDocField());
  }

  delInput(index: number): void {
    const arrayControl = <FormArray>this.requestForm.controls['docArray'];
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
    'refnumb': '',
    'email': '',
    'phone': '',
    'shortmessage': '',
    'detailedmessage': '',
    'document': '',
    'thanks': ''
  };
  validationMessages = {
    'refnumb': {
      'required': 'Reference number is required.',
      'minLength': 'Reference number minimun length is 50.',
      'validateAN': ' Must be alpha numeric.'
    },
    'email': {
      'required': 'Email is required.',
      'validateEmail': 'Incorrect email format'
    },
    'phone': {
      'required': 'Phone is required.',
      'validatePhone': 'Incorrect phone number format'
    },
    'shortmessage': {
      'required': 'Short description is required.'
    },
    'detailedmessage': {
      'required': 'Detailed description is required.'
    },
    'document': {
      'required': 'Document name is required.'
    },
    'thanks': {
      'required': 'Thank you message is required.'
    }
  };


validateAN(control: AbstractControl): ValidationErrors | null {
    var letter = /[a-zA-Z]/;
    var number = /[0-9]/;
    var valid = number.test(control.value) && letter.test(control.value)
    if (!valid) {
        return { validateAN: control.value }
    }
      return null
  }

validateEmail(control: AbstractControl): ValidationErrors | null {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!(re.test(control.value))){
        return { validateEmail: control.value }
    }
    return null
  }

validatePhone(control: AbstractControl): ValidationErrors | null {
    var re = /\d?(\s?|-?|\+?|\.?)((\(\d{1,4}\))|(\d{1,3})|\s?)(\s?|-?|\.?)((\(\d{1,3}\))|(\d{1,3})|\s?)(\s?|-?|\.?)((\(\d{1,3}\))|(\d{1,3})|\s?)(\s?|-?|\.?)\d{3}(-|\.|\s)\d{4}/;
    if(!(re.test(control.value))){
        return { validatePhone: control.value }
    }
    return null
}


}
