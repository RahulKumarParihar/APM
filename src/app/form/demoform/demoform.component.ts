import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './demoform.component.html',
  styleUrls: ['./demoform.component.css'],
})
export class DemoformComponent implements OnInit {
  customer = new Customer();

  constructor() {}

  ngOnInit() {}

  save(customerForm: NgForm) {
    console.log(customerForm.form);
    console.log('Saved: ' + customerForm.value);
  }
}
