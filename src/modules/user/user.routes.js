const path = require("path");
const { AuthStrategy } = require("./user-authentication.middleware");
const {
    registerUser,
    login,
    getSignedInUserProfile,
    getUsers,
    updateUser,
    deleteUser,
    updatePassword,
    logout,
} = require("./user.controller");
const {
    registerUserSchema,
    loginSchema,
    updateUserSchema,
    updatePasswordSchema,
} = require("./user.schema");
const { validate } = require(path.join(
    process.cwd(),
    "/src/modules/core/middlewares/validate"
));

module.exports = function userRoutes(app) {
    app.route("/register").post(validate(registerUserSchema), registerUser);

    app.route("/login").post(validate(loginSchema), login);

    app.route("/me").get(AuthStrategy, getSignedInUserProfile);

    app.route("/update-user").patch(
        AuthStrategy,
        validate(updateUserSchema),
        updateUser
    );

    app.route("/update-password").patch(
        AuthStrategy,
        validate(updatePasswordSchema),
        updatePassword
    );

    app.route("/logout").post(AuthStrategy, logout);

    // app.route("/token").post(AuthStrategy, generateRefreshToken);

    app.route("/users").get(getUsers);

    app.route("/users/:email").delete(deleteUser);
};
