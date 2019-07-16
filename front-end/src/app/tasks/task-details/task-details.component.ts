import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, subTask } from 'src/app/models/task';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() taskDetails: Task;

  @Output() changeCurrentPage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private taskService: TasksService) {
    this.taskDetails = new Task();
  }

  addSubTask() {
    this.taskDetails.subtasks.push(new subTask());
  }

  backToList() {
    this.taskService.updateTask(this.taskDetails._id, this.taskDetails).then((res) => {
      this.changeCurrentPage.emit('taskList');
    }).catch((error) => {
      console.log(error);
      this.changeCurrentPage.emit('taskList');
    });
  }

  deleteTask(taskId) {
    this.taskService.deleteTask(taskId).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    if (!this.taskDetails) {
      return;
    }
  }

}
