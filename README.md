## Ostratum

<p align="center">
  <img src="https://github.com/SerQuicky/ostratum-translation-manager/blob/master/ostratum-client/src/assets/images/ostratum_logo_2.png" width="450">  
</p>


**Ostratum** is a web-based application that supports developers to manage their app translations.

The application at Version 1.0.0 contains the following features:
* Sign-in and -out with jwt based session context
* In-depth project translation handling (Project - Translation Project - Translation)
* Currently support *.json* format for the translation keys
* Import and Merge of existing json files
* Easy processing of the translation keys with filters and key-iterating
* Download the whole translation project as a zip
* Choose your design (light- and dark-mode)
* Management of the users *(Administration feature)* 
* Management of the supported languages *(Administration feature)* 
* It is completely free :)

## Documentation

An extensive documentation about the functionalities of the application and its features can be found under: [Gitbook Documentation](https://michael-frank96.gitbook.io/ostratum/)

## How to run the application? 

Start the NodeJS-TypeScript server by the following command (In the server directory). The command also takes parameters to init a sample database. If you want to test the application execute the programm with the param *example (creates an extentisive database)* or *basic (creates a database with just the admin account)*.

```
npm install

npm run start [param]
```

Start the web application in the development mode by the command (In the client directory). A production docker image will be created in the future (Version 2.0.0)

```
npm install

ng serve
```


## Run tests

Some extensive user-interface tests and some unit test are implemented. For the user-interface, because of my personal preference, the library cypress is used. 
The user-interface can be execute by switching in the *cypress-test* directory and the execution of the command.

```
npm install

./node_modules/.bin/cypress open
```

The unit tests (currently only one service, because the other component are pretty trivial) can be started through the following command (switch to the angular client first): 

```
ng test
```

## Support this project

Any feature, pull-request or opened issue is greatly appreciated. :)

Feel free to contribute to the project, if you have any problems or question you can an issue or contact me under the mail adress michael.frank1996@gmail.com

## Screenshots

<p align="center">
  <img src="https://github.com/SerQuicky/ostratum-translation-manager/blob/master/resources/projects.png">  
</p>

<p align="center">
  <img src="https://github.com/SerQuicky/ostratum-translation-manager/blob/master/resources/translation2.png">  
</p>

<p align="center">
  <img src="https://github.com/SerQuicky/ostratum-translation-manager/blob/master/resources/translations1.png">  
</p>

<p align="center">
  <img src="https://github.com/SerQuicky/ostratum-translation-manager/blob/master/resources/modal1.png">  
</p>

<p align="center">
  <img src="https://github.com/SerQuicky/ostratum-translation-manager/blob/master/resources/modal2.png">  
</p>
