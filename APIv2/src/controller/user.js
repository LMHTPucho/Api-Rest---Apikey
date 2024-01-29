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
    console.log("****************");
    console.log(req);
    console.log("****************");
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
    console.log(req.body);
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
    const {userAuthId,level} = req.body
    console.log(userAuthId,level);

    try {
        const user = await User.update({
            level: !(level)
        },{
            where: {userAuthId : userAuthId}
        });
    } catch (error){
        console.log(error);
    }
}

export const DeleteUser = async (req, res) => {
    const {userAuthId} = req.body
    console.log(req.body);
    try {
        const user = await User.destroy({
            where: {userAuthId }
        });
        res.json(user);
    } catch (error){
        console.log(error);
    }
}

export const GetUserByAuth = async (req, res) => {
    const userAuthId = req.id
    console.log(userAuthId);
    try {
        const user = await User.findOne({
            where: {userAuthId}
        });

        return user;
    } catch (error){
        console.log(error);
    }
}