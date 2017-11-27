import * as _ from 'lodash';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { AppService } from '../../../app.service';
import { AppSocketService } from '../../../app.socket.service';
import { DialogDataService } from './dialog-data.service';



@Component({
  selector: 'vr-message-form',
  templateUrl: 'message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' },
})



export class MessageComponent implements OnInit {

  public msgSent= false;
  public msgErr= false;
  public isphoneError = false;
  @Input() inputArray: any[];
  @Output() closeEvent = new EventEmitter<string>();
  requestForm: FormGroup;

  submitted = false;
  profile: any;
  phonemsg: string;
  openSnackbar = false;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private socketService: AppSocketService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private dialogDataService: DialogDataService,
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
    this.dialogDataService.currentMessage.subscribe(message => this.phonemsg = message);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }


  save(): void {
    this.appService.setLoading(true);
    if(
      this.requestForm.value.refnumb == '' ||
      this.requestForm.value.email == '' ||
      this.requestForm.value.phone == ''){
      this.appService.setLoading(false);
      return
    }
    if(this.formErrors.refnumb || this.formErrors.email || this.formErrors.phone){
      this.appService.setLoading(false);
      return
    }
    let formValues = this.requestForm.value;
    formValues.createdBy = this.profile.sub.split("|")[1];
    this.appService.createRequest(this.requestForm.value)
      .then(res => {
        let error_str = res._body.slice(26);
        if(res._body.indexOf('not a valid phone number') >= 0 ){
            this.isphoneError = true;
            this.dialogDataService.changeMessage(res._body);
            setTimeout(function(){
              this.isphoneError = false;
            }.bind(this),5000);
            this.phonemsg = res._body;
            this.dialogDataService.changeMessage(res._body);
            this.socketService.sendMessage('newRequest ERROR');
            this.cdr.detectChanges();
            this.appService.setLoading(false);
        }
        else{
          this.phonemsg = '';
          this.openSnackbar = true;
          setTimeout(function(){
            this.openSnackbar = false;
          }.bind(this), 5000);
          this.socketService.sendMessage('new Request from save');
          this.appService.setLoading(false);
          this.cdr.detectChanges();
        }
      });
  }



  buildForm(): void {
    this.requestForm = this.fb.group({
      'refnumb': ['', [
        Validators.required,
        Validators.minLength(7),
        this.validateAN,
      ]
      ],

      'email': ['', [
        Validators.required,
        Validators.pattern(this.EMAIL_REGEX),
      ]
      ],
      'phone': ['', [
        Validators.required,
        Validators.pattern(this.PHONE_REGEX),
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
      infoArray: this.fb.array([this.initInfoField()]),
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

  initInfoField() {
    return this.fb.group({
      info: ['', Validators.required]
    });
  }

  addInput(): void {
    const arrayControl = <FormArray>this.requestForm.controls['docArray'];
    arrayControl.push(this.initDocField());
  }

  addInfoInput(): void {
    const infoArrayControl = <FormArray>this.requestForm.controls['infoArray'];
    infoArrayControl.push(this.initInfoField());
  }


  delInput(index: number): void {
    const arrayControl = <FormArray>this.requestForm.controls['docArray'];
    arrayControl.removeAt(index);
  }

  delInfoInput(index: number): void {
    const infoArrayControl = <FormArray>this.requestForm.controls['infoArray'];
    infoArrayControl.removeAt(index);

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
    'info':'',
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
      'invalid': 'Invalid phone number',
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
    'info':{
      'required': 'Info name is required.'
    },
    'thanks': {
      'required': 'Thank you message is required.'
    }
  };

  //validate reference number is alpha numeric
  validateAN(control: AbstractControl): ValidationErrors | null {
      var letter = /[a-zA-Z]/;
      var number = /[0-9]/;
      var valid = number.test(control.value) && letter.test(control.value)
      if (!valid) {
          return { validateAN: control.value }
      }
        return null
    }

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;




}
