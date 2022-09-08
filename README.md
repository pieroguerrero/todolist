
# Todolist
> Lightweight To-do management web app. 
> Live demo [_here_](https://pieroguerrero.github.io/todolist/).

## Table of Contents
* [General Info](#general-information)
* [Technologies and Techniques used](#technologies-and-techniques-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)

## General Information
- This project is the MVP version of [Todoist.com](https://todoist.com/)'s To-Do app.
- Information is stored in the Local Storage, there is a separate branch being worked with the Firebase BAAS.

## Technologies and Techniques used
### Planning and Design:
- The planning was done with the [User Story Mapping](https://www.visual-paradigm.com/guide/agile-software-development/what-is-user-story-mapping/) technique.
- The web app architecture is Layared, you can find the [Package Diagram here](https://drive.google.com/file/d/1PuHGRuayaBVpBX9sLB-SgivhDx4Xd1Sl/view).
- The Class Diagram designed for this web app is [here](https://drive.google.com/file/d/1WIJ_nVVN-KQALMpElAHlSivR7jujEkLV/view?usp=sharing).
- The UI was implemented matching the [todoist.com](https://todoist.com/) UI shapes and colors from scratch:

<p align="center"><BR> <img src="https://user-images.githubusercontent.com/26049605/189152867-1ed1224f-86f4-4728-9ee8-bc45310ddb0a.png" width="600px" height="auto" alt="TailwindUI template" title="Click to enlarge"> </p>


### Front-end:
- Vanilla Javascript.
- Internal application state managed 100% with [Clousures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).
- CSS design with [Tailwind CSS](https://tailwindcss.com/). 
- The web app is 100% responsive.

### Back-end:
- This web app has no backend for now. 
- Due to the type of information is handled, all the information is stored in the [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

### Testing:
- Manual Testing was done with ~80% coverage.
- While testing, the project was run using the Chrome's Development Tools "Fast 3G" and "No Caching" options. So the app is ready for slow internet connections.

## Features

- Create Projects ✔
- Create, Modify and Remove Tasks ✔
- Mask Tasks as Done ✔
- Create, Modify and Remove SubTasks ✔
- Create, Modify and Remove Notes ✔
- Filter Tasks by Project ✔
- Filter Tasks by Dates ✔
- Enable Tasks Expiration notifications 🔜
- Store data in the Cloud 🔜
- Sign-up and Log-in 🔜
- Assign Tasks to other user 🔜

## Screenshots
Click an image to enlarge.

| Dashboard | Dashboard responsive | Task Edit |
| ------------ | -------------- | ------------- |
| <img src="https://user-images.githubusercontent.com/26049605/189159223-0af42ab9-7ac9-4464-b531-937d78e6268e.png" width="370px" height="auto" alt="Tasks Dashboard" title="Click to enlarge">   | <img src="https://user-images.githubusercontent.com/26049605/189159554-4d2fd3e7-5523-4649-8ebc-45cf03774cab.png" width="200px" height="auto" alt="Tasks Dashboard" title="Click to enlarge">     | <img src="https://user-images.githubusercontent.com/26049605/189159781-fe6f236e-37e6-42e6-a793-905e78987dfc.png" width="200px" height="auto" alt="Editing Task" title="Click to enlarge">    |

## Setup
Clone this project by doing:
```
$ git clone https://github.com/pieroguerrero/todolist.git
```
Then go to the folder you cloned the code and execure:
```
$ npm install
```
**WARNING:** If you are going to use other libraries to achieve other purposes be carefull and remove the caret (^) prefix that the dependency versions have.

## Project Status
Project is: _in progress_

## Room for Improvement
There are always room for improvement, in this project so far the thinkgs that can be improved are:
- Enable back-end APIs so the user can store information in the Cloud or enable a BAAS such as Firebase.
- Implement automated Unit Testing.
- Migrate to a Javascript framework in order to increase the maintainability for future changes.
