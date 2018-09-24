/**configuration for sequlize and database */
const sequlizeC =require('sequelize');
const sequelize =require('../config/database/db');

/** 
 * sequlize models for define the table on the database
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 * timestaps set to be false if on table db don't have timestamp type
 */

var category = sequelize.define('master_category',{
    id_category :{
            type : sequlizeC.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name_category : {
            type:sequlizeC.CHAR
        },
    },
    {
        tableName:'master_category',
        freezeTableName:true,
        timestamps:false
    })

module.exports = category;