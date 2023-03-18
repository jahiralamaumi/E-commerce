const path = require("path");
const { AuthStrategy } = require("./user-authentication.middleware");
const {
    createUser,
    login,
    getUsers,
    updateUser,
    deleteUser,
} = require("./user.controller");
const { createUserSchema, updateUserSchema } = require("./user.schema");
const { validate } = require(path.join(
    process.cwd(),
    "/src/modules/core/middlewares/validate"
));

module.exports = function userRoutes(app) {
    app.route("/users")
        .get(getUsers)
        .post(validate(createUserSchema), createUser)
        .patch(AuthStrategy, validate(updateUserSchema), updateUser);

    app.post("/users/login", login);

    app.route("/users/:email").delete(deleteUser);
};
