const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("../../modules/user/user.routes");
const userStrategy = require("../../modules/user/user.strategy");

module.exports = function () {
    const app = express();
    app.use(express.json());
    app.use(cookieParser(process.env.TOKEN_SECRET));
    app.set("port", process.env["PORT"]);
    userRoutes(app);
    userStrategy();
    return app;
};
