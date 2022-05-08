import db from "../models/index"
import bcrypt from 'bcryptjs'


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            userData.user = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                // user already exist
                //compare password
                let user = await db.User.findOne({ where: { email }, raw: true })
                if (user) {
                    //compare pass
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0,
                            userData.errMessage = `ok`,
                            delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3,
                            userData.errMessage = 'wrong password'
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist. Try agian`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}


let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email } })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin
}