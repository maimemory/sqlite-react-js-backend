const sequelize = require('sequelize');
const database = require('./db-instance');

const memo = database.define(
    'memo',
    {
        detail: {
            type: sequelize.STRING,
            allowNull: false
        },
        writer: {
            type: sequelize.STRING,
            allowNull: false
        },
        date: {
            type: sequelize.STRING,
            allowNull: false
        }
    },
    {
        // freezeTableName: true
        // tableName: 'forceTableName'
    }
)

const syncTable = async () => {
    try {
        await memo.sync({ force: false });
        console.log("memo was synchronized successfully.");
    } 
    catch (error) {
        console.error('Unable to sync to the table:', error);
    }
}

syncTable();

module.exports = memo;