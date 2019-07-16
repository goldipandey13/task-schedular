export class Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    postedBy: string;
    taskTime: number;
    userEmail: string;
    subtasks: subTask[];
}

export class subTask {
    title: string;
    completed: boolean;
}