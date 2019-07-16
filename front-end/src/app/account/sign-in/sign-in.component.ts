import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User;
  loggedIn: boolean;
  showToast: boolean;
  toastMessage: { type: any; text: any; };

  constructor(private accountService: AccountService, private router: Router) {
    this.user = new User();
    this.loggedIn = false;
  }

  showToastElement(typee, message) {
    this.showToast = true;
    this.toastMessage = { type: typee, text: message };
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  signIn(isFormValid) {
    if (isFormValid) {
      this.accountService.signIn(this.user).then((res) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            this.loggedIn = false;
            this.router.navigate([`/tasks`]);
          }, 3000);
          this.showToastElement('success', 'You are successfully logged in');
        } else {
          this.showToastElement('error', res.errorMsg)
        }
      }).catch((error) => {
        console.log(error);
        this.showToastElement('error', error);
      });
    }
  }

  ngOnInit() {
    localStorage.clear();
  }

}
