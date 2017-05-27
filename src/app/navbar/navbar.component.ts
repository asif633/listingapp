import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authServ: AuthenticationService, private router: Router) { }
  
  user: Observable<firebase.User>;

  ngOnInit() {
    this.user = this.authServ.authUser();
  }

  signout() {
    this.authServ.logout().then(onResolve => this.router.navigate(['/']));
  }

}
