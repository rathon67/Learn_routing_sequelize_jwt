const sequlizeC =require('sequelize');
const sequelize =require('../config/database/db');

var category = sequelize.define('master_category',{
    id_category :{
            type : sequlizeC.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name : {
            type:sequlizeC.CHAR
        },
    },
    {
        tableName:'master_category',
        freezeTableName:true,
        timestamps:false
    })

module.exports = category;