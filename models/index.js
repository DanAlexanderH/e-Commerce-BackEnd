const category = require("./Category");
const product = require("./Product");
const tag = require("./Tag");
const productTag = require("./ProductTag");

product.belongsTo(category, {
    foreignKey: "category_id",
    onDelete: "CASCADE"
});

category.hasMany(product, {
    foreignKey: "category_id",
    
});

product.belongsToMany(tag, {
    through: productTag,
    foreignKey: "product_id",
});

tag.belongsToMany(product, {
    through: productTag,
    foreignKey: "tag_id",
});

module.exports = {
    product,
    productTag,
    category,
    tag,
};