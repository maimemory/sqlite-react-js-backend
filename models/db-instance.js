const sequelize = require('sequelize');
const database =  new sequelize({
    dialect : 'sqlite',
    storage : './database.sqlite',
    // logging: false
})

const dbConnect = async () => {
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
    } 
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

dbConnect();

module.exports = database;