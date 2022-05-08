import db from '../models/index'
import { createNewUser, getAllUser, getUserInfoById, updateUserData, deleteUserById } from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', { data: JSON.stringify(data) })

    } catch (error) {
        console.log('error', error)
    }
}

let getTest = (req, res) => {
    return res.render('test/test.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    await createNewUser(req.body)
    return res.render('crud.ejs')
}

let displayGetCRUD = async (req, res) => {
    let data = await getAllUser()
    return res.render('displayCRUD.ejs', { data })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await getUserInfoById(userId)
        // check user data 

        return res.render('editCRUD.ejs', { userData })
    } else {
        return res.send('id missing')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await updateUserData(data)
    return res.render('displayCRUD.ejs', { data: allUser })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    let allUser = await deleteUserById(id)
    return res.render('displayCRUD.ejs', { data: allUser })
}
let testAPI = (req, res) => {
    return res.JSON({ ehe: 'ss' })
}


module.exports = {
    getHomePage,
    getTest,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
    testAPI,
}