// Create the authentication validations
const jwt = require('jsonwebtoken');

// =====================
// Check Token
// =====================
let checkToken = (req, res, next) => {
    // get the token from headers
    let token = req.get('token');

    // verify if the token is valid
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        // return error if the token is invalid
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid token'
                }
            });
        }

        // set the user data
        req.user = decoded.user;
        next();
    });
};

// =====================
// Check AdminRole
// =====================
let checkAdminRole = (req, res, next) => {
    let user = req.user;

    // check if the user data have admin role
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'The user is not an administrator'
            }
        });
    }
};

module.exports = {
    checkToken,
    checkAdminRole
}
