# Numeric Calculator

A simple numeric calculator using AngularJS. A command design pattern is used while developing a calculator. It will maintain order of operations by allowing undoing last executed operations.

### Installation instructions

First install nodejs with npm from [https://nodejs.org/](https://nodejs.org/).

Next make sure Gulp is globally installed, by running:

    npm install -g gulp

After cloning the project, run the following commands in the project directory:

    npm install
    gulp
    gulp dev
    
This will start the development server, the Calculator app should be available at the following url:

[http://localhost:8000/dist/index.html](http://localhost:8000/dist/index.html)

### Running the tests

To run unit tests, execute the following command in the project directory:

    gulp test
    
### Frameworks/Dependency
* AngularJS 1.3
* Bootstrap 3 for UI
* Karma-Jasmine for Unit tests
* Gulp build system

### Author

* **Harshit Shah**

### Reference
* Command design pattern [https://en.wikipedia.org/wiki/Command_pattern](https://en.wikipedia.org/wiki/Command_pattern)

### Application working screens
![1](https://github.com/harshitshah436/numeric-calculator/blob/master/working_snaps/app1.png)
![2](https://github.com/harshitshah436/numeric-calculator/blob/master/working_snaps/app2.png)
