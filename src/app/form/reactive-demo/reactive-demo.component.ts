import { Component, OnInit } from "@angular/core";
import { Customer } from "../customer";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";
import { debounceTime } from "rxjs/operators";

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get("email");
  const confirmEmailControl = c.get("confirmEmail");

  if (emailControl.pristine || confirmEmailControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmEmailControl.value) {
    return null;
  }
  return { match: true };
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}
@Component({
  selector: "app-reactive-demo",
  templateUrl: "./reactive-demo.component.html",
  styleUrls: ["./reactive-demo.component.css"],
})
export class ReactiveDemoComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  private validationMsg = {
    required: "Please enter your confirm email address.",
    email: "Please enter a valid email address.",
    match: "Email and confirm email don't match.",
  };

  public validationMessage = {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    notification: "",
    rating: "",
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group(
        {
          email: ["", [Validators.required, Validators.email]],
          confirmEmail: ["", Validators.required],
        },
        { validators: emailMatcher }
      ),
      phone: "",
      notification: "email",
      rating: [null, ratingRange(1, 5)],
      sendCatalog: false,
    });

    this.customerForm
      .get("notification")
      .valueChanges.subscribe((value) => this.setNotification(value));

    const emailControl = this.customerForm.get("emailGroup.email");
    emailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(
        (value) =>
          (this.validationMessage.email = this.setMessages(
            emailControl,
            this.validationMessage.email
          ))
      );
  }

  save() {
    console.log(this.customerForm);
    console.log("Saved: " + this.customerForm.value);
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get("phone");
    if (notifyVia === "text") {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setMessages(c: AbstractControl, message: string): string {
    message = "";
    if ((c.touched || c.dirty) && c.errors) {
      message = Object.keys(c.errors)
        .map((key) => (message += this.validationMsg[key]))
        .join(" ");
    }
    return message;
  }
}
