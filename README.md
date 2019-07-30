# Project Manager

This the FSE Final Assessment Project for Cognizant, given by IIHT. I have used  **MongoDb - Express - Angular - NodeJS** combiation as this is a **MEAN** Stack FSE course.


## Getting Started

The project is divided in to two folders:

    1) ui -> Includes the Angular UI codes
    2) middleware -> Includes the backend API implemented using by NodeJS 


### Prerequisites

    Angular CLI: 8.0.4
    Node: 10.15.3
    MongoDB: v3.4.2


### Business-Requirement: 

    The  Project  Manager  Single  Page  Application allows  you  to  manage  projects  and their  respective tasks. It allows you to set priorities to each project and task. You can associate one manager to each project and  task-owner for  each task. Each task will have parent task, start date, end date and task owner.

    Below are the features of Project Manager:

    1) Add/Edit/View/Delete User.
    2) Add/Edit/View/Delete Project.
    3) Add/Edit/View/Delete Task.
    4) You can make one task a parent of another task. 
    5) On view task screen:
        a. User can search tasks by project name and sort by start date, end date or completed status.
        b. User can edit task.
        c. User can end the task once it is finished. Once ended, user cannot edit the task. User can only view the task once finished.


### Other Libraries
```
Angular:-
1) bootstrap: 4.3.1
2) font-awesome: 4.7.0

NodeJS:-
1) mongoose: 5.6.2
2) winston: 3.2.1
3) gulp: 4.0.2
4) nodemon: 1.19.1
```

### Installing

Clone this repository and install required softwares. The dependencies will be installed using the **npm install** command. Then launch the UI & Middlware separately.


#### Commands to launch UI
```
cd ui
npm install
ng serve --open
```

#### Commands to launch MIDDLEWARE
```
cd middleware
npm install
node server.js
```

#### Commands to launch MONGODB
```
cd C:\Program Files\MongoDB\Server\3.4\bin
mongod
```

## Log 
Two log files will be generated at **.\\middleware\logs\\** folder

    1) app.log
    2) error.log

## Built With

* [Angular](https://angular.io/) - The UI framework
* [NodeJS](https://nodejs.org/en/) - The middleware
* [MongoDB](https://www.mongodb.com/) - Database


## Build

* [Jenkins](http://localhost:8080/job/projectmanager/) - The jenkins project to generate build 


## Versioning

We use [GIT](https://github.com/) for versioning. For the versions available, see the [fseproject](https://github.com/indranilpaulcts/projectmanager). 


## Authors

* **Indranil Paul** - *Cognizant* - [indranilpaulcts](https://github.com/indranilpaulcts)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* IIHT Team
* Cognizant
