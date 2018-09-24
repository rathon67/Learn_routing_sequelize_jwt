const product = require('../../models/Product');
const category = require('../../models/Category');
const viewproduct = require('../../models/Viewproduct');
const codeproduct = require('../../models/Codeproduct');

/** creating relation */

//create relation database table m:m product with category
product.belongsToMany(category, {
    through:viewproduct,
    foreignKey:'product_id'
})
//create relation database table m:m category with product
category.belongsToMany(product,{
    through:viewproduct,
    foreignKey:'category_id'
})

//create relation database table m:1 product can have many code
product.hasMany(codeproduct,{
    foreignKey:'product_id'
})

//create relation database table 1:m one code can have many product
codeproduct.belongsTo(product,{
    foreignKey:'product_id'
})


//export config
const model1= {
    productModel :product,
    categoryModel:category,
    viewproductModel:viewproduct,
    codeproductModel:codeproduct
}

module.exports=model1;
