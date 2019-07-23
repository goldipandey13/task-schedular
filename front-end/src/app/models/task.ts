export class Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    postedBy: string;
    taskTime: number;
    userEmail: string;
    subtasks: any[];
    updated_at: Date;
}

export class SubTask {
    title: string;
    completed: boolean;
}