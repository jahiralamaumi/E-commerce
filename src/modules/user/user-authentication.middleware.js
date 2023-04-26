const passport = require("passport");

function AuthStrategy(req, res, next) {
    const auth = passport.authenticate("user-jwt", function (err, user) {
        if (err)
            return res.status(500).send("Internal Server Error from strat");

        if (!user) return res.status(401).send("Authentication Invalid");

        req.logIn(user, { session: false }, function (err) {
            if (err) return next(err);

            req.user = user;

            next();
        });
    });

    auth(req, res, next);
}

// function verifyRefreshToken(req, res, next) {
//     const token = req.cookies.refresh_token;
//     if (!token) {
//         return res.sendStatus(401);
//     }

//     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403);
//         }

//         const accessToken = generateAccessToken({ id: user.id });
//         setTokenCookies(res, accessToken, token);

//         req.user = user;
//         next();
//     });
// }

module.exports.AuthStrategy = AuthStrategy;
// module.exports.verifyRefreshToken = verifyRefreshToken;
