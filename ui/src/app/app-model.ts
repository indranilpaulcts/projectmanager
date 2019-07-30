export class Task {
    taskname: string;
    priority: number;
    priorityTo: number;
    parentid: string;
    startdt: Date;
    enddt: Date;
    status: boolean;
    finished: boolean;
    running: boolean;
    userid: string;
    projectid: string;
    onModel: string;
    olduser: string;
}

export class Project {
    project: string;
    priority: number;
    startdt: Date;
    enddt: Date;
    manager: string;
    finished: boolean;
    totaltask: number;
    oldmanager: string;
}

export class Parent {
    taskname: string;
}

export class User {
    fname: string;
    lname: string;
    empid: string;
}
