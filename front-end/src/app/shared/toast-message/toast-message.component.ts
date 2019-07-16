import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

export interface Messages {
  type: string;
  text: string;
}

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html'
})

export class ToastMessagesComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input()
  message: Messages;

  @ViewChild('messagee') messagee: TemplateRef<any>;

  constructor(public snackBar: MatSnackBar) {

  }

  openSnacBar() {
    this.snackBar.openFromTemplate(this.messagee, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [this.getMessageColor()]
    });
  }

  getMessageColor() {
    return (this.message.type === 'success') ? 'bg-success' : 'bg-danger';
  }


  ngOnInit() {
    setTimeout(() => {
      this.openSnacBar();
    });
  }

}
