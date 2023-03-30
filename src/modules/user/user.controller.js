const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = [];
const User = require("./user.model.js");

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } =
            req.body;

        const existUser = await User.findOne({ where: { email: email } });

        if (existUser) return res.status(400).send("User Already Exists");

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

function login(req, res) {
    const { email, password } = req.body;

    const user = users.find(
        (user) =>
            email === user.email && bcrypt.compareSync(password, user.password)
    );

    const token = jwt.sign(
        {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h", issuer: user.email }
    );

    if (!user) return res.status(400).send("Incorrect credentials");

    res.cookie("access_token", token, {
        httpOnly: true,
    });

    const modifiedUser = { ...user };
    delete modifiedUser.password;

    res.status(201).send(modifiedUser);
}

function findUser(email) {
    return users.find((user) => email === user.email);
}

function getUsers(req, res) {
    console.log(users);
    res.status(201).send(users);
}

const updateUser = (req, res) => {
    const { firstName, lastName } = req.body;
    const email = req.user.email;

    const user = users.find((user) => user.email === email);

    if (!user) return res.status(400).send("User not found!");

    user.firstName = firstName;
    user.lastName = lastName;
    const modifiedUser = { ...user };

    delete modifiedUser.password;

    res.status(201).send(modifiedUser);
};

const deleteUser = (req, res) => {
    const email = req.params.email;
    const user = users.find((user) => user.email === email);

    if (!user) return res.status(400).send("User not found");

    const userIndex = users.findIndex((user) => user.email === email);
    const deletedUser = users.splice(userIndex, 1);
    res.status(201).send(deletedUser);
};

module.exports.createUser = createUser;
module.exports.login = login;
module.exports.findUser = findUser;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
