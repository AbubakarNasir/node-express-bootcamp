import users from "../data/user.js";

export function getAllUsers(req, res) {
    res.json(users);
}

export function getUserById(req, res) {
    const userId = Number(req.params.id);
    const user = users.find(user => user.id === userId);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    if (!user) {
        return res.status(404).send("User not found");
    }

    res.json(user);
}

export function createNewUser(req, res) {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    const newUser = {
        id: users[users.length - 1].id + 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
}

export function updateUser(req, res) {
    const userId = Number(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    users[userIndex] = { id: userId, name, email };
    res.json(users[userIndex]);
}

export function deleteUser(req, res) {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }

    users.splice(userIndex, 1);
    res.status(204).send();
}