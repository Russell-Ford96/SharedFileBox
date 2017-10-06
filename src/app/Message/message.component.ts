import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'request-form',
  templateUrl: 'message.component.html'
})
export class MessageComponent implements OnInit{

  @Input() inputArray: any[];
  @Output() closeEvent = new EventEmitter<string>();

  requestForm: FormGroup;
  myForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) { }

  callParent() {
    this.closeEvent.next();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    this.submitted = true;
    this.save();

  }
  save(): void {
    console.log(this.requestForm.value);
    this.appService.createRequest(this.requestForm.value)
      .then(res => {
        if(res._body != "false") {
          console.log(res);
          this.callParent();
        }
        else {
          console.log(res);
          alert("an error has occured");
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
