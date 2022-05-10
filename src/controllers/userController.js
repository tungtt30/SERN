import { handleUserLogin, getAllUsers } from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!'
        })
    }
    let userData = await handleUserLogin(email, password)

    return res.status(200).json({
        userData,
    })
}

let handleGetAllUsers = async (req, res) => {

    let type = req.body.id


    if (!type) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing parameter',
            users: []
        })
    }
    let users = await getAllUsers(type)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'oke',
        users
    })
}


module.exports = {
    handleLogin,
    handleGetAllUsers
}