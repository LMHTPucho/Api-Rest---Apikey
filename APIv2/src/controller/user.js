import User from "../model/user.js";

// Retrieve all users from the database and respond with a JSON representation
export const GetUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

// Add a new user to the database and return the created user
export const AddUser = async (req, res) => {
    const { userAuthId, apiKey, level } = req;
    try {
        const user = await User.create({
            userAuthId,
            apiKey,
            level
        });
        return user;
    } catch (error) {
        console.log(error);
    }
}

// Update user's apiKey and level based on userAuthId and respond with the updated user
export const UpdateUser = async (req, res) => {
    const { userAuthId, apiKey, level } = req.body;
    try {
        const user = await User.update({
            apiKey,
            level
        }, {
            where: { userAuthId }
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

// Toggle the boolean value of the user's level based on userAuthId
export const UpdateUserLevel = async (req, res) => {
    var userAuthId = req.body.userAuthId;
    var level = req.body.level;
    level = (level !== "true");
    try {
        const user = await User.update({
            level: level
        }, {
            where: { userAuthId: userAuthId }
        });
    } catch (error) {
        console.log(error);
    }
}

// Update user's apiKey based on userAuthId from the request
export const UpdateUserKey = async (req, res) => {
    console.log(req.req.body.userAuthId)
    var userAuthId = req.req.body.userAuthId;
    var apiKey = req.apiKey;
    try {
        const user = await User.update({
            apiKey: apiKey
        }, {
            where: { userAuthId: userAuthId }
        });
    } catch (error) {
        console.log(error);
    }
}

// Retrieve a user from the database based on userAuthId
export const GetUserByAuth = async (req, res) => {
    const userAuthId = req.id;
    try {
        const user = await User.findOne({
            where: { userAuthId }
        });
        return user;
    } catch (error) {
        console.log(error);
    }
}

// Retrieve a user from the database based on apiKey
export const GetUserByKey = async (req, res) => {
    const apiKey = req;
    try {
        const user = await User.findOne({
            where: { apiKey }
        });
        return user;
    } catch (error) {
        console.log(error);
    }
}

// Delete a user from the database based on userAuthId and respond with the deleted user
export const DeleteUser = async (req, res) => {
    const { userAuthId } = req.body;
    try {
        const user = await User.destroy({
            where: { userAuthId }
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}
