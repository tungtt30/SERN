const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('choco', 'root', null, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
})


let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('connectDB success')

    } catch (error) {
        console.error('connect fail', error);
    }
}

module.exports = connectDB;
