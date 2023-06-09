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
        -   refactor all the controller using async-await

-   Implement user Services - login

    -   user -> service -> user.service.js

        -   implement token generator & refresh token generator

            -   A refresh token is needed to provide a way to renew an access token once it has expired. Access tokens are typically short-lived and have an expiration time. When an access token expires, the user needs to authenticate again to obtain a new access token. This can be inconvenient for the user, so a refresh token can be used to obtain a new access token without requiring the user to authenticate again.

            The refresh token is a longer-lived token that can be used to obtain a new access token. When the access token expires, the user can use the refresh token to obtain a new access token without having to enter their login credentials again. The refresh token is typically stored securely on the client-side and is only sent to the server when a new access token is needed.

        -   create login schema with email & password

-   Implement register User or Signup user - registerUser (prev- createUser) - route(/register, post)

    -   registerUserSchema -> validate -> createUser

-   Implement get User Profile or Signed in user - getSignedInUserProfile - route(/me, get)

    -   getSignedInUserProfile -> AuthStrategy -> getSignedInUserProfile

-   Change or Update Password - route(/update-password, post)
    -   create updatePassword schema
    -   authenticate with AuthStrategy, validate with updatePassword schema, refer to updatePassword
-   Implement update User - route(/update-user, post)
    -   updateUser schema, authenticate, updateUser controller
-   forget password
-   email sending

### Service Management - modules/service

-   create db model for Service - service.model.js
-   add some services from seeder using bulkCreate
-   add Routes
    -   /services - getServices - to get all the services as super admin through authorization
    -   /services/:id - getService - to get single service using id param
-   add controllers

### Forget Password/ RESET password

The philosophy behind the reset password mechanism is to provide users with a secure and reliable way to regain access to their accounts in case they forget their passwords. The reset password mechanism typically involves a series of steps that authenticate the user's identity and allow them to reset their password.

The process typically involves the following steps:

1. The user requests a password reset via an email or SMS message.
2. The system generates a unique, time-limited reset token and sends it to the user's registered email or phone number.
3. The user clicks on the reset link or enters the reset token in the provided form.
4. The system validates the reset token and confirms the user's identity.
5. The user is prompted to enter a new password.
6. The system verifies the new password meets the required security standards and updates the user's account with the new password.
7. The reset password mechanism should be designed with security in mind, using strong encryption and hashing algorithms to store and transmit sensitive data. The reset token should be generated using a cryptographically secure random number generator, and it should be time-limited to prevent brute-force attacks. The system should also implement rate-limiting and other security measures to prevent abuse and protect against account hijacking.

