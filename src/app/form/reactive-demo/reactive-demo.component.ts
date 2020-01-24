import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reactive-demo',
  templateUrl: './reactive-demo.component.html',
  styleUrls: ['./reactive-demo.component.css']
})
export class ReactiveDemoComponent implements OnInit {
  customer = new Customer();

  constructor() { }

  ngOnInit() { }

  save(customerForm: NgForm) {
    console.log(customerForm.form);
    console.log('Saved: ' + customerForm.value);
  }

}
