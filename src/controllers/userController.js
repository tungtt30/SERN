import {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser
} from '../services/userService'

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Missing input parameter!'
    })
  }
  let userData = await handleUserLogin(email, password)

  return res.status(200).json({
    userData,
  })
}

let handleGetAllUsers = async (req, res) => {
  let type = req.query.id
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

let handleCreateNewUser = async (req, res) => {
  let data = req.body
  let message = await createNewUser(data)
  return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
  let data = req.body
  let message = await editUser(data)
  return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
  let id = req.body.id
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing id"
    })
  }
  let message = await deleteUser(id)
  return res.status(200).json(message)
}

module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser
}