-   add columns in user table to store resetToken & resetTokenExpiry
-   define a resetToken Generator method in User class model er prototype
-   Create a new post route for resetting password (/reset-password) & attach a controller reference - resetPassword
-   [user.controller.js]

    -   user will send request with his registered email
    -   system will query the user from db using sequelize User model
    -   check the existance of the user
    -   if valid user, then a method (generateResetToken) should be in this users classes prototype, invoke it to generate a token -> method will add the token to db's column also return the token -> save the user in db
    -   use the token to create resetUrl
    -   send the url to users registered email using nodeMailer service

    #### Send Email Mechanism

    -   [user.service.js] - define an async fn (sendPasswordResetEmail( email, reseturl ) - The sendPasswordResetEmail function might contain some asynchronous operations, such as sending an email using a third-party email service like Nodemailer. By making the function async, you can use the await keyword to wait for these asynchronous operations to complete before moving on to the next line of code. This helps ensure that the email is sent successfully and any errors are properly handled.)

        -   Create a transporter object using the nodemailer library. The transporter object is used to send emails using the email provider's SMTP server.
            In this particular example, the transporter is created with the following options:
            service: set to "Gmail", which specifies the email provider to use. In this case, it's Gmail. Other options can be used depending on the email provider being used.
            auth: an object containing the email address and password for the account being used to send emails. These credentials are used to authenticate the email provider's SMTP server before sending the email.

        -   Set up the email options that will be used to send the password reset link to the user. It specifies the sender's email address, the recipient's email address (which is passed as an argument to the function), the subject of the email, and the HTML content of the email. The HTML content includes a link to the password reset URL, which is constructed using the resetUrl parameter passed to the function.
        -   This code sends the email using Nodemailer's transporter.sendMail() method. It takes in the mailOptions object containing the email details such as sender, recipient, subject, and message body. The sendMail() method also takes in a callback function that gets called after the email is sent.

            -   If there's an error in sending the email, it will be logged to the console. Otherwise, it will log a success message with the response information. - When sending an email using Nodemailer, the info object returned in the callback function will contain various properties, some of which are:
                messageId: the unique message ID generated by the email server
                response: the full response received from the email server
                accepted: an array of email addresses that were successfully accepted for delivery
                rejected: an array of email addresses that were rejected by the email server
                pending: an array of email addresses that are still pending delivery
                The exact properties and values of the info object may vary depending on the email service provider used and the specific configuration of the email sending process.
            -   the email server is the Gmail SMTP server as specified in the nodemailer transporter configuration - When sending an email with nodemailer, the possible values of the err parameter in the callback function are:
            -   If the email was sent successfully, err will be null or undefined.
                If there was an error sending the email, err will be an object containing information about the error. For example, if the SMTP server is not responding, the error might be a timeout error.
                If authentication to the SMTP server failed, the error will typically include an error code and a message indicating that authentication failed.
                If there was a problem with the email content or recipients, such as an invalid email address, the error might indicate the problem with the email content.
            -   [
                Error: Invalid login: 534-5.7.9 Application-specific password required. this error is sending
                This error occurs when you're using your regular Gmail password to authenticate with nodemailer, which may not be allowed for some accounts that have two-factor authentication enabled.

                To fix this error, you need to generate an application-specific password from your Google account settings, and use it in your nodemailer configuration instead of your regular Gmail password.

                Here's how to generate an application-specific password:

                Go to your Google account settings page: https://myaccount.google.com/security
                Under "Signing in to Google", select "App passwords"
                Select "Mail" as the app, and "Other (custom name)" as the device
                Enter a name for your custom password (e.g. "NodeMailer"), and click "Generate"
                You will be presented with a password that you can use in your nodemailer configuration.
                Replace the EMAIL_PASSWORD in your nodemailer configuration with the application-specific password you generated, and try running your code again. This should resolve the "Invalid login: 534-5.7.9 Application-specific password required." error.
                ]

    -   export the fn & return to [user.controller.js]
    -   invoke in await way sendPasswordResetEmail with user.email and resetUrl
    -   send status that email sent.

    ### Handle reset password

    -   Handle the reset password link: When the user clicks on the link, validate the reset token and check if it is still valid (i.e., has not expired). If the token is valid, allow the user to reset their password.
        Update the password: When the user resets their password, update the password in the database and delete the reset token from the database.
    -   create post route(/reset-password/:token) -> create schema for new passwords -> add validate middleware & controller
    -   define a method to check validation of reset token if expired or not in User.prototype - isResetTokenValid
    -   destructure token from req params
    -   destructure newPassword and confirmNewpass from req body
    -   query the user where: { resetToken: token }
    -   check existance of the user or validation of the resetToken using isResetTokenValid method with user.resetTokenExpiry param
    -   replace password value with the new password -> nullify user.resetToken

### Refresh Token Generator for getting new access token to Extend session

-   httpOnly: true

*   Setting httpOnly: true for cookies is a security best practice. When this option is enabled, the cookie cannot be accessed by client-side scripts such as JavaScript. This helps to protect against certain types of attacks, such as cross-site scripting (XSS) attacks, where an attacker could potentially steal the user's session cookie and impersonate them on the website.
    By making the cookie httpOnly, it can only be accessed by the server, which reduces the risk of session hijacking and other malicious attacks.
    ? const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    A. These lines of code are used to extract the access token from the Authorization header in the HTTP request.

    In the authHeader variable, we first extract the Authorization header using req.headers['authorization']. This header should contain the access token, which is sent by the client as part of the request.

    Then we use the && operator to check if authHeader is not null or undefined. If it is, then token is set to null. If it is not null or undefined, then we split the Authorization header into an array using the split() method, and take the second element of the array which should contain the actual access token.

    The extracted access token can then be used for further processing or validation.
    ?

-   [/user/service/user.service.js]

    -   define a fn to generate a refresh token - [refreshTokenGenerator]
    -   define a fn to set tokens to cookies - [setTokencookies]

-   [/user/user.model.js]

    -   define a db model to store refresh token in database

-   [/user/user.controller.js]

    -   [login] generate accesstoken and refreshtoken and save in db also send in frontend cookies
    -   [handleRefreshTokenReq] destructure refreshToken from req.body, verify and generate new access token

-   [/user/user.routes.js]
    -   [/refresh-token] post
