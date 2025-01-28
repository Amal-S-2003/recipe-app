import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-contact',
    imports: [HeaderComponent, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent {
  demoMail: string = "flavourfusion@gmail.com"
  testimonyForm: FormGroup

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.testimonyForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      email: ["", [Validators.required, Validators.email]],
      message: ["", [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    })
  }
  submitTestimony(){
    if (this.testimonyForm.valid) {
      const name=this.testimonyForm.value.name
      const email=this.testimonyForm.value.email
      const message=this.testimonyForm.value.message
      // api call
      this.api.addTestimonyAPI({name,email,message}).subscribe((res:any)=>{
        this.testimonyForm.reset()
      })
    } else {
      alert("Invalid Form")
    }
  }

}
