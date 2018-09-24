/**configuration for sequlize and database */
const sequelizeC = require('sequelize');
const sequelize = require('../config/database/db');

/** 
 * sequlize models for define the table on the database
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 * timestmaps set to be false if on table db don't have timestamp type
 */

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