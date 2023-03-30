const path = require("path");
const { DataTypes } = require("sequelize");
const { sequelize } = require(path.join(
    process.cwd(),
    "/src/config/lib/sequelize"
));
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        set(value) {
            this.setDataValue("email", value.toLowerCase());
        },
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue("password", bcrypt.hashSync(value, 8));
        },
    },
});

User.prototype.validPassword = function () {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;
