const jwt = require("jsonwebtoken");

function tokenGenerator(data) {
    return jwt.sign(
        {
            id: data.id,
            email: data.email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "4h", issuer: data.email }
    );
}

function refreshTokenGenerator(data) {
    return jwt.sign({ id: data.id }, process.env.TOKEN_SECRET, {
        issuer: data.email,
    });
}

module.exports.tokenGenerator = tokenGenerator;
module.exports.refreshTokenGenerator = refreshTokenGenerator;
