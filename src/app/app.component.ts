import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
  <ul class='nav navbar-nav'>
    <li><a>Home</a></li>
    <li><a>Product List</a></li>
  </ul>
  `
})

export class AppComponent {
  pageTitle = 'Acme Product Management';
}
