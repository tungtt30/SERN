import db from '../models/index'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()

    } catch (error) {
        console.log('error', error)
    }

    return res.render('homePage.ejs')
}

let getTest = (req, res) => {
    return res.render('test/test.ejs')
}


module.exports = {
    getHomePage,
    getTest
}