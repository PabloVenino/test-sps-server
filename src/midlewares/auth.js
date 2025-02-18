const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        res.status(401).json({ error: "UNAUTHORIZED", messaage: "Você precisa estar logado" })
        return;
    }

    try {
        tokenWithoutBearer = token.split(" ")[1]
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }
    catch(error) {
        if (error.name == "TokenExpiredError") {
            res.status(403).json({error: "JWT_EXPIRED", messaage: "Você precisa logar novamente."})
            return;
        }
        console.error(error)
        res.status(500).json({error: "JWT_UNEXPECTED", message: "Erro com autenticação, tente novamente mais tarde" })
    }

}

module.exports = AuthMiddleware