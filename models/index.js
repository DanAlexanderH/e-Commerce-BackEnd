const category = require("./category");
const product = require("./product");
const tag = require("./tag");
const productTag = require("./productTag");

product.belongsTo(category, {
    foreignKey: "category_id",
});

category.hasMany(product, {
    foreignKey: "category_id",
    onDelete: "CASCADE"
})

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