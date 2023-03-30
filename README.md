# e-commerce

### 0.0.9 - 23

-   password encryption with bcrypt,
-   login with password & email comparing with bcrypt,
-   token generate during login and set to user,
-   update data after authentication with token,

### 0.1.0 [jwt, cookie parser] -24

-   [login.js] - create token using jwt
-   send token to cookie with cookie parser
    -   [express.js] - use cookieParser to the app using app.use();

### 0.1.0 [passport, passport-jwt] -25

-   [user.strategy.js] - create user strategy using passport-jwt
-   send token to cookie with cookie parser
    -   [user-auth.middleware.js] - Authstrategy to authenticate user using user strategy

### 0.1.0 [glob, lodash] -26

-   delete authenticate.js

-   routes & strategy gula jeno dynamically amader application bujhte pare sei bebostha korbo

    -   [config/index.js]
    -   paste code from fb in
    -   npm i glob lodash ( underscore very populoar),
    -   require \_ , glob
    -   \*_/_ hocche glob er terms
    -   src -> config -> assets -> default.js
        -   dynamic routes, strategies array value added [hat e hat e route declare korlam na..]
    -   ekta fn [getGlobalConfig] define jeta default theke routes, strategies niye getGlobbedpath() dara use hoye ekta object e wrap kore object k return kore [getGlobbedpath() routes & strategy er all path k array akare return kore]
    -   then express.js e userRoutes(app) & userStrategy() ke dyanmically call kora holo for all the routes[not only user]

-   db work
    -   xampp [mysql- db - ecommerce]
    -   install ORM- Object Relational Mapping library npm package sequelize for mysql [ODM- Object Document Model Mongoose for mongoDB]
    -   npm i sequelize - Sequelize provides an abstraction layer between your application and the database, which means you can interact with the database using JavaScript objects instead of writing SQL queries directly.
    -   npm i mysql2 - To set up a connection to a MySQL database using the Sequelize library
    -   src -> config -> lib -> sequelize.js
        -   Set up a connection to a MySQL database using the Sequelize library for Node.js.
    -   src -> modules -> user -> user.model.js
        -   This code exports a Sequelize model named User representing a database table called users. The table has columns named id, firstName, lastName, email, and password. The User model is defined using Sequelize's define() method
        -   now import User to controller to create user using promise
    -   src -> modules -> user -> user.controller.js
        -   refactor createUser using sequelize and mysql2 using User class er findOne and create method in async-await way
