const users = require("../mock/users")


const createUser = (req, res) => {
    const { name, email, type, password } = req.body;
    try {
        const userWithEmailAlreadyExists = users.find((user) => { return user.email === email })
        if (userWithEmailAlreadyExists) {
            res.status(409).json(
                {
                    error: "USER_WITH_DATA_ALREADY_EXISTS",
                    data: [{ field: "email", value: email }],
                    message: "Um usuario com esse email ja existe."
                }
            );
            return;
        }

        let defineUserId = users.copyWithin().reverse()[0]
        let userToPush = {
            id: parseInt(defineUserId.id) + 1,
            name,
            email,
            type,
            password
        }

        users.push(userToPush);

        res.status(200).json({ user: userToPush, message: "Usuario cadastrado com sucesso." });
    }
    catch (error) {
        // TODO: Add logging mechanism
        console.error(error)
        res.status(500).json({ message: "Um erro inesperado ocorreu" });
    }
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, type, password } = req.body

    try {
        // TOOD: Add update user logic here
        const user = getUserById(id)
        if (!user) {
            res.status(404).json({ error: "USER_NOT_FOUND", message: "Usuário não encontrado." })
            return;
        }
        
        let userIndex = findUserIndexById(id)
        
        users[userIndex] = { ...users[userIndex], name, email, type, password };
        
        res.status(200).json({message: "Usuario alterado com sucesso."})
        return;
    }
    catch (error) {
        // TODO: Add logging mechanism
        console.error(error)
        res.status(500).json({ message: "Um erro inesperado ocorreu" })
    }
}

const getUser = (req, res) => {
    const { id } = req.params;

    try {
        const user = getUserById(parseInt(id));
        if (!user) {
            res.status(404).json({ error: "USER_NOT_FOUND", message: "Usuario não encontrado" });
            return;
        }

        res.status(200).json(
            {
                user: { id: user.id, name: user.name, email: user.email, type: user.type }
            }
        )

        return;
    }
    catch (error) {
        // TODO: Add logging mechanism
        console.error(error);
        res.status(500).json({ message: "Um erro inesperado ocorreu" });
    }
}

const getUsers = (req, res) => {
    try {
        const usersList = [];
        for (let user of users) {
            usersList.push({
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type
            });
        }

        if (!usersList) {
            res.status(404).json({ error: "USERS_NOT_FOUND", message: "Usuarios não encontrados." });
            return;
        }
        res.status(200).json({ users: usersList });
    }
    catch (error) {
        // TODO: Add logging mechanism
        console.error(error);
        res.status(500).json({ message: "Um erro inesperado ocorreu" });
    }
}

const deleteUser = (req, res) => {
    const { id } = req.params
    try {
        const userIndex = findUserIndexById(id);
        if (!userIndex) {
            res.status(404).json({error: "USER_NOT_FOUND", message: "Usuario nao encontrado"})
            return;
        } 
        let quantityToRemove = 1;
        users.splice(userIndex, quantityToRemove)

        res.status(200).json({message: "Usuario deletado com sucesso", users})
    }
    catch (error) {
        // TODO: Add logging mechanism
        console.error(error)
        res.status(500).json({ message: "Um erro inesperado ocorreu" })
    }
}

function getUserById(id) {
    return users.find((user) => { return user.id == id })
}

function findUserIndexById(id) {
    return users.findIndex(user => user.id == id)
}

const UserController = {
    createUser,
    updateUser,
    getUser,
    getUsers,
    deleteUser
}

module.exports = UserController;