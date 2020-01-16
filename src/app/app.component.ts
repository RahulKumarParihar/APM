import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
  <nav class = 'nav navbar-expand navbar-light bg-light'>
    <a class = 'nav-brand'>{{pageTitle}}</a>
      <ul class='nav navbar-pills'>
        <li><a class= 'nav-link' [routerLink] = "['/welcome']">Home</a></li>
        <li><a class = 'nav-link' [routerLink] = "['/products']">Product List</a></li>
        <li><a class = 'nav-link' [routerLink] = "['/demoform']">Demo Form</a></li>
    </ul>
  </nav>
  <div class = 'container'>
    <router-outlet></router-outlet>
  </div>
  `
})

export class AppComponent {
  pageTitle = 'Acme Product Management';
}
