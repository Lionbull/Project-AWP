# Project-AWP
This is a forum website as a course project for Advanced Web Applications course.
Student name: Georgy Pokazeev

# Required packages
To install required packages run following command in root folder:
```
npm install
```

In addition to npm packages the user needs to install MongoDB. Default port for MongoDB is 27017 and database name is "testdb". You can also change them in "/server/app.js".

# Used Technologies
- Backend
    - NodeJS
    - MongoDB with Mongoose
    - Express
- Frontend
    - React
    - Material UI

These technologies were presented in our course. Using these technologies gave me an opportunity to seek for help in the course material and previous assignments.

Material UI is very easy to use technology since importing and utilizing components is really straight-forward, and they hae good documentation.

# How to start the website
Here are the terminal commands to start the server and client:
```
npm run dev:server
```
```
npm run dev:client
```
Server is running on port 1234 and client is running on port 3000. So to open the webpage proceed to "localhost:3000" once the server and client are started.

Authentication also require a SECRET token which is provided in .env file in repository (I know it not right to push .env file in repository).

# Features
Logged out user:
 - View main page (posts)
 - View single post page
 - View comments
 - Register an account
 - Login into the account

Logged in user (extends features of logged out user):
 - Create posts
 - Upvote or downvote posts
 - Comment on posts

If user is not authenticated and tries to perform any actions for logged in users, the user will see an alert message with a link to a login page.

# Points
|Feature|Points|
|---|---|
|Basic features with well written documentation|25|
|Translation of the whole UI in two or more languages|2|
|Vote (up or down) posts and comments (only one vote per user)|3|
|Utilization of a frontside framework, such as React|5|
|Hashing the password|1|
|---|---|
|Total|36|

