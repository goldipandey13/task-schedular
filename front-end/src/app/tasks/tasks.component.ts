import { Component, OnInit, TemplateRef } from '@angular/core';
import { TasksService } from './task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  currentPage: any;
  taskDetails: Task;
  hoverOnIcon: boolean;

  constructor(private taskService: TasksService) {
    this.tasks = [];
    this.currentPage = 'taskList';
    this.taskDetails = new Task();
  }

  changeCurrentPage(event) {
    this.currentPage = event;
  }

  openDetails(task) {
    this.taskDetails = task;
    this.currentPage = 'taskDetails'
  }

  addNewTask() {
    this.tasks.unshift(new Task());
  }

  completeTask(task: Task) {
    task.completed = true;
    this.updateTask(task._id, task);
  }

  updateTask(id, task) {
    this.taskService.updateTask(id, task).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }

  saveNewTask(task) {
    if (task._id) {
      this.updateTask(task._id, task);
    } else {
      this.taskService.createTask(task).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  getALLTasks() {
    this.taskService.getAllTasks().then((res) => {
      console.log(res);
      this.tasks = res;
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getALLTasks();
  }

}
