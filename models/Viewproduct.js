const sequelizeC = require('sequelize');
const sequelize = require('../config/database/db');

var Viewproduct = sequelize.define('tbl_product_category', {
    id_procat : {
        type : sequelizeC.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    codeproduct_id: {
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