import db from "../models/index"
import bcrypt from 'bcryptjs'
import {
  reject
} from "bcrypt/promises"


const salt = bcrypt.genSaltSync(10)


let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {}
      userData.user = {}
      let isExist = await checkUserEmail(email)
      if (isExist) {
        // user already exist
        //compare password
        let user = await db.User.findOne({
          where: {
            email
          },
          raw: true
        })
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
      let user = await db.User.findOne({
        where: {
          email
        }
      })
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

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = ''
      if (userId && userId !== 'all') {
        users = await db.User.findOne({
          where: {
            id: userId
          },
          attributes: {
            exclude: ['password']
          }
        })
      }
      if (userId === 'all') {
        users = await db.User.findAll({
          attributes: {
            exclude: ['password']
          }
        })
      }
      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt)
      resolve(hashPassword)
    } catch (error) {
      reject(error)
    }
  })
}

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check user exist
      let check = await checkUserEmail(data.email)
      if (check) {
        resolve({
          errCode: 1,
          message: 'Email is already exist'
        })
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password)
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phoneNumber,
          gender: data.gender === '1' ? true : false,
          roleId: data.role,
          image: data.image
        })
        resolve({
          errCode: 0,
          message: 'ok'
        })
      }


    } catch (error) {
      reject(error)
    }
  })
}

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id
        }
      })
      if (user) {
        await db.User.destroy({
          where: {
            id
          }
        })
        resolve({
          errCode: 0,
          message: 'Delete success'
        })
      } else {
        resolve({
          errCode: 1,
          message: 'Not find user'
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: data.id
        }
      })
      if (data) {
        if (user) {
          await db.User.update({
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
          }, {
            where: {
              id: data.id
            }
          })
          resolve({
            errCode: 0,
            message: 'Update success'
          })
        } else {
          resolve({
            errCode: 1,
            message: 'not found user'
          })
        }
      } else {
        resolve({
          errCode: 1,
          message: 'Update fail'
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}



module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser
}