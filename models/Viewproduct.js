/**configuration for sequlize and database */
const sequelizeC = require('sequelize');
const sequelize = require('../config/database/db');

/** 
 * sequlize models for define the table on the database
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 * timestaps set to be false if on table db don't have timestamp type
 */

var Viewproduct = sequelize.define('tbl_product_category', {
    id_procat : {
        type : sequelizeC.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    product_id: {
        type : sequelizeC.INTEGER,
    },
    category_id:
    {
        type : sequelizeC.INTEGER
    }
},
{
    tableName: 'tbl_product_category',
    freezeTableName: true,
    timestamps: false
}
);

module.exports = Viewproduct;
