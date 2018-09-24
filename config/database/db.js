/**config for sequelize */
const sequelizeC =require('sequelize');
const operator = sequelizeC.Op

/**setting up db on sequelize */
const sequelize = new sequelizeC('db_test_meteor', 'root', '',{
    host:'localhost',
    port: 3306,
    dialect:'mysql',
    operatorsAliases:{
        $and: operator.and,
        $or: operator.or,
        $eq: operator.eq,
        $gt: operator.gt,
        $lt: operator.lt,
        $lte: operator.lte,
        $like: operator.like
    }
})

module.exports = sequelize;