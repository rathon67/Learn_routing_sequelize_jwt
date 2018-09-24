/**configuration for sequlize and database */
const sequelizeC = require('sequelize');
const sequelize = require('../config/database/db');

/** 
 * sequlize models for define the table on the database
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 * timestamps set to be false if on table db don't have timestamp type
 */

var codeproduct = sequelize.define('tbl_codeproduct', {
    id_codeprod : {
        type : sequelizeC.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    product_id: {
        type : sequelizeC.INTEGER,
    },
    code_product:
    {
        type : sequelizeC.CHAR
    }
},
{
    tableName: 'tbl_codeproduct',
    freezeTableName: true,
    timestamps: false
}
);

module.exports = codeproduct;