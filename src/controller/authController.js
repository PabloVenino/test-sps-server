const jwt = require("jsonwebtoken");
const users = require("../mock/users")

const loginUser = (req, res) => {
    const { email, password } = req.body;

    try {
        const user = users.find((user) => { return user.email == email && user.password == password })
        if (!user) {
            res.status(404).json({ error: "USER_NOT_FOUND", message: "Email ou senha incorretos." });
            return;
        }

        const payload = {
            name: user.name,
            email: user.email,
            type: user.type
        };

        req.user = payload;

        bearerToken = createJwt(payload);
        
        payload.token = bearerToken;

        res.status(200).json({ user: payload })
        return;
    }
    catch (error) {
        // TODO: Add logging mechanism
        console.error(error)
        res.status(500).json({ message: "Um erro inesperado ocorreu" })
    }
}

const refreshToken = () => {
    
}

function createJwt(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || "1h" })
}

const AuthController = {
    loginUser,
}

module.exports = AuthController;