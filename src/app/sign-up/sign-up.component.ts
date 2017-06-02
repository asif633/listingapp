import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(private af: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    this.user = af.authState;
  }

  ngOnInit() {
  }

  email: string;
  password: string;
  msg: string;

  signup() {
    this.af.auth.createUserWithEmailAndPassword(this.email, this.password).then(
      res => {
        this.user.subscribe(user => {
          if (user != undefined && user != null) {
            user.sendEmailVerification().then(
              resolve => {
                this.af.auth.signOut();
                location.reload();
                this.router.navigate(['signedup'] , {relativeTo: this.route});
              }
            );
          }
        });
      }
    )
      .catch(error => this.msg = error.message);
  }

  ngOnDestroy() {
    if (this.user != null) {
      this.user.subscribe().unsubscribe();
    }
  }

}
