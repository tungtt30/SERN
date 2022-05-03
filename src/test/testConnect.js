var mysql = require('mysql2')

const connection = () => {
  try {
    mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test'
    })
    console.log('ss')
  } catch (error) {

    console.log('fail', error)

  }
};

connection()
