(async function init() {
    try {
        const config = require("./src/config");
        config.initEnvironmentVariables();
        const { sequelize } = require("./src/config/lib/sequelize");
        await sequelize.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
        );
        require("./src/modules/user/user.model");
        await sequelize.sync();
        console.log("DB Seed Completed");
    } catch (err) {
        console.log(err);
    }
})();
