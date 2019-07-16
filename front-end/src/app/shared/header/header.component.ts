import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showToast: boolean;
  dialogRef: MatDialogRef<any, any>;
  toastMessage: { type: any; text: any; };

  constructor(
    public dialog: MatDialog,
    private router: Router) {
  }

  showToastElement(typee, message) {
    this.showToast = true;
    this.toastMessage = { type: typee, text: message };
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  isNotLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return false
    }
    return true;
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(templateRef, { disableClose: true, width: '400px' });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  navigateToChatList() {
    if (this.isLoggedIn) {
      this.router.navigate(['/chat-list']);
    } else {
      this.showToastElement('error', 'Please login to the application first.');
    }
  }

  ngOnInit() {
  }

}