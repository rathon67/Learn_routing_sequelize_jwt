const product = require('../../models/Product');
const category = require('../../models/Category');
const viewproduct = require('../../models/Viewproduct');
const codeproduct = require('../../models/Codeproduct');

// SELECT tbl_product_category.id_procat, tbl_codeproduct.code_product AS kode_product, tbl_product.name AS Nama_product, master_category.name AS category
    // FROM tbl_product_category
    // INNER JOIN tbl_codeproduct ON tbl_product_category.codeproduct_id = tbl_codeproduct.id_codeprod
    // INNER JOIN master_category ON tbl_product_category.category_id = master_category.id_category
    // LEFT OUTER JOIN tbl_product ON tbl_codeproduct.product_id = tbl_product.id_produc
/** creating relation */

//
product.belongsToMany(category, {
    through:viewproduct,
    foreignKey:'product_id'
})
//
category.belongsToMany(product,{
    through:viewproduct,
    foreignKey:'category_id'
})


product.hasMany(codeproduct,{
    foreignKey:'product_id'
})

codeproduct.belongsTo(product,{
    foreignKey:'product_id'
})



const model1= {
    productModel :product,
    categoryModel:category,
    viewproductModel:viewproduct,
    codeproductModel:codeproduct
}

module.exports=model1;
