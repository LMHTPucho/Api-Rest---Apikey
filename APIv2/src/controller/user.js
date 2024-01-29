import User from "../model/user.js"

export const GetUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}

export const AddUser = async (req, res) => {
    const {userAuthId, apiKey, level} = req
    try{
        const user = await User.create({
            userAuthId,
            apiKey,
            level
        });
        return (user)
    } catch (error){
        console.log(error);
    }
}

export const UpdateUser = async (req, res) => {
    const {userAuthId, apiKey, level} = req.body
    try {
        const user = await User.update({
            apiKey,
            level
        },{
            where: {userAuthId}
        });
        res.json(user);
    } catch (error){
        console.log(error);
    }
}

export const UpdateUserLevel = async (req, res) => {
    var userAuthId = req.body.userAuthId
    var level = req.body.level
    level = (level !== "true");
    try {
        const user = await User.update({
            level: level
        },{
            where: {userAuthId : userAuthId}
        });
    } catch (error){
        console.log(error);
    }
}

export const UpdateUserKey = async (req, res) => {
    var userAuthId = req.req.body.userAuthId
    var apiKey = req.apiKey
    try {
        const user = await User.update({
            apiKey: apiKey
        },{
            where: {userAuthId : userAuthId}
        });
    } catch (error){
        console.log(error);
    }
}

export const GetUserByAuth = async (req, res) => {
    const userAuthId = req.id
    try {
        const user = await User.findOne({
            where: {userAuthId}
        });

        return user;
    } catch (error){
        console.log(error);
    }
}

export const GetUserByKey = async (req, res) => {
    const apiKey = req
    try {
        const user = await User.findOne({
            where: {apiKey}
        });
        return user
    } catch (error){
        console.log(error)
    }
}

export const DeleteUser = async (req, res) => {
    const {userAuthId} = req.body
    try {
        const user = await User.destroy({
            where: {userAuthId }
        });
        res.json(user);
    } catch (error){
        console.log(error);
    }
}
