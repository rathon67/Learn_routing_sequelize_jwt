const sequelizeC = require('sequelize');
const sequelize = require('../config/database/db');

var product = sequelize.define('tbl_product', {
    id_product : {
        type : sequelizeC.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : sequelizeC.CHAR
    }
},
{
    tableName: 'tbl_product',
    freezeTableName: true,
    timestamps: false
}
);

module.exports = product