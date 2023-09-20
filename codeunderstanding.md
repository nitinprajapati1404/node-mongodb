## QUICKSTART

This Project is build with Nodejs Express framework and used MongoDB as a Database

This Project consists of Following Folders 
    config - having envirement variables & Database configuration file
    controllers - having  Files of all APIs
        - studentDean.controller.js - contains all the APIs of student, dean and sessions
        - utility.controller.js - Generate Predefined Sessions of Dean
    helper - having common methods which can be used at multiple places
        - logger.helper.js - Use for print the debug logs
    modals - Databse model files
    policies - This Folder consists middlware of APis
        - doSanitiz.js - This middleware is use for check request parameter validations
        - isAuthenticated.js - This middleware is use for check authenticate API 
    routes - This folder consists of all routes of Application
    schema - This folder contains the req sanitization object
    app.js - This is first file which is going to be executed to run applicaiton 
    package.json - This file consists of information of application and also listed all required packages

## APIs Understanding
    Kindly please check controllers files for understaind of each function

## Export Data
    mongodump -d <db-name> -o <path>
    ex . mongodump -d testdb -o /opt/testappwithmongo/

NOTE : testdb/ folder consists of final data after all operations!    