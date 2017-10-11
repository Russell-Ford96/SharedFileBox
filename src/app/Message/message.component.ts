import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'request-form',
  templateUrl: 'message.component.html'
})
export class MessageComponent implements OnInit{

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
      'refnumb':['',[
        Validators.required
      ]
      ],

      'email': ['', [
        Validators.required
      ]
      ],
      'phone': ['', [
        Validators.required
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
      'required': 'Reference Number is required.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'phone': {
      'required': 'Phone is required.'
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

}
