import db from '../models/index'
import { createNewUser } from '../services/CRUDService'

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
    return res.send('post crud from server')
}


module.exports = {
    getHomePage,
    getTest,
    getCRUD,
    postCRUD,
}