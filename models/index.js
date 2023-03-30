const Category = require("./Category");
const Product = require("./Product");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

Product.belongsTo(Category);

Category.hasMany(Product);

Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: "product_id",
});

Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: "tag_id",
});

module.exports = {
    Product,
    ProductTag,
    Category,
    Tag,
};