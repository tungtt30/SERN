import db from '../models/index'
import { createNewUser, getAllUser, getUserInfoById, updateUserData } from '../services/CRUDService'

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
    let message = await createNewUser(req.body)
    console.log(message)
    return res.send('successfully')
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


module.exports = {
    getHomePage,
    getTest,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD
}