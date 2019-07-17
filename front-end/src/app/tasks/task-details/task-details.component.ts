import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TasksService } from '../task.service';

import { NgbDatepickerConfig, NgbDate, NgbModal, NgbModalOptions, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  providers: [NgbDatepickerConfig]
})
export class TaskDetailsComponent implements OnInit {
  @Input() taskDetails: Task;
  triggerDateAndTime: any;

  @Output() changeCurrentPage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private taskService: TasksService) {
    this.taskDetails = new Task();
  }

  addSubTask() {
    const subtask = {
      title: '',
      completed: false
    }
    this.taskDetails.subtasks.push(subtask);
  }

  backToList() {
    this.taskService.updateTask(this.taskDetails._id, this.taskDetails).then((res) => {
      this.changeCurrentPage.emit('taskList');
    }).catch((error) => {
      console.log(error);
      this.changeCurrentPage.emit('taskList');
    });
  }

  updateTriggerDateAndTime() {
    this.taskDetails.taskTime = new Date(this.triggerDateAndTime).getTime();
  }

  deleteTask(taskId) {
    this.taskService.deleteTask(taskId).then((res) => {
      this.changeCurrentPage.emit('taskList');
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    if (!this.taskDetails) {
      return;
    }

    this.triggerDateAndTime = new Date(this.taskDetails.taskTime);
  }

}
