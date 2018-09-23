const sequelizeC = require('sequelize');
const sequelize = require('../config/database/db');

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