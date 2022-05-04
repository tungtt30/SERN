import db from '../models/index'

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


module.exports = {
    getHomePage,
    getTest,
    getCRUD,
